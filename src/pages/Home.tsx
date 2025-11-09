import '../Home.css'
import { useEffect, useState, useCallback } from 'react'
import type React from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import * as L from 'leaflet'

const API_URL = 'http://ec2-3-151-64-162.us-east-2.compute.amazonaws.com:3000';

const IssueState = {
  UNRESOLVED: "UNRESOLVED",
  IN_PROGRESS: "IN PROGRESS",
  RESOLVED: "RESOLVED"
}

function DiscussionPost({
  name = "INSERT NAME HERE",
  comment = "INSERT COMMENT HERE",
}) {
  return (
    <>
      <div className="grid grid-cols-[30px_80%] gap-4">
        {/* User name and comment */}
        <div className="text-left">
          {/* Username */}
          <p className="text-[1.4rem] font-semibold">{name}</p>
          {/* User Comment */}
          <p className="text-[1rem]">{comment}</p>
        </div>
      </div>
      <hr className="m-2 border-gray-700" />
    </>
  )
}

const PinSelectionState = {
  // No pin is selected
  UNSELECTED: 0,
  // A new pin is elected and a ticket is being created
  NEW: 1,
  // An already placed pin is being selected and a ticket is being observed
  SELECTED: 2
}

// Custom green pin icon (provided URL)
const PIN_ICON = L.icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/1504px-Map_pin_icon_green.svg.png',
  iconSize: [32, 48],
  iconAnchor: [16, 48],
  popupAnchor: [0, -48],
})

// Ensure Leaflet default marker icons load under Vite by using CDN asset URLs
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

type PinProps = { lat: number; lng: number; opacity?: number, onClick?, ticket }
function Pin({ lat, lng, opacity = 1, onClick, ticket }: PinProps) {
  const handleMarkerClick = useCallback((event) => {
    if (onClick) {
      onClick(event, {lat, lng, opacity, ticket});
    }
  }, [onClick, {lat, lng, opacity, ticket}]);
  const markerEventHandlers = {
    click: handleMarkerClick,
  };
  return <Marker position={[lat, lng]} eventHandlers={markerEventHandlers} icon={PIN_ICON} opacity={opacity} />
}

const useApiData = (endpoint: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error. status: ${response.status}`);
        }
        
        const result = await response.json();

        setData(result);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}


function HomePage() {
  const [activePinState, setPinState] = useState(PinSelectionState.SELECTED)  

  const [newTicketData, setNewTicketData] = useState({
    Image: "",
    Title: "",
    Description: "",
    Latitude: 0,
    Longitude: 0
  })

  const { data: t, loading, error} = useApiData("/api/issue/get_all");

  const pins = t && Array.isArray(t) ? t.map((tic) => {
    if (tic.latitude == null || tic.longitude == null) {
      return null;
    }
    return (<Pin lat={tic.latitude} lng={tic.longitude} opacity={1} onClick={(event, data) => {setPinState(PinSelectionState.SELECTED)}}/>)
  }) : null;

  const [message, setMessage] = useState("")
  const handleSend: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    console.log("sent", message)
    setMessage("")
  }
  const tileLayer = (
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="OpenStreetMap contributors"
    />
  )

  function MapResizer() {
    const map = useMap()
    useEffect(() => {
      const invalidate = () => map.invalidateSize()
      const id = window.setTimeout(invalidate, 0)
      window.addEventListener('resize', invalidate)
      return () => {
        window.clearTimeout(id)
        window.removeEventListener('resize', invalidate)
      }
    }, [map])
    return null
  }

  function MapClick() {
    useMapEvents({
      click(e) {
        if (
          activePinState === PinSelectionState.UNSELECTED ||
          activePinState === PinSelectionState.NEW
        ) {
          const { lat, lng } = e.latlng

          setNewTicketData((prev) => ({ ...prev, Latitude: lat, Longitude: lng }))
          console.log(lat, lng)
        }

        setPinState(PinSelectionState.NEW)
      },
    })
    return null
  }

  const mapEl = (
    <MapContainer
      center={[-34.6037, -58.3816]}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full z-0"
      style={{ height: '100%', width: '100%' }}
    >
      <MapResizer />
      {/* Update coords on click when NEW/UNSELECTED */}
      <MapClick />
      {(newTicketData.Latitude !== 0 || newTicketData.Longitude !== 0) && (
        <Pin
          lat={newTicketData.Latitude}
          lng={newTicketData.Longitude}
          opacity={activePinState === PinSelectionState.NEW ? 1 : 0}
        />
      )}
      {
        pins
      }
      {tileLayer}
    </MapContainer>
  )

  return (

    // parent div
    <div className="font-light w-screen h-screen overflow-hidden m-0 p-0">
      <div className={activePinState === PinSelectionState.SELECTED ? "grid grid-cols-[minmax(0,70%)_minmax(0,30%)] h-full" : "grid grid-cols-[minmax(0,100%)_0%] h-full"}>

        <div className="relative h-full w-full">
          {/* Map */}

          {mapEl}

          {/* If a Pin is Selected and not new*/}
          {activePinState === PinSelectionState.SELECTED && (
            <>

              {/* Image and Description */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 bg-gray-950/80 backdrop-blur-sm z-[1100]">
                <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="w-full h-48 cover" />

                <div className="text-left p-2">

                  <div className="grid grid-cols-[4%_96%] gap-2 items-center">
                    <button aria-label="Push" className="text-gray-400 text-3xl! text-center p-0!"> 🡅 </button>
                    <p className="text-[2rem] font-extrabold">{newTicketData.Title || 'INSERT TITLE HERE'}</p>
                  </div>

                  <p className="text-[1.5rem]">{newTicketData.Description || 'INSERT SUMMARY HERE'}</p>
                </div>
              </div>

            </>)
          }

          {/* If a Pin is Selected and must be created */}
          {activePinState === PinSelectionState.NEW && (
            <>
              {/* Image and Description */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 bg-gray-950/80 backdrop-blur-sm z-[1100]">

                <div className="grid grid-cols-1"> 
                  {newTicketData.Image ? (
                    <>
                      <img src={newTicketData.Image} className="w-full h-48 object-cover rounded" />
                      <label
                        htmlFor="ticket-image-input"
                        className="mt-2 inline-flex items-center justify-center rounded-md border border-gray-600 bg-gray-800/60 text-white px-3 py-2 cursor-pointer hover:bg-gray-700/60"
                      >
                        Change Image
                      </label>
                    </>
                  ) : (
                    <label
                      htmlFor="ticket-image-input"
                      className="flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-500 bg-gray-800/40 text-gray-200 cursor-pointer hover:border-blue-400 hover:bg-gray-800/60"
                    >
                      <span className="text-sm">Click to choose image</span>
                    </label>
                  )}

                  <input
                    id="ticket-image-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)
                        setNewTicketData({
                          Image: url,
                          Title: newTicketData.Title,
                          Description: newTicketData.Description,
                          Longitude: newTicketData.Longitude,
                          Latitude: newTicketData.Latitude
                        })
                      }
                    }}
                  />
                </div>

                <div className="text-left p-2">

                  <div className="grid grid-cols-[4%_82.5%_10%] gap-2 items-center">
                    <button aria-label="Push" className="text-gray-400 text-3xl! text-center p-0!"> 🡅 </button>
                    <input
                      type="text"
                      value={newTicketData.Title}
                      onChange={(e) => setNewTicketData(prev => ({ ...prev, Title: e.target.value }))}
                      placeholder="Insert title here"
                      className="bg-transparent text-white text-[2rem] font-extrabold outline-none border-b border-gray-600 focus:border-blue-500"
                    />
                    <button onClick={
                      () => {
                        setPinState(PinSelectionState.UNSELECTED)
                      }
                    }>X </button>
                  </div>

                  <textarea
                    value={newTicketData.Description}
                    onChange={(e) => setNewTicketData(prev => ({ ...prev, Description: e.target.value }))}
                    placeholder="Insert summary here"
                    rows={3}
                    className="mt-2 w-full bg-transparent text-white text-[1.1rem] outline-none border border-gray-600 rounded-md p-2 focus:border-blue-500"
                  />

                  <button className="w-full" onClick={
                    () => {
                      if (!(newTicketData.Description && newTicketData.Latitude && newTicketData.Longitude && newTicketData.Title)) {
                        alert("Please fill in all required fields (Everything except for image)")
                        return;
                      }
                      setPinState(PinSelectionState.UNSELECTED)
                    }
                  }>Submit</button>
                </div>
              </div>

            </>
          )}

        </div>

        {/* Column on the right should only be visible to already created data*/}

        {activePinState === PinSelectionState.SELECTED && (
          <>

            <div className="bg-gray-900 text-left m-0 p-2 h-full w-full flex flex-col overflow-hidden">
              {/* State of Issue */}
              <p className="pl-2 m-1 font-medium text-[2rem]">
                Current State: {IssueState.UNRESOLVED}
              </p>

              <div className="text-xs bg-gray-800 w-full p-2 rounded-2xl flex-1 min-h-0 overflow-y-auto">

                {/* A discussion post*/}
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />
                <DiscussionPost name="Test Name" comment="My comment" />

              </div>

              {/* Chatbox */}
              <form onSubmit={handleSend} className="mt-2 bg-gray-800 rounded-2xl p-2 flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white placeholder-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-lg disabled:opacity-50"
                  disabled={!message.trim()}
                >
                  Send
                </button>
              </form>
            </div>
          </>
        )}


      </div>
    </div>
  )
}

export default HomePage

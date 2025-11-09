import './App.css'
import { useEffect, useState } from 'react'
import type React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

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
  // An old pin is being selected and a ticket is being observed
  SELECTED: 2
}

function App() {
  const [activePinState, setPinState] = useState(PinSelectionState.NEW)

  const [ticketData, setTicketData] = useState({
    Image: "",
    Title: "",
    Description: "",
    Latitude: 0,
    Longitude: 0
  })

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
      // @ts-expect-error React 19 typings mismatch for react-leaflet
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

  const mapEl = (
    <MapContainer
      // @ts-expect-error React 19 typings mismatch for react-leaflet
      center={[-34.6037, -58.3816]}
      zoom={13}
      scrollWheelZoom
      className="h-full w-full z-0"
      style={{ height: '100%', width: '100%' }}
    >
      <MapResizer />
      {tileLayer}
    </MapContainer>
  )

  return (

    // parent div
    <div className="font-light w-screen h-screen overflow-hidden m-0 p-0">
      <div className={"grid grid-cols-["+(activePinState === PinSelectionState.SELECTED && 70 || 100).toString()+"%_"+((activePinState === PinSelectionState.SELECTED && 30 || 0).toString())+"%] h-full"}>

        <div className="relative h-full w-full">
          {/* Map */}

          {mapEl}

          {/* If a Pin is Selected and not new*/}
          {activePinState === PinSelectionState.SELECTED && (
            <>

              {/* Image and Description */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 bg-gray-950/80 backdrop-blur-sm z-[1100]">
                <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="w-full h-48 object-cover" />

                <div className="text-left p-2">

                  <div className="grid grid-cols-[4%_96%] gap-2 items-center">
                    <button aria-label="Push" className="text-gray-400 text-3xl! text-center p-0!"> 🡅 </button>
                    <p className="text-[2rem] font-extrabold">{ticketData.Title || 'INSERT TITLE HERE'}</p>
                  </div>

                  <p className="text-[1.5rem]">{ticketData.Description || 'INSERT SUMMARY HERE'}</p>
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
                  {ticketData.Image && (<img src={ticketData.Image} className="w-full h-48 object-cover rounded" />)}
                  <input
                    type="file"
                    accept="image/*"
                    className="hover:cursor-pointer"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0]
                      if (file) {
                        const url = URL.createObjectURL(file)

                        setTicketData({
                          Image: url,
                          Title: ticketData.Title,
                          Description: ticketData.Description,
                          Longitude: ticketData.Longitude,
                          Latitude: ticketData.Latitude
                        })
                      }
                    }}
                  />
                </div>

                <div className="text-left p-2">

                  <div className="grid grid-cols-[4%_96%] gap-2 items-center">
                    <button aria-label="Push" className="text-gray-400 text-3xl! text-center p-0!"> 🡅 </button>
                    <input
                      type="text"
                      value={ticketData.Title}
                      onChange={(e) => setTicketData(prev => ({ ...prev, Title: e.target.value }))}
                      placeholder="Insert title here"
                      className="bg-transparent text-white text-[2rem] font-extrabold outline-none border-b border-gray-600 focus:border-blue-500"
                    />
                  </div>

                  <textarea
                    value={ticketData.Description}
                    onChange={(e) => setTicketData(prev => ({ ...prev, Description: e.target.value }))}
                    placeholder="Insert summary here"
                    rows={3}
                    className="mt-2 w-full bg-transparent text-white text-[1.1rem] outline-none border border-gray-600 rounded-md p-2 focus:border-blue-500"
                  />
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

export default App

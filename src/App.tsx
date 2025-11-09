import './App.css'
import { useEffect, useState } from 'react'
import type React from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

const IssueState = {
  UNATTENDED: "UNATTENDED",
  IN_PROGRESS: "IN PROGRESS",
  RESOLVED: "RESOLVED"
}

type DiscussionPostProps = {
  avatarUrl?: string
  name?: string
  comment?: string
}

function DiscussionPost({
  avatarUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  name = "INSERT NAME HERE",
  comment = "INSERT COMMENT HERE",
}: DiscussionPostProps) {
  return (
    <>
      <div className="grid grid-cols-[30px_80%] gap-4">
        {/* User profile */}
        <img src={avatarUrl} className="w-50px! rounded-full" />
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

function App() {
  const [message, setMessage] = useState("")
  const handleSend: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    console.log("sent", message)
    setMessage("")
  }
  const tileLayer = (
    // @ts-expect-error React 19 typings mismatch for react-leaflet
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

  const mapEl = (
    // @ts-expect-error React 19 typings mismatch for react-leaflet
    <MapContainer
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
      <div className="grid grid-cols-[70%_30%] h-full">

        <div className="relative h-full w-full">
          {/* Map */}
          {mapEl}

          {/* Image and Description */}
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 bg-gray-950/80 backdrop-blur-sm z-[1100]">
            <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="w-full h-48 object-cover" />


            <div className="text-left p-2">

              <div className="grid grid-cols-[4%_96%] gap-2 items-center">
                <button aria-label="Push" className="text-gray-400 text-3xl! text-center p-0!">🡅</button>
                <p className="text-[2rem] font-extrabold">INSERT TITLE HERE</p>
              </div>

              <p className="text-[1.5rem]">INSERT SUMMARY HERE</p>
            </div>
          </div>

        </div>

        {/* Column on the right */}
        <div className="bg-gray-900 text-left m-0 p-2 h-full w-full flex flex-col overflow-hidden">
          {/* State of Issue */}
          <p className="pl-2 m-1 font-medium text-[2rem]">
            Current State: {IssueState.UNATTENDED}
          </p>

          <div className="text-xs bg-gray-800 w-full p-2 rounded-2xl flex-1 min-h-0 overflow-y-auto">

            {/* A discussion post*/}
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>
            <DiscussionPost name="Test Name" comment="My comment" avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_0aG9zFLhxkkvzYlb27H0rMqpRlKVZ86Dug&s"/>

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
      </div>
    </div>
  )
}

export default App

import './App.css'

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

  return (

    // parent div
    <div className="font-light w-full h-screen overflow-hidden m-0 p-0">
      <div className="grid grid-cols-[70%_30%] h-full">

        <div className="relative h-full">
          {/* Map */}
          <img src="https://storage.googleapis.com/support-forums-api/attachment/message-142697457-14821742893909794832.PNG" className="h-full w-full object-cover" />

          {/* Image and Description */}
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 bg-gray-950/80 backdrop-blur-sm">
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
        <div className="container bg-gray-900 text-left m-0 p-2 h-full flex flex-col overflow-hidden">
          {/* State of Issue */}
          <p className="pl-2 m-1 font-medium text-[2rem]">
            Current State: {IssueState.UNATTENDED}
          </p>

          <div className="container text-xs bg-gray-800 w-full p-2 rounded-2xl flex-1 min-h-0 overflow-y-auto">

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
        </div>
      </div>
    </div>
  )
}

export default App

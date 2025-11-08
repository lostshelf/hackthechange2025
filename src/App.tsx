import './App.css'

const IssueState = {
  UNATTENDED: "Unattended",
  IN_PROGRESS: "In progress",
  RESOLVED: "Resolved"
}

function App() {



  return (

    // parent div
    <div className="font-light w-full overflow-x-hidden m-0 p-0">
      <div className="grid grid-cols-[70%_30%]">

        {/* Image and Description */}
        <div className="grid grid-cols-1">
          <img src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" className="h-full w-full object-scale-down" />

          <div className="bg-gray-950 text-left pl-2">
            <p className="text-lg">INSERT TITLE HERE</p>
            <p className="">INSERT SUMMARY HERE</p>
          </div>

        </div>

        {/* Column on the right */}
        <div className="container bg-gray-900 text-left m-0 object-cover">
          <p className="pl-2 m-2">
            Current State: {IssueState.UNATTENDED}
          </p>

          <div className="container text-xs bg-black w-full h-full p-3">
            {/* A discussion post*/}
            <div>
              <img 
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              className="w-10 rounded-full"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

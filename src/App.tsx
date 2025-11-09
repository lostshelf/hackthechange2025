import './App.css'

const IssueState = {
  UNATTENDED: "UNATTENDED",
  IN_PROGRESS: "IN PROGRESS",
  RESOLVED: "RESOLVED"
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
            <p className="text-[2rem] font-extrabold">INSERT TITLE HERE</p>
            <p className="text-[1.5rem]">INSERT SUMMARY HERE</p>
          </div>

        </div>

        {/* Column on the right */}
        <div className="container bg-gray-900 text-left m-0 p-2 object-cover">
          {/* State of Issue */}
          <p className="pl-2 m-1 font-medium text-[2rem]">
            Current State: {IssueState.UNATTENDED}
          </p>

          <div className="container text-xs bg-gray-800 w-full h-full p-2 rounded-2xl">
            
            {/* A discussion post*/}
            <hr className="mb-2"/>
            <div className="grid grid-cols-[30px_80%] gap-4">


              {/* User image */}
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                className="w-10 rounded-full" />
              {/* User name and comment */}
              <div className="text-left">
                {/* Username */}
                <p className="text-[1.4rem] font-semibold">INSERT NAME HERE</p>

                {/* Comment */}
                <p className="text-[1rem]">INSERT COMMENT HERE</p>

              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

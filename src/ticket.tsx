//Function to create a reusable custom tag.
function TicketTag() {
    //Currently just mock ticket data.
    const TicketData = {
        id: 1,
        state: "In Progress.",
        title: "Broken streetlight.",
        description: "The streetlight near University District flickers and goes out randomly",
        messages: [101, 102, 103],
        latitude: 51.045,
        longitude: -114.0719,
    };

    return (
      <>
        <div style={{border: "1px solid #ccc", padding: "10px", margin: "10px", borderRadius: "8px"}}>
          <p>The ID is {TicketData.id}.</p>
          <p>The state is "{TicketData.state}".</p>
          <p>The title is "{TicketData.title}".</p>
          <p>Description: {TicketData.description}</p>
          <p>Location: ({TicketData.latitude}, {TicketData.longitude})</p>
          <p>Messages: {TicketData.messages.join(", ")}</p>
        </div>
      </>
    )
}

export default TicketTag
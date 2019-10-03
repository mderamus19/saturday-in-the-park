import React, { useEffect, useState } from "react"
import "./Myitinerary.css"


const MyItinerary = props => {
  //Create a state variable for itinerary items - useState()
  const [itineraryList, setItineraryList] = useState([])

  //Create useEffect()
  useEffect(() => {
    //fetch the data from localhost:8000/itineraryitems
    fetch("http://localhost:8000/itineraryitems", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("kennywood_token")}`
      }
    })
      //convert to JSON
      .then(response => response.json())
      //Store itinerary items in state variable
      .then(setItineraryList)
  }, [])

  const DeleteItinerary = (id) => {
    if(window.confirm("Are you sure you want to Delete this?")){
    fetch(`http://localhost:8000/itineraryitems/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("kennywood_token")}`
      },
    }).then(() => {
      // Fetch the data from localhost:8000/itineraryitems
      fetch("http://localhost:8000/itineraryitems", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("kennywood_token")}`
        }
      })
        // Convert to JSON
        .then(response => response.json())
        // Store itinerary items in state variable
        .then(setItineraryList)
    })
  }
  }
//Create HTML representation with JSX
return (
  <>
    <h2>What I want to Do on Saturday</h2>
    <ul>
      {itineraryList.map(item => {
        return (
          <li>
            {item.attraction.area.name} in {item.attraction.name} at {" "}
            {item.starttime} {" "}
            <br></br><button
              type="button"
              className="deleteButton"
              onClick={() => DeleteItinerary(item.id) }
            >
              Delete
            </button> {"  "}
            <button
              type="button"
              className="editButton"
            //   onClick={() => editItinerary(item.id)}
            >
              Edit
            </button>
          </li>
        )
      })
    }
    </ul>
  </>
)
}

export default MyItinerary

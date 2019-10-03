import React, { useEffect, useState } from "react"
import AreaList from "./AreaList"
import "./Explorer.css"
import Attractions from "./Attractions"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"

// a function to give you all your areas and attractions. The areas variable is the state and
// use setAreas to change the state of areas the variable
const ParkExplorer = props => {
    const [areas, setAreas] = useState([])
    const [attractions, setAttractions] = useState([])
    const { isAuthenticated } = useSimpleAuth()
//When evoked getAttractions is Authenticated, perform a fetch, server Django responds with
// a json string, convert it to an object then send the data to setAttractions. The attractions
// state variable is now updated and the state of the component has been changed.
    const getAttractions = (areaId) => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/attractions?area=${areaId}`, {
                "method": "GET",
                "headers": {
                    "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
                }
            })
                .then(response => response.json())
                .then(setAttractions)

        }
    }

    const getParkAreas = () => {
        if (isAuthenticated()) {
            fetch(`http://localhost:8000/parkareas`, {
                "method": "GET",
                "headers": {
                    // gives you back the format you request data
                    "Accept": "application/json",
                    "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
                }
            })
                .then(response => response.json())
                .then(setAreas)
        }
    }

    useEffect(getParkAreas, [])

    return (
        <>
            <main className="explorer">
                <AreaList areas={areas} getAttractions={getAttractions} />
                <Attractions attractions={attractions} {...props} />
            </main>
        </>
    )
}

export default ParkExplorer
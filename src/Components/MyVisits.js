import React, { useState } from "react"

const MyVisits = ({currentUser}) => {
    const [yourVisits, setYourVisits] = useState(undefined)

    const handleStamp = (user_id) => {
    
        let visitor_id = {"id" :currentUser.id}
        fetch("http://localhost:5000/yourvisits", {
            method: 'POST',
            body: JSON.stringify(visitor_id),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setYourVisits(data)
                
            })
    }
    

    return (

        <div>
            <button className="button is-warning" onClick={handleStamp}>Your Visits</button>
            <div className="container"> 
                {yourVisits && yourVisits.map(visit => {
                    return (
                        <div className="card" key={visit.id}>
                            {visit.coffeeshop_id}
                        </div >
                    )
                })}
            </div>
        </div>)
}


export default MyVisits
import React, { useState } from "react"

const Users = ({currentShop}) => {
    const [users, setUsers] = useState(undefined)
    const [stamps, setStamps] = useState(undefined)

    const handleButton = () => {
        fetch("http://localhost:5000/findusers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
            });

    }

    const handleStamp = (user_id) => {
        const receipt = {
            "coffeeshop_id": "COMEBACKto_this", 
            "visitor_id": user_id, 
        }
        fetch("http://localhost:5000/stamp", {
            method: 'POST',
            body: JSON.stringify(receipt),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCurrentShop(data)
                
            })
    }
    


    return (

        <div>
            <button className="button is-warning" onClick={handleButton}>User in my Area</button>
            <div className="container"> 
                {users && users.map(user => {
                    return (
                        <div className="card" key={user.id}>
                            <div>{user.username}</div>
                            <div>{user.zipcode}</div>
                            <button onClick={handleStamp(user.id)}>Stamp</button>
                        </div >
                    )
                })}
            </div>
        </div>)
}


export default Users
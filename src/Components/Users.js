import React, { useState, useEffect } from "react"

const Users = (props) => {
    const [users, setUsers] = useState(undefined)
    const [visits, setVisits] = useState({})

    useEffect (() => {
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

    }, [])

    const handleStamp = (user_id) => {
        const receipt = {
            "coffeeshop_id": props.match.params.id, 
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
                setVisits({...visits, [user_id] : data}) 
            })
    }
    

    return (

        <div>
            <h2 className="title">Users</h2>
            <div className="container"> 
                {users && users.map(user => {
                    let id = user.id
                    return (
                        <div className="card" key={user.id}>
                            <div>{user.username}</div>
                            <div>{user.zipcode}</div>
                            <button onClick={()=> handleStamp(user.id)}>Stamp</button>
                            {visits && visits[id] && <div>{visits[id].stamps} Stamps</div>}
                        </div >
                    )
                })}
            </div>
        </div>)
}


export default Users
import React, { useState, useEffect } from "react"

const Users = (props) => {
    const [users, setUsers] = useState(undefined)

    useEffect(() => {

        const fetchUsersAndVisits = async () => {

            let fetchUsers = await fetch("http://localhost:5000/findusers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            let fetchUsersAsJSON = await fetchUsers.json()

            for (let i = 0; i < fetchUsersAsJSON.length; i++) {
                let fetchStamp = await fetch("http://localhost:5000/getstamps", {
                    method: 'POST',
                    body: JSON.stringify({"visitor_id": fetchUsersAsJSON[i].id, "coffeeshop_id": Number(props.match.params.id)}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                let fetchStampAsJSON = await fetchStamp.json()
                fetchUsersAsJSON[i]["visits"] = fetchStampAsJSON
                
            }
            setUsers(fetchUsersAsJSON)

        }

        fetchUsersAndVisits()

    }, [props, props.match.params.id])

    const handleStamp = async (user_id) => {
        const receipt = {
            "coffeeshop_id": props.match.params.id,
            "visitor_id": user_id
        }

        let stamp = await fetch("http://localhost:5000/stamp", {
            method: 'POST',
            body: JSON.stringify(receipt),
            headers: {
                "Content-Type": "application/json"
            }
        })

        let stampAsJSON = await stamp.json()
        for (let i=0; i< users.length; i++){
            if (users[i].id === user_id){
                const copy = users 
                copy[i].visits.stamps = stampAsJSON.stamps
                setUsers([...copy])
            }
        }
    }

    return (
        <div>
            <h2 className="title">Users</h2>
            <div className="container">
                {users && users.map(user => {
                    return (
                        <div className="card" key={user.id}>
                            <div>{user.username}</div>
                            <div>{user.zipcode}</div>
                            <button onClick={() => handleStamp(user.id)}>Stamp</button>
                            <div>{user.visits.stamps} Stamps</div>
                            {/* {visits && visits[id] && <div>{visits[id].stamps} Stamps</div>} */}
                        </div >
                    )
                })}
            </div>
        </div>)
}


export default Users
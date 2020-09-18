import React, { useState, useEffect } from "react"
import userImg from "../images/User.png";


const Users = (props) => {
    const [users, setUsers] = useState(undefined)
    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState("")

    useEffect(() => {

        const fetchUsersAndVisits = async () => {

            let fetchUsers = await fetch("/findusers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            let fetchUsersAsJSON = await fetchUsers.json()

            for (let i = 0; i < fetchUsersAsJSON.length; i++) {
                let fetchStamp = await fetch("/getstamps", {
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

        let stamp = await fetch("/stamp", {
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

    const handleChange = (evt) => {
        setFormData(evt.target.value)
    }

    const Reset = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentSearch(undefined)
        setFormData("")
    }
    console.log({ currentSearch })


    const handleSubmit = (evt) => {
        evt.preventDefault()
        let filtered = users.filter((user) => user.username === formData);
        setCurrentSearch(filtered)
    }

    return (
        <div className="loginForm1">
            <h2 className="title">Users</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <label>Enter Username</label>
                <input className="input" type="text" value={formData} placeholder="Enter Username" onChange={handleChange} />
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button" type="submit">Search</button>
                    </div>
                    <div className="control">
                        <button className="button" onClick={Reset}>Reset</button>
                    </div>
                </div>
            </form>
            <div className="container">
                {currentSearch && currentSearch.map(user => {
                    return (
                        <div className="card" key={user.id}>
                            <div>{user.username}</div>
                            <div>{user.zipcode}</div>
                            <img className="icon" src={userImg} alt="shopicon" />
                            <br></br>
                            <button className = "button" onClick={() => handleStamp(user.id)}>Stamp</button>
                            <div>{user.visits.stamps} Stamps</div>
                            {/* {visits && visits[id] && <div>{visits[id].stamps} Stamps</div>} */}
                        </div >
                    )
                })}
            </div>
        </div>)
}


export default Users
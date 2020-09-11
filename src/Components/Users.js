import React, { useState } from "react"

const Users = () => {
    const [users, setUsers] = useState(undefined)

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


    return (

        <div>
            <button className="button is-warning" onClick={handleButton}>User in my Area</button>
            <div className="container"> 
                {users && users.map(user => {
                    return (
                        <div className="card" key={user.id}>
                            <div>{user.username}</div>
                            <div>{user.zipcode}</div>
                            <table >
                                <tbody>
                                <tr>
                                    <th>Stamps</th>
                                    <th>Stamps</th>
                                </tr>
                                <tr>
                                    <td>"  "</td>
                                    <td>"  "</td>
                                </tr>
                                <tr>
                                    <td>"  "</td>
                                    <td>"  "</td>
                                </tr>
                                <tr>
                                    <td>"  "</td>
                                    <td>"  "</td>
                                </tr>
                                <tr>
                                    <td>"  "</td>
                                    <td>"  "</td>
                                </tr>
                                <tr>
                                    <td>"  "</td>
                                    <td>"  "</td>
                                </tr>
                                <tr>
                                    <td>"  "</td>
                                    <td>"  "</td>
                                </tr>
                                </tbody>
                            </table>

                        </div >
                    )
                })}
            </div>
        </div>)
}


export default Users
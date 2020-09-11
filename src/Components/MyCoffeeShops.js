import React, { useState } from "react"
import {Link, Redirect} from "react-router-dom";


const MyCoffeeShops = ({currentUser, setCurrentShop}) => {
    const [myShops, setMyShops] = useState(undefined)

    const handleClick = (id) => {
        setCurrentShop(id)
        return (<Redirect to="/allusers" />)
    }
    const handleButton = () => {
        fetch("http://localhost:5000/myshops", {
            method: 'POST',
            body: JSON.stringify(currentUser),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setMyShops(data);
            });

    }
    return (
        <div>
            <button className="button is-warning" onClick={handleButton}>MY SHOPS</button>
            <div className="container">
                {myShops && myShops.map(shop => {
                    return (
                        <div className="card" key={shop.id}>
                            <div>{shop.name}</div>
                            <div>{shop.address}</div>
                            <div>{shop.state}</div>
                            <Link to="allusers" onClick={handleClick(shop.id)} className = "button is-warning">Find User to Stamp</Link>
                        </div >
                    )
                })}
            </div>
        </div>)
}

export default MyCoffeeShops
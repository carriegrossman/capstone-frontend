import React from "react";
import {Link} from "react-router-dom";
  

const Search = ({ setCurrentSearch, currentSearch }) => {

    const handleButton = () => {
        fetch("http://localhost:5000/find", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCurrentSearch(data);
            });

    }

    return (

        <div>
            <button className="button is-warning" onClick={handleButton}>Shops in my Area</button>
            <div className="container">
                {currentSearch && currentSearch.map(shop => {
                    return (
                        <div className="card" key={shop.id}>
                            <div>{shop.name}</div>
                            <div>{shop.address}</div>
                            <div>{shop.state}</div>
                            <Link to={`coffeeshop/${shop.id}`} className = "button is-warning">See Homepage</Link>
                        </div >
                    )
                })}
            </div>
        </div>)
}

export default Search;

import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Search = ({ currentUser }) => {
    const [currentSearch, setCurrentSearch] = useState(undefined);
    
    useEffect (() => {
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
    }, [])

    return (
        <div>
            <h2 className = "title">Shops in my Area</h2>
            <button className="button is-warning">Search</button>
            <div className="container">
                {currentSearch &&
                    currentSearch.map((shop) => {
                        return (
                            <div className="card" key={shop.id}>
                                <div>{shop.name}</div>
                                <div>{shop.address}</div>
                                <div>{shop.city}</div>
                                <div>{shop.state}</div>
                                <div>{shop.zipcode}</div>
                                <Link
                                    to={`coffeeshop/${shop.id}`}
                                    className="button is-warning"
                                >
                                    See Homepage
                </Link>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Search;

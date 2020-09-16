import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = ({ currentUser }) => {
    const [currentShops, setCurrentShops] = useState(undefined);
    const [currentSearch, setCurrentSearch] = useState(undefined);
    const [formData, setFormData] = useState(undefined)
    useEffect(() => {
        fetch("http://localhost:5000/find", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCurrentShops(data);
            });
    }, [])

    const  handleChange = (evt) => {
        setFormData(evt.target.value)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
       
        let filtered = (currentShops.filter((shop) => shop.zipcode === Number(formData)))
        if (filtered.length ===0) {
            setCurrentSearch("none")
        }else{
            setCurrentSearch(filtered)
        }
    }

   

    if (currentSearch) console.log(currentSearch)
    return (
        <div>
            <h2 className="title">Shops in my Area</h2>
            <form onSubmit={handleSubmit}>
                <label>Zipcode</label>
                <input className="input" type="text" placeholder="Enter Zipcode" onChange={handleChange} />
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-warning" type="submit">Search</button>
                    </div>
                    <div className="control">
                        <button className="button is-warning" onClick={()=> setCurrentSearch(undefined)}>Reset</button>
                    </div>
                </div>
            </form>
                <div className="container">
                    {currentSearch && currentSearch === "none" && 
                    <div>Sorry no coffeeshops found with that zipcode!</div>}
                    {currentSearch && currentSearch !== "none" && currentSearch.map((shop) => {
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

                    {!currentSearch && currentShops &&
                        currentShops.map((shop) => {
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

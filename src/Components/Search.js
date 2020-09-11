import React, { useState } from "react";

const Search = ({ setCurrentSearch, currentSearch }) => {
    const [formData, setFormData] = useState(undefined);

    const handleChange = (evt) => {
        setFormData(evt.target.value);
        console.log(formData)
    };

    const handleSubmit = (evt) => {
        // evt.preventDefault();
        // fetch("http://localhost:5000/search", {
        //     method: "POST",
        //     body: JSON.stringify(formData),
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setCurrentSearch(data);
        //     });
    };

    const handleButton = () =>{
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

        <div class="panel">
            <button class="button is-warning" onClick={handleButton}>Shops in my Area</button>
            {/* {formData && <div>{formData}</div>}
            <div class="panel-block">
                <div class="field">
                    {/* <form action="/lobby" method="POST">  */}
            {/* <form onSubmit={handleSubmit}>
                        <div class="control" id="search" name="search">
                            <div class="select" id="search" name="search">
                                <select id="search" name="search">
                                    <option value="username">Name</option>
                                    <option value="password">
                                        Average Drink Price ($, $$, or $$$)
                                    </option>
                                    <option value="zipcode">Zipcode</option>
                                </select>
                            </div>
                        </div>
                        <input
                            class="input"
                            type="text"
                            placeholder="Enter Search"
                            name="SearchQuery"
                            onChange={handleChange}
                        /> 
                        <form>
                        <input type="text" value="zipcode" id="zipcode"/>
                        <button type = "submit" onSubmit={handleSubmit}>Submit</button>
                        </form> 
                     </div>
            </div > */}
            {currentSearch && currentSearch.map(shop => {
                return (
                    <div>{shop.address}</div>
                )
            
            }
                )}
        </div >
    );
};

export default Search;

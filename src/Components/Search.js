import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import locationImg from "../images/location.png";

const Search = ({ currentUser }) => {
  const [currentShops, setCurrentShops] = useState(undefined);
  const [currentSearch, setCurrentSearch] = useState(undefined);
  const [formData, setFormData] = useState(undefined);
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
  }, []);

  const handleChange = (evt) => {
    setFormData(evt.target.value);
  };

  const Reset = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSearch(undefined);
    setFormData(undefined);
  };
  console.log({ currentSearch });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    let filtered = currentShops.filter(
      (shop) => shop.zipcode === Number(formData)
    );
    setCurrentSearch(filtered);
  };

  if (currentSearch) console.log(currentSearch);
  return (
    <div className="loginForm1">
      <h2 className="title">Shops in my Area</h2>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <label>Zipcode</label>
        <input
          className="input"
          type="text"
          placeholder="Enter Zipcode"
          onChange={handleChange}
        />
        <div className="field is-grouped">
          <div className="control">
            <button className="button" type="submit">
              Search
            </button>
          </div>
          <div className="control">
            <button className="button" type="reset" onClick={Reset}>
              Reset
            </button>
          </div>
        </div>
      </form>
      <div className="container">
        {currentSearch && currentSearch.length === 0 && (
          <div>Sorry no coffeeshops found with that zipcode!</div>
        )}
        {currentSearch &&
          currentSearch.length !== 0 &&
          currentSearch.map((shop) => {
            return (
              <div className="card" key={shop.id}>
                <div className="subtitle">{shop.name}</div>
                <div>{shop.address}</div>
                <div>{shop.city}</div>
                <div>{shop.state}</div>
                <div>{shop.zipcode}</div>
                <div className="carditem">
                  <Link to={`coffeeshop/${shop.id}`} className="trial">
                    <img className="icon" src={locationImg} alt="shopicon" />
                    <div>Home</div>
                  </Link>
                </div>
              </div>
            );
          })}
        {!currentSearch &&
          currentShops &&
          currentShops.map((shop) => {
            return (
              <div className="card" key={shop.id}>
                <div className="subtitle">{shop.name}</div>
                <div>{shop.address}</div>
                <div>{shop.city}</div>
                <div>{shop.state}</div>
                <div>{shop.zipcode}</div>
                <div className="carditem">
                  <Link to={`coffeeshop/${shop.id}`} className="trial">
                    <img className="icon" src={locationImg} alt="shopicon" />
                    <div>Home</div>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;

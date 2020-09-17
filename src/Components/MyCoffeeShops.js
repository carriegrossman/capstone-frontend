import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import locationImg from "../images/location.png";
import stampImg from "../images/stamp.png";
import shopImg from "../images/shop.png";

const MyCoffeeShops = ({ currentUser, setCurrentShop }) => {
  const [myShops, setMyShops] = useState(undefined);

  useEffect(() => {
    fetch("http://localhost:5000/myshops", {
      method: "POST",
      body: JSON.stringify(currentUser),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyShops(data);
      });
  }, [currentUser]);

  return (
    <div>
      <div className="coffeeshopcontainer">
        <h2 className="title">My CoffeeShops</h2>
        <Link className="button" to="/registershop">
          Register Shop
              </Link>
        <hr></hr>
        <div className="container">
          {myShops &&
            myShops.map((shop) => {
              return (
                <div className="card" key={shop.id}>
                  <div className = "subtitle">{shop.name}</div>
                  {/* <div>{shop.address}</div>
                  <div>{shop.city}</div>
                  <div>{shop.state}</div>
                  <div>{shop.zipcode}</div>
                 */}
                  <div className='carditem'>
                    <Link
                      to={`/${shop.id}/users`}
                      onClick={() => {
                        setCurrentShop(shop.id);
                      }}
                      className="trial"
                    >
                       <img className="icon" src={stampImg} alt="shopicon" />
                       <div>Stamp</div>
                  </Link>
                  {/* </div>
                  <div className='carditem'> */}
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
    </div>
  );
};

export default MyCoffeeShops;
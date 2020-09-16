import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <hr></hr>
        <div className="container">
          {myShops &&
            myShops.map((shop) => {
              return (
                <div className="card" key={shop.id}>
                  <div>{shop.name}</div>
                  <div>{shop.address}</div>
                  <div>{shop.state}</div>
                  <Link
                    to={`/${shop.id}/users`}
                    onClick={() => {
                      setCurrentShop(shop.id);
                    }}
                    className="button"
                  >
                    Find User to Stamp
                  </Link>
                  <Link to={`coffeeshop/${shop.id}`} className="button">
                    See Homepage{" "}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default MyCoffeeShops;
import React, { useState, useEffect } from "react";

const MyVisits = ({ currentUser }) => {
  const [myVisits, setMyVisits] = useState(undefined);

  useEffect(() => {
    let fetchshop = async () => {
      let visitor_id = { id: currentUser.id };
      let visitfetch = await fetch("http://localhost:5000/yourvisits", {
        method: "POST",
        body: JSON.stringify(visitor_id),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let visitfetchAsJSON = await visitfetch.json();

      for (let i = 0; i < visitfetchAsJSON.length; i++) {
        let coffeeshopId = { coffeeshop_id: visitfetchAsJSON[i].coffeeshop_id };
        let shopfetch = await fetch("http://localhost:5000/getshop", {
          method: "POST",
          body: JSON.stringify(coffeeshopId),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let shopfetchasJSON = await shopfetch.json();
        visitfetchAsJSON[i]["store"] = shopfetchasJSON;
      }
      setMyVisits(visitfetchAsJSON);
    };

    fetchshop();
  }, [currentUser]);

  return (
    <div className="notification">
      <h2 className="title">My Visits</h2>
      <div className="container">
        {myVisits &&
          myVisits.map((visit) => {
            return (
              <div className="card" key={visit.id}>
                <div>{visit.store.name}</div>
                <div>{visit.stamps} Visits</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MyVisits;

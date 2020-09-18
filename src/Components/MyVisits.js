import React, { useState, useEffect } from "react";
import MyRewards from "./MyRewards"



const MyVisits = ({ currentUser }) => {
  const [myVisits, setMyVisits] = useState(undefined);

  useEffect(() => {
    let fetchshop = async () => {
      let visitor_id = { id: currentUser.id };
      let visitfetch = await fetch("/yourvisits", {
        method: "POST",
        body: JSON.stringify(visitor_id),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let visitfetchAsJSON = await visitfetch.json();

      for (let i = 0; i < visitfetchAsJSON.length; i++) {
        let coffeeshopId = { coffeeshop_id: visitfetchAsJSON[i].coffeeshop_id };
        let shopfetch = await fetch("/getshop", {
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
    <div>

      <div className="loginForm1">
        <h2 className="title">My Visits</h2>
        <hr></hr>
        {!myVisits && <div>You haven't visited anywhere yet!</div>}
        {myVisits && myVisits.length === 0 && (
          <div>You haven't visited anywhere yet!</div>
        )}
        <div className="container">
          {myVisits &&
            myVisits.map((visit) => {
              return (
                <div className="card" key={visit.id}>
                  <div className="subtitle">{visit.store.name}</div>
                  <div>{visit.stamps} Visits</div>
                </div>
              );
            })}
        </div>

      </div>
      <MyRewards currentUser={currentUser} />
    </div>
  );
};

export default MyVisits;

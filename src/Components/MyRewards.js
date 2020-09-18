import React, { useState, useEffect } from "react";
import rewardImg from "../images/Reward.png";

const MyRewards = ({ currentUser }) => {
  const [myRewards, setMyRewards] = useState(undefined);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      let visitor_id = { id: currentUser.id };
      let rewardsfetch = await fetch("/myrewards", {
        method: "POST",
        body: JSON.stringify(visitor_id),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let rewardsfetchasJSON = await rewardsfetch.json();

      for (let i = 0; i < rewardsfetchasJSON.length; i++) {
        let coffeeshopId = {
          coffeeshop_id: rewardsfetchasJSON[i].coffeeshop_id,
        };
        let shopfetch = await fetch("/getshop", {
          method: "POST",
          body: JSON.stringify(coffeeshopId),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let shopfetchasJSON = await shopfetch.json();
        rewardsfetchasJSON[i]["store"] = shopfetchasJSON;
      }
      setMyRewards(rewardsfetchasJSON);
    };
    fetchStoreInfo();
  }, [currentUser]);

  const handleReward = async (coffeeshop_id) => {
    let fetchReward = await fetch("/updatereward", {
      method: "POST",
      body: JSON.stringify({
        id: currentUser.id,
        coffeeshop_id: coffeeshop_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let fetchRewardasJSON = await fetchReward.json();
    console.log(fetchRewardasJSON);

    const addUpdate = [...myRewards];
    for (let i = 0; i < addUpdate.length; i++) {
      if (addUpdate[i].coffeeshop_id === coffeeshop_id) {
        addUpdate[i].rewards = fetchRewardasJSON.rewards;
      }
    }
    setMyRewards(addUpdate);
  };

  if (myRewards) console.log(myRewards);
  return (
    <div className="loginForm1">
      <h2 className="title">Your Rewards</h2>
      <hr></hr>
      {!myRewards && <div>You don't have any rewards yet!</div>}
      {myRewards && myRewards.length === 0 && (
        <div>You don't have any rewards yet!</div>
      )}
      <div className="container">
        {myRewards &&
          myRewards
            .filter((reward) => reward.rewards > 0)
            .map((reward) => {
              return (
                <div className="card" key={reward.id}>
                  {reward.rewards} reward to:
                  <div className="subtitle">{reward.store.name}</div>
                  <img className="icon" src={rewardImg} alt="shopicon" />
                  <button
                    className="button"
                    onClick={() => {
                      handleReward(reward.coffeeshop_id);
                    }}
                  >
                    USE REWARD
                  </button>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default MyRewards;

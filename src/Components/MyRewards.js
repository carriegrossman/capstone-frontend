import React, { useState } from "react"

const MyRewards = ({ currentUser }) => {
    const [myRewards, setMyRewards] = useState(undefined)

    const handleStamp = async (user_id) => {

        let visitor_id = { "id": currentUser.id }
        let rewardsfetch = await fetch("http://localhost:5000/myrewards", {
            method: 'POST',
            body: JSON.stringify(visitor_id),
            headers: {
                "Content-Type": "application/json"
            }
        })

        let rewardsfetchasJSON = await rewardsfetch.json()
        
        for (let i=0; i<rewardsfetchasJSON.length; i++){
        let coffeeshopId = { "coffeeshop_id": rewardsfetchasJSON[i].coffeeshop_id }
        let shopfetch = await fetch("http://localhost:5000/getshop", {
                method: 'POST',
                body: JSON.stringify(coffeeshopId),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        let shopfetchasJSON =await shopfetch.json()
        rewardsfetchasJSON[i]["store"] =  shopfetchasJSON
        }
        setMyRewards(rewardsfetchasJSON)
                    
        }
    
    return (

        <div>
            <button className="button is-warning" onClick={handleStamp}>Your Visits</button>
            <div className="container">
                {myRewards && myRewards.map(reward => {
                    return (
                        <div className="card" key={reward.id}>
                            Your have {reward.rewards} reward to: {reward.store.name}
                        </div >
                    )
                })}
            </div>
        </div>)
}


export default MyRewards
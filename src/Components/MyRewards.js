import React, { useState, useEffect } from "react"

const MyRewards = ({ currentUser }) => {
    const [myRewards, setMyRewards] = useState(undefined)
 
    useEffect(() => {

        const fetchStoreInfo  = async () => {
            let visitor_id = { "id": currentUser.id}
            let rewardsfetch = await fetch("http://localhost:5000/myrewards", {
                method: 'POST',
                body: JSON.stringify(visitor_id),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            let rewardsfetchasJSON = await rewardsfetch.json()

            for (let i = 0; i < rewardsfetchasJSON.length; i++) {
                let coffeeshopId = { "coffeeshop_id": rewardsfetchasJSON[i].coffeeshop_id }
                let shopfetch = await fetch("http://localhost:5000/getshop", {
                    method: 'POST',
                    body: JSON.stringify(coffeeshopId),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let shopfetchasJSON = await shopfetch.json()
                rewardsfetchasJSON[i]["store"] = shopfetchasJSON
            }
            setMyRewards(rewardsfetchasJSON)
        }
        fetchStoreInfo()

    }, [currentUser])



    const handleReward = async (coffeeshop_id) => {
   
        let fetchReward = await fetch("http://localhost:5000/updatereward", {
                    method: 'POST',
                    body: JSON.stringify({"id" : currentUser.id, "coffeeshop_id": coffeeshop_id}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                let fetchRewardasJSON = await fetchReward.json()
                console.log(fetchRewardasJSON)

                
                const addUpdate = [...myRewards]
                for (let i=0; i< addUpdate.length; i++){
                    if (addUpdate[i].coffeeshop_id === coffeeshop_id){
                        addUpdate[i].rewards = fetchRewardasJSON.rewards
                    }
                }
                setMyRewards(addUpdate)
                console.log(myRewards)
            }


    return (

        <div>
            <h2 className = "title">Your Rewards</h2>
            <div className="container">
                {myRewards && myRewards.filter(reward => reward.rewards > 0).map(reward => {
                    return (
                        <div className="card" key={reward.id}>
                            Your have {reward.rewards} reward to: {reward.store.name}
                            <button className = "button is-warning" onClick = {()=>{handleReward(reward.coffeeshop_id)}}>USE  REWARD</button>
                        </div >
                    )
                })}
            </div>
        </div>)
}


export default MyRewards
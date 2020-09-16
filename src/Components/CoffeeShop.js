import React, { useEffect, useState } from "react"
import ImageUpload from "./ImageUpload"
import mug from "../images/mugs.png"

const CoffeeShop = (props) => {
    const [coffeeShopData, setCoffeeShopData] = useState(null)
    const [formData, setFormData] = useState({})
    const [reviews, setReviews] = useState(undefined)
    const [visitCount, setVisitCount] = useState(undefined)
    const [shopImages, setShopImages] = useState(undefined)
    const [updateFormData, setUpdateFormData] = useState(undefined)
    const [updates, setUpdates] = useState(undefined)

    useEffect(() => {
        fetch("http://localhost:5000/getvisits", {
            method: 'POST',
            body: JSON.stringify({ "coffeeshop_id": props.match.params.id }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) {
                    setVisitCount(0)
                } else {
                    let visits = 0
                    for (var i = 0; i < data.length; i++) {
                        visits = visits + data[i].stamps
                    }
                    setVisitCount(visits);
                }
            });
    }, [props.match.params.id])

    useEffect(() => {
        fetch(`/coffeeshop/${props.match.params.id}`)
            .then(res => res.json())
            .then(data => {
                setCoffeeShopData(data)
            })
    }, [props.match.id, props.match.params.id])

    useEffect(() => {
        fetch("http://localhost:5000/getreviews", {
            method: 'POST',
            body: JSON.stringify({ "coffeeshop_id": props.match.params.id }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            });
    }, [props.match.params.id])


    useEffect(() => {
        fetch("http://localhost:5000/getupdates", {
            method: 'POST',
            body: JSON.stringify({ "coffeeshop_id": props.match.params.id }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUpdates(data);
            });
    }, [props.match.params.id])

    useEffect(() => {
        fetch("http://localhost:5000/getphotos", {
            method: 'POST',
            body: JSON.stringify({ "coffeeshop_id": props.match.params.id }),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setShopImages(data);
                console.log(data)
            });
    }, [props.match.params.id])

    const formatDate = (date) => {
        let split = date.split("")
        if (split[5]==="0"){
            let date = [split[6], "/", split[8], split[9], "/2020"]
            return date.join("")
        }else{
            let date = ["1", split[6], "/", split[8], split[9], "/2020"]
            return date.join("")
        }
    }
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const sendingData = { ...formData, "coffeeshop_id": Number(props.match.params.id), "visitor_id": props.currentUser.id }
        fetch("http://localhost:5000/reviews", {
            method: 'POST',
            body: JSON.stringify(sendingData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setReviews(data)

            })
    }

    const handleUpdateChange = (evt) => {
        setUpdateFormData({ ...updateFormData, [evt.target.name]: evt.target.value })
    }

    const handleUpdateSubmit = (evt) => {
        evt.preventDefault()
        const sendingData = { ...updateFormData, "coffeeshop_id": Number(props.match.params.id) }
        fetch("http://localhost:5000/addupdate", {
            method: 'POST',
            body: JSON.stringify(sendingData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                setUpdates(data)

            })
    }

    if (updates) console.log(updates)
    if (!coffeeShopData) return <div>loading...</div>

    return (
        <div className="loginForm1" >
        <div key={coffeeShopData.id}>
        <div className="title">{coffeeShopData.name}</div>
        <div className="subtitle">{coffeeShopData.address}</div>
        <div className="subtitle">{coffeeShopData.state}</div>

        {!props.currentUser.owner &&
            <div className="imageupload">
                <ImageUpload currentUser={props.currentUser} currentShopID={props.match.params.id} setShopImages={setShopImages} />
            </div>}


        <div className="container">
            {shopImages && shopImages.map(image => {
                return (<div className="card" key={image.id}><img src={image.img} key={image.id} className="shopimage" alt={image.imgname} />
                    <div>{image.caption}</div>
                </div>)
            })}
        </div>
        {visitCount===0 && <div className="visitcount subtitle">No Visits Yet</div>}
        {visitCount!==0 && <div className="visitcount subtitle">{visitCount} Visits</div>}

        <div className="container updates">
            <h2 className="subtitle"> {coffeeShopData.name} Updates</h2>
            {updates && updates.map((update) => {
                return (<div className="card" key={update.id}>
                    <div>{formatDate(update.date)}</div>
                    <div>{update.owner_update}</div>
                    </div>)})}
        </div>

        <div className="reviews">
            <h2 className="subtitle">REVIEWS of {coffeeShopData.name}</h2>
            {!reviews && <div>No reviews written yet!</div>}
            {reviews && reviews.length===0 && <div>No reviews written yet!</div>}
            {reviews && reviews.map((review) => {
                return (<div  key={review.id}>
    

                    <div>{review.review}</div>
                    {review.stars === 5 &&
                        <div className="stars">
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                        </div>}
                    {review.stars === 4 &&
                        <div className="stars">
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                        </div>}
                    {review.stars === 3 &&
                        <div className="stars">
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                        </div>}
                    {review.stars === 2 &&
                        <div className="stars">
                            <img src={mug} className='star' alt="star" />
                            <img src={mug} className='star' alt="star" />
                        </div>}
                    {review.stars === 1 &&
                        <div className="stars">
                            <img src={mug} className='star' alt="star" />
                        </div>}
                </div>)
            })}

        </div>
        {props.currentUser.id === coffeeShopData.owner_id  &&
        <div className="ownerupdates">
            <h2 className="title">Owner Updates</h2>
            <form onSubmit={handleUpdateSubmit}>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <input className="date" type="date" id="date" name="date" placeholder="Enter review here!" required onChange={handleUpdateChange} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Update</label>
                    <div className="control">
                        <textarea className="textarea" type="text" id="update" name="update" placeholder="Enter update here!" required onChange={handleUpdateChange} />
                    </div>
                </div>

                <div className="field is-grouped">
                        <button className="button" type="submit" id="register-button">
                            Submit
                    </button>

                        <button className="button" type="reset" id="cancel-button">
                            Cancel
                    </button>
                    </div>
            </form>
        </div>}
        {!props.currentUser.owner &&
            <div className="reviewForm">
                <h1>Leave a Review</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Stars</label>
                        <div className="control">
                            <input type="number" id="stars" name="stars" min="1" max="5" required onChange={handleChange} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Review</label>
                        <div className="control">
                            <textarea className="textarea" type="text" id="review" name="review" placeholder="Enter review here!" required onChange={handleChange} />
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <button className="button" type="submit" id="register-button">
                            Submit
                    </button>

                        <button className="button" type="reset" id="cancel-button">
                            Cancel
                    </button>
                    </div>
                </form>
            </div>
            }
    </div>
    </div>
    )

}

export default CoffeeShop
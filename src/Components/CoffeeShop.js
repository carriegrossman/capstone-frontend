import React, { useEffect, useState } from "react"
import ImageUpload from "./ImageUpload"

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

    const changeDateFormat = (date) => {
        let split = date.split("")
        if (split[5]==="0"){
        let splitMonthDay = [split[6], "/", split[8], split[9], "/2020"]
        return splitMonthDay.join("")
        }else{
        let splitMonthDay = [split[5], split[6], "/", split[8], split[9], "/2020"]
        return splitMonthDay.join("")
        }
    } 
    const handleUpdateChange = (evt) => {
        setUpdateFormData({ ...updateFormData, [evt.target.name]: evt.target.value })
        console.log(updateFormData)
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

    if (!coffeeShopData) return <div>loading...</div>

    return (
        <div className="loginForm1">
        <div key={coffeeShopData.id}>
        <div className="title">{coffeeShopData.name}</div>
        <div className="subtitle">{coffeeShopData.address}</div>
        <div className="subtitle">{coffeeShopData.city}, {coffeeShopData.state} {coffeeShopData.zipcode}</div>
        <div className="subtitle">{coffeeShopData.about}</div>

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
        {visitCount && <div className="visitcount subtitle">{visitCount} Visits</div>}

        <div className="container updates">
            <h2 className="subtitle"> {coffeeShopData.name} Updates</h2>
            {updates && updates.map((update) => {
                return (<div className="card" key={update.id}>
                    <div>{changeDateFormat(update.date)}</div>
                    <div>{update.owner_update}</div>
                    </div>)})}
        </div>

        <div className="reviews">
            <h2 className="subtitle">REVIEWS of {coffeeShopData.name}</h2>
            {reviews && reviews.map((review) => {
                return (<div  key={review.id}>
    

                    <div>{review.review}</div>
                    {review.stars === 5 &&
                        <div className="stars">
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                        </div>}
                    {review.stars === 4 &&
                        <div className="stars">
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                        </div>}
                    {review.stars === 3 &&
                        <div className="stars">
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                        </div>}
                    {review.stars === 2 &&
                        <div className="stars">
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                        </div>}
                    {review.stars === 1 &&
                        <div className="stars">
                            <img src='https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt="star" />
                        </div>}
                </div>)
            })}

        </div>
        {props.currentUser.owner &&
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
                        <div className="control">
                            <button
                                className="button"
                                type="submit"
                                id="register-button"
                            >
                            Post a Review
                        </button>
                        </div>
                        <div className="control">
                        <button className="button" type="reset" id="cancel-button">
                            Cancel
                        </button>
                        </div>
                    </div>
                </form>
            </div>
            }
    </div>
    </div>
    )

}

export default CoffeeShop
import React, { useEffect, useState} from "react"


const CoffeeShop = (props) => {
    const [coffeeShopData, setCoffeeShopData] = useState(null)
    const [formData, setFormData] = useState({}) 
    const [reviews, setReviews] = useState(undefined)
    const [visitCount, setVisitCount] = useState (undefined)


    useEffect (()=>{
        fetch("http://localhost:5000/getvisits", {
            method: 'POST',
            body: JSON.stringify({"coffeeshop_id": props.match.params.id}),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) {
                    setVisitCount (0)
                } else{
                let visits  = 0
                for (var i=0; i< data.length; i++){
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
                console.log(data)
                setCoffeeShopData(data)
            })
    }, [props.match.id, props.match.params.id])

    useEffect (()=>{
        console.log("this is running once!")
        fetch("http://localhost:5000/getreviews", {
            method: 'POST',
            body: JSON.stringify({"coffeeshop_id": props.match.params.id}),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
            });
    }, [props.match.params.id])

    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const sendingData = { ...formData, "coffeeshop_id": Number(props.match.params.id), "visitor_id": props.currentUser.id}
        console.log(sendingData)
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


    if (!coffeeShopData) return <div>loading...</div>

    return (<div key={coffeeShopData.id}>
        <div className="title">{coffeeShopData.name}</div>
        <div className = "subtitle">{coffeeShopData.address}</div>
        <div className = "subtitle">{coffeeShopData.state}</div>
        {visitCount && <div className = "visitcount subtitle">{visitCount} Visits</div>}

        <div className="reviews">
        <h2 className = "subtitle">REVIEWS of {coffeeShopData.name}</h2>
        {reviews && reviews.map((review)=> {
            return (<div key={review.id}>

                <div>{review.review}</div>      
                {review.stars === 5 && 
                <div className="stars">
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                </div>}
                {review.stars === 4 && 
                <div className="stars">
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star"  />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                </div>}
                {review.stars === 3 && 
                <div className="stars">
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png'className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                </div>}
                {review.stars === 2 && 
                <div className="stars">
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png' className='star' alt = "star" />
                </div>}
                {review.stars === 1 && 
                <div className="stars">
                <img src = 'https://yakimaymca.org/wp-content/uploads/2018/11/Star.png'className='star'  alt = "star" />
                </div>}
            </div>)
        })}

        </div>
        <div className="reviewForm">
            <h1>Leave a Review</h1>
            <form onSubmit={handleSubmit}>
            <div className="field">
                    <label className="label">Stars</label>
                    <div className="control">
                        <input  type="number" id="stars" name="stars" min="1" max="5" required onChange={handleChange}/>
                    </div>
                </div>
                
                <div className="field">
                    <label className="label">Review</label>
                    <div className="control">
                        <textarea className="textarea" type="text" id="review" name="review" placeholder="Enter review here!" required onChange={handleChange}/>
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
    </div>)

}

export default CoffeeShop
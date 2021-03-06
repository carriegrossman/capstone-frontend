import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import ReviewStars from "./ReviewStars";
import pinkcup from "../images/pinkcup2.png";
import url from '../config'
const CoffeeShop = (props) => {
  const [coffeeShopData, setCoffeeShopData] = useState(null);
  const [formData, setFormData] = useState({});
  const [reviews, setReviews] = useState(undefined);
  const [visitCount, setVisitCount] = useState(undefined);
  const [shopImages, setShopImages] = useState(undefined);
  const [updateFormData, setUpdateFormData] = useState(undefined);
  const [updates, setUpdates] = useState(undefined);
  useEffect(() => {
    fetch("/getvisits", {
      method: "POST",
      body: JSON.stringify({ coffeeshop_id: props.match.params.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setVisitCount(0);
        } else {
          let visits = 0;
          for (var i = 0; i < data.length; i++) {
            visits = visits + data[i].stamps;
          }
          setVisitCount(visits);
        }
      });
  }, [props.match.params.id]);
  useEffect(() => {
    fetch(`/coffeeshop/${props.match.params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCoffeeShopData(data);
      });
  }, [props.match.id, props.match.params.id]);
  useEffect(() => {
    fetch("/getreviews", {
      method: "POST",
      body: JSON.stringify({ coffeeshop_id: props.match.params.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, [props.match.params.id]);
  useEffect(() => {
    fetch("/getupdates", {
      method: "POST",
      body: JSON.stringify({ coffeeshop_id: props.match.params.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdates(data);
      });
  }, [props.match.params.id]);
  useEffect(() => {
    fetch("/getphotos", {
      method: "POST",
      body: JSON.stringify({ coffeeshop_id: props.match.params.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setShopImages(data);
        console.log(data);
      });
  }, [props.match.params.id]);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const sendingData = {
      ...formData,
      coffeeshop_id: Number(props.match.params.id),
      visitor_id: props.currentUser.id,
    };
    fetch("/reviews", {
      method: "POST",
      body: JSON.stringify(sendingData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  };
  const handleUpdateChange = (evt) => {
    setUpdateFormData({
      ...updateFormData,
      [evt.target.name]: evt.target.value,
    });
  };
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
  const handleUpdateSubmit = (evt) => {
    evt.preventDefault();
    const sendingData = {
      ...updateFormData,
      coffeeshop_id: Number(props.match.params.id),
    };
    fetch("/addupdate", {
      method: "POST",
      body: JSON.stringify(sendingData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdates(data);
      });
  };
  if (!coffeeShopData) return <div>loading...</div>;
  return (
    <div className="loginForm1">
        <div key={coffeeShopData.id}>
        <div className="tile is-ancestor">
  <div className="tile is-parent">
    <article className="tile is-child box">
      <div className="title">{coffeeShopData.name}</div>
      <p className
      ="subtitle">{coffeeShopData.address}, {coffeeShopData.city}, {coffeeShopData.state} {coffeeShopData.zipcode}</p>
      <hr></hr>
      <div className="content">
        <h4>Total Coffee Shop Visits: </h4>
        {visitCount === 0 && (
          <div className="visitcount subtitle">No Visits Yet</div>
        )}
        {visitCount !== 0 && (
          <div className="visitcount subtitle">{visitCount} Visits</div>
        )}
      </div>
            <hr></hr>
      <div className ="content">
      {!props.currentUser.owner && (
          <div className="imageupload">
            <ImageUpload
              currentUser={props.currentUser}
              currentShopID={props.match.params.id}
              setShopImages={setShopImages}
            />
          </div>
        )}
    <div className ="content">
      {props.currentUser.owner && (
          <figure class="image is-5by3">
          <img src={pinkcup} alt="pinkcup"/>
        </figure>
        )}
      </div>
      </div>
    </article>
  </div>
  <div className="tile is-parent">
  <article className ="tile is-child box">
    <p className ="title">Reviews of {coffeeShopData.name}</p>
    <ReviewStars coffeeShopData={coffeeShopData} reviews={reviews}/>
    </article>
  </div>
</div>
<div className="tile is-ancestor">
  <div className="tile is-parent">
    <article className="tile is-child box">
      <p className="title">Pictures</p>
      <p className="subtitle">Hello there, how do you brew?</p>
      <div className = "imagebox">
      <div className="content">
        <div className="container">
          {shopImages &&
            shopImages.map((image) => {
              return (
                <div className="card" key={image.id}>
                  <img
                    src={image.img}
                    key={image.id}
                    className="shopimage"
                    alt={image.imgname}
                  />
                  <div>{image.caption}</div>
                </div>
              );
            })}
        </div>
      </div>
      </div>
    </article>
  </div>
</div>
<div className="tile is-ancestor">
  <div className="tile is-parent">
    <article className="tile is-child box">
      <p className="title">{coffeeShopData.name} Updates</p>
      <p className="subtitle">Here's the biz....</p>
      <div className = "updatebox">
      <div className="content">
      <div className="container updates">
          <h2 className="subtitle"> </h2>
          {updates &&
            updates.sort((a, b) => {return new Date(b.date) - new Date(a.date)}).map((update) => {
              return (
                <div className="card" key={update.id}>
                  <div>{formatDate(update.date)}</div>
                  <div>{update.owner_update}</div>
                </div>
              );
            })}
        </div>
      </div>
      </div>
    </article>
  </div>
</div>
        {props.currentUser.id === coffeeShopData.owner_id && (
        <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
          <div className="ownerupdates">
            <h2 className="title">Owner Updates</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="field">
                <label className="label">Date</label>
                <div className="control">
                  <input
                    className="date"
                    type="date"
                    id="date"
                    name="date"
                    placeholder="Enter review here!"
                    required
                    onChange={handleUpdateChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Update</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    type="text"
                    id="update"
                    name="update"
                    placeholder="Enter update here!"
                    required
                    onChange={handleUpdateChange}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button" type="submit" id="register-button">
                    Submit
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
          </article>
          </div>
          </div>
        )}
        {!props.currentUser.owner && (
        <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child box">
          <div className="reviewForm">
            <h1>Leave a Review</h1>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Stars</label>
                <div className="control">
                  <input
                    type="number"
                    id="stars"
                    name="stars"
                    min="1"
                    max="5"
                    required
                    onChange={handleChange}
                  />
                  <p class="help">1 = Bad and 5 = AMAZING!</p>
                </div>
              </div>
              <div className="field">
                <label className="label">Review</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    type="text"
                    id="review"
                    name="review"
                    placeholder="Enter review here!"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button" type="submit" id="register-button">
                    Submit
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
          </article>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
export default CoffeeShop;
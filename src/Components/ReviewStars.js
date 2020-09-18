import React from "react";
import mug from "../images/mugs.png";

export default function ReviewStars({reviews, coffeeShopData}) {
    return <div className='reviewbox'>
        {/* <article className ="tile is-child box">
        <p className ="title">Reviews of {coffeeShopData.name}</p> */}
      <div className ="content">
      <div>
          {!reviews && <div>No reviews written yet!</div>}
          {reviews && reviews.length === 0 && (
            <div>No reviews written yet!</div>
          )}
          {reviews &&
            reviews.map((review) => {
              return (
                <div key={review.id}>
                  <div>{review.review}</div>
                  {review.stars === 5 && (
                    <div className="stars">
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                    </div>
                  )}
                  {review.stars === 4 && (
                    <div className="stars">
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                    </div>
                  )}
                  {review.stars === 3 && (
                    <div className="stars">
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                    </div>
                  )}
                  {review.stars === 2 && (
                    <div className="stars">
                      <img src={mug} className="star" alt="star" />
                      <img src={mug} className="star" alt="star" />
                    </div>
                  )}
                  {review.stars === 1 && (
                    <div className="stars">
                      <img src={mug} className="star" alt="star" />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    {/* </article> */}
    </div>
}
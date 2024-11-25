import React from 'react';

const HotelReview = ({ imageUrl, name, title, testimonial, rating }) => {
  // Create an array for the stars, based on the rating
  const stars = Array(5).fill(false).map((_, index) => index < rating);

  return (
    <div className="hotel-review">
      <div className="review-card">
        <div className="review-header">
          <img src={imageUrl} alt={`${name}'s testimonial`} className="review-image" />
          <div className="review-text">
            <h4 className="review-title">“{title}”</h4>
            <p className="review-body">{testimonial}</p>
            <div className="review-author">
              <h5 className="author-name">{name}</h5>
              <p className="author-role">Travel Blogger</p>
            </div>
            <div className="review-rating">
              {stars.map((isFilled, index) => (
                <svg
                  key={index}
                  className={`star-icon ${isFilled ? 'filled' : ''}`}
                  viewBox="0 0 1000 1000"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M450 75L338 312 88 350C46 354 25 417 58 450L238 633 196 896C188 942 238 975 275 954L500 837 725 954C767 975 813 942 804 896L763 633 942 450C975 417 954 358 913 350L663 312 550 75C529 33 471 33 450 75Z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelReview;

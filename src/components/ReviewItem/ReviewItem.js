import React from 'react';
import "./reviewItem.css";

const ReviewItem = (props) => {
    const {name,price,quantity,key}=props.product;
    return (
        <div className="review-item">
            <h4 className="product-name">{name}</h4>
          <p><small>${price}</small></p>
            <p>Quantity:{quantity}</p>
            <br/>
            <button onClick={()=>props.removeProduct(key)} className="add-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;
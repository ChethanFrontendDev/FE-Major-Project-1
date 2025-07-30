import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const AddToCartButton = ({ isAddedToCart, handleAddToCartBtn, navigateTo }) => {
  return (
    <div>
      {isAddedToCart ? (
        <Link
          to={`${navigateTo}`}
          className={`${
            !isAddedToCart ? "btn btn-secondary" : "btn btn-primary"
          }  w-100 my-2`}
        >
          {!isAddedToCart ? " Add to Cart" : "Go to Cart"}
        </Link>
      ) : (
        <Link
          onClick={handleAddToCartBtn}
          className={`${
            !isAddedToCart ? "btn btn-secondary" : "btn btn-primary"
          }  w-100 my-2`}
        >
          {!isAddedToCart ? " Add to Cart" : "Go to Cart"}
        </Link>
      )}
    </div>
  );
};
export default AddToCartButton;

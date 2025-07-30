import { useState } from "react";

const useHandleChangeBtn = () => {
  const [message, setMessage] = useState("");

  const handleChangeBtn = (url, productId, payload, refetch) => {
    if (productId) {
      fetch(`${url}/${productId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);

          if (payload.isAddedToCart === true) {
            setMessage("Added to Cart");
          } else if (payload.isAddedToCart === false) {
            setMessage("Removed from Cart");
          } else if (payload.isAddedToWishlist === true) {
            setMessage("Added to Wishlist");
          } else if (payload.isAddedToWishlist === false) {
            setMessage("Removed from Wishlist");
          }

          refetch();

          setTimeout(() => {
            setMessage("");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          setMessage("Something Went Wrong!");
          setTimeout(() => {
            setMessage("");
          }, 1000);
        });
    }
  };

  return { handleChangeBtn, message };
};

export default useHandleChangeBtn;

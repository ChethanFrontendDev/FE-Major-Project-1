import { toast } from "react-toastify";

const useHandleChangeBtn = () => {
  const handleChangeBtn = (url, productId, payload, refetch, silent=false) => {
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

          if (!silent) {
            if (payload.isAddedToCart === true) {
              toast.success("Added to Cart");
            } else if (payload.isAddedToCart === false) {
              toast.info("Removed from Cart");
            } else if (payload.isAddedToWishlist === true) {
              toast.success("Added to Wishlist");
            } else if (payload.isAddedToWishlist === false) {
              toast.info("Removed from Wishlist");
            }
            refetch();
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something Went Wrong!");
        });
    }
  };

  return { handleChangeBtn };
};

export default useHandleChangeBtn;

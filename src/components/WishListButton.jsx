const WishListButton = ({ handleToggleWishlistBtn, isAddedToWishlist }) => {
  return (
    <div>
      <button
        onClick={handleToggleWishlistBtn}
        className={` ${
          isAddedToWishlist ? "btn btn-secondary" : "btn btn-light"
        }  border w-100`}
      >
        {isAddedToWishlist ? "Remove from Wishlist" : " Save to Wishlist"}
      </button>
    </div>
  );
};

export default WishListButton;

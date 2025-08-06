import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useClothingDataContext from "../contexts/ClothingDataContext";
import useFetch from "../useFetch";
const Header = ({ isVisible, onSearch }) => {
  const { baseUrl, inputValue, setInputValue } = useClothingDataContext();

  const { data, refetch } = useFetch(`${baseUrl}/featuredCategories/products/`);
  const { data: userDetails } = useFetch(`${baseUrl}/profile`);

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchBtn = () => {
    onSearch(inputValue);
  };

  const profilePicture = userDetails?.map((item) => item.profilePictureUrl);

  const wishlistCount = data?.filter(
    (product) => product?.isAddedToWishlist === true
  );

  const addedToCartCount = data?.filter(
    (product) => product?.isAddedToCart === true
  );

  useEffect(() => {
    refetch();
  }, [data]);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div>
            <NavLink to="/" className="navbar-brand text-secondary">
              MyShoppingSite
            </NavLink>
          </div>
          {isVisible && (
            <div className="d-flex align-items-center">
              <input
                value={inputValue}
                onChange={handleInputValueChange}
                className="form-control"
                type="text"
                placeholder="Search"
              />
              <button className="btn btn-secondary" onClick={handleSearchBtn}>
                Search
              </button>
            </div>
          )}
          <div>
            <ul className="navbar-nav d-flex align-items-center flex-row gap-5">
              <li className="nav-item">
                <NavLink to="/products/wishlist" className="nav-link">
                  <div className="position-relative d-inline-block">
                    <i className="bi bi-heart fs-4"></i>
                    <span className="badge-notify">
                      {wishlistCount?.length}
                    </span>
                  </div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products/cart" className="nav-link">
                  <div>
                    <div className="position-relative d-inline-block">
                      <i className="bi bi-cart3 fs-4"></i>
                      <span className="badge-notify">
                        {addedToCartCount?.length}
                      </span>
                    </div>
                    <small className="ps-2">Cart</small>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile" className="nav-link">
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                    className="rounded-circle"
                    src={profilePicture}
                    alt="profile picture"
                  />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;

import { useEffect } from "react";
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

  const profilePicture = userDetails?.[0]?.profilePictureUrl;

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <NavLink to="/" className="navbar-brand text-secondary">
          MyShoppingSite
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          {isVisible && (
            <div className="d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 my-3 my-lg-0">
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

          <ul className="navbar-nav d-flex justify-content-around align-items-center flex-row gap-4 ms-auto">
            <li className="nav-item">
              <NavLink
                to="/products/wishlist"
                className="nav-link position-relative"
              >
                <i className="bi bi-heart fs-4"></i>
                <span className="badge-notify">{wishlistCount?.length}</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/products/cart"
                className="nav-link position-relative"
              >
                <i className="bi bi-cart3 fs-4"></i>
                <span className="badge-notify">{addedToCartCount?.length}</span>
                <small className="d-none d-sm-inline ps-2">Cart</small>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/profile" className="nav-link">
                <img
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                  className="rounded-circle"
                  src={profilePicture}
                  alt="profile"
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

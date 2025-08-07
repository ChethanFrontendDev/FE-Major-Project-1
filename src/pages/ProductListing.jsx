import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useClothingDataContext from "../contexts/ClothingDataContext";
import AddToCartButton from "../components/AddToCartButton";
import PriceRange from "../components/filters/PriceRange";
import SelectCategory from "../components/filters/SelectCategory";
import SelectRating from "../components/filters/SelectRating";
import SortByFilter from "../components/filters/SortByFilter";
import Header from "../components/Header";
import WishListButton from "../components/WishListButton";
import useFetch from "../useFetch";
import useHandleChangeBtn from "../useHandleChangeBtn";

export default function ProductListing() {
  const featuredCategoryName = useParams();
  let selectedfeaturedCategory = featuredCategoryName.categoryName;

  const { baseUrl, setInputValue } = useClothingDataContext();

  const [selectedSortOrder, setSelectedSortOrder] = useState();
  const [selectedRating, setSelectedRating] = useState();
  const [selectedPriceRange, setSelectedPriceRange] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchedData, setSearchedData] = useState("");

  const url = searchedData
    ? `${baseUrl}/featuredCategories/products/${selectedfeaturedCategory}/name/${searchedData}`
    : `${baseUrl}/featuredCategories/products/${selectedfeaturedCategory}`;
  const { data, loading, error, refetch } = useFetch(url);

  const { handleChangeBtn } = useHandleChangeBtn();

  const handleCategorySelection = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedCategory((prevValue) => [...prevValue, value]);
    } else {
      setSelectedCategory((prevValue) =>
        prevValue.filter((categoryValue) => categoryValue !== value)
      );
    }
  };

  const filteredProducts = (data || [])
    ?.filter((product) => {
      const priceRangeMatched =
        selectedPriceRange === 0 ? true : product.price <= selectedPriceRange;

      const categoryMatched =
        selectedCategory.length === 0
          ? true
          : selectedCategory.includes(product.categoryName);

      const ratingMatched = selectedRating
        ? product.rating >= selectedRating
        : true;

      return priceRangeMatched && categoryMatched && ratingMatched;
    })
    .sort((a, b) =>
      selectedSortOrder === "lowToHigh"
        ? a.price - b.price
        : selectedSortOrder === "highToLow"
        ? b.price - a.price
        : 0
    );

  const handleResetFilters = () => {
    setSelectedPriceRange(10000);
    setSelectedCategory([]);
    setSelectedRating("");
    setSelectedSortOrder([]);
    setInputValue("");
    setSearchedData("");
  };

  return (
    <>
      <Header isVisible={true} onSearch={setSearchedData} />

      <div className="container-fluid">
        <div className="row">
          {/* Filters Sidebar */}
          <div className="col-12 col-md-3 mb-4">
            <div className="px-3 pt-3">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-2" style={{ fontSize: "1.1rem" }}>
                  <strong>Filters</strong>
                </p>
                <Link
                  onClick={handleResetFilters}
                  className="nav-link text-decoration-underline"
                >
                  Clear
                </Link>
              </div>
              <PriceRange
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
              />
              <SelectCategory
                selectedCategory={selectedCategory}
                handleCategorySelection={handleCategorySelection}
              />
              <SelectRating
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
              <SortByFilter
                selectedSortBy={selectedSortOrder}
                setSelectedSortBy={setSelectedSortOrder}
              />
            </div>
          </div>

          {/* Products Section */}
          <div className="col-12 col-md-9">
            <div className="bg-light text-dark px-3">
              {filteredProducts?.length > 0 && (
                <p className="pt-3 ps-3">
                  <strong>Showing All Products</strong>{" "}
                  <small>(showing {filteredProducts?.length} products)</small>
                </p>
              )}

              <div className="row">
                {loading && <p className="text-center">Loading...</p>}
                {error && (
                  <p className="text-center">Error While Fetching Data.</p>
                )}
                {!filteredProducts?.length > 0 && (
                  <p className="text-center">No Data Found.</p>
                )}

                {filteredProducts?.map((product, index) => (
                  <div className="col-12 col-md-6 mb-4" key={index}>
                    <div className="card h-100 shadow-sm">
                      <div className="row g-0 h-100">
                        <div className="col-12 col-sm-5">
                          <img
                            className="img-fluid h-100 w-100"
                            style={{ objectFit: "cover" }}
                            src={product?.productUrl}
                            alt={`${product?.categoryName} image`}
                          />
                        </div>

                        <div className="col-12 col-sm-7 p-3 d-flex flex-column justify-content-between">
                          <div>
                            <Link
                              to={`/products/${product?.featuredCategory}/${product?.productName}/details/${product?._id}`}
                              className="nav-link"
                            >
                              <p className="mb-1">
                                <strong>{product?.productName}</strong>
                              </p>
                              <small>
                                <span className="text-secondary">
                                  {product?.rating} rating |
                                </span>{" "}
                                <span className="text-warning">
                                  {"★".repeat(product?.rating)}
                                </span>
                              </small>
                              <h6 className="mt-2">
                                <span>
                                  ₹
                                  {product?.price -
                                    (product?.price * product?.discountRate) /
                                      100}
                                </span>{" "}
                                <small className="text-secondary text-decoration-line-through">
                                  {product?.price}
                                </small>
                              </h6>
                              <p className="text-success">
                                {product?.discountRate}% Discount
                              </p>
                            </Link>
                          </div>

                          <div className="d-flex gap-2 flex-wrap">
                            <AddToCartButton
                              navigateTo={"/products/cart"}
                              isAddedToCart={product?.isAddedToCart}
                              handleAddToCartBtn={() => {
                                handleChangeBtn(
                                  `${baseUrl}/featuredCategories/products/${selectedfeaturedCategory}`,
                                  product?._id,
                                  { isAddedToCart: true },
                                  refetch
                                );
                              }}
                            />

                            <WishListButton
                              isAddedToWishlist={product?.isAddedToWishlist}
                              handleToggleWishlistBtn={() =>
                                handleChangeBtn(
                                  `${baseUrl}/featuredCategories/products/${selectedfeaturedCategory}`,
                                  product?._id,
                                  {
                                    isAddedToWishlist:
                                      !product?.isAddedToWishlist,
                                  },
                                  refetch
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import AddToCartButton from "../components/AddToCartButton";
import Header from "../components/Header";
import useClothingDataContext from "../contexts/ClothingDataContext";
import useHandleChangeBtn from "../useHandleChangeBtn";
import useFetch from "../useFetch";

export default function WishList() {
  const { baseUrl, selectedFeaturedCategory } = useClothingDataContext();

  const { data, loading, error, refetch } = useFetch(
    `${baseUrl}/featuredCategories/products/`
  );

  const { handleChangeBtn } = useHandleChangeBtn();

  const filteredWishListProduct = data?.filter(
    (product) => product.isAddedToWishlist === true
  );

  return (
    <>
      <Header />
      <div className="bg-light min-vh-100">
        <h5 className="fw-bold text-center py-3">My WishList</h5>

        <div className="container">
          <div className="row py-3">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center">Error while fetching data.</p>}
            {!filteredWishListProduct?.length > 0 && (
              <p className="text-center">No Data Found.</p>
            )}

            {filteredWishListProduct?.map((product) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                key={product._id}
              >
                <div className="card w-100 shadow-sm">
                  {/* Product Image with Wishlist Icon */}
                  <div className="position-relative">
                    <img
                      src={product.productUrl}
                      className="card-img-top img-fluid"
                      style={{ height: "18rem", objectFit: "cover" }}
                      alt={`${product.productName} image`}
                    />
                    {product.isAddedToWishlist && (
                      <span
                        onClick={() =>
                          handleChangeBtn(
                            `${baseUrl}/featuredCategories/products/${selectedFeaturedCategory}`,
                            product?._id,
                            {
                              isAddedToWishlist: !product.isAddedToWishlist,
                            },
                            refetch
                          )
                        }
                      >
                        <i
                          className="bi bi-heart-fill text-danger position-absolute top-0 end-0 m-2 fs-4"
                          role="button"
                        ></i>
                      </span>
                    )}
                  </div>

                  {/* Product Details and Add To Cart */}
                  <div className="card-body text-center">
                    <p className="card-text mb-2">{product.productName}</p>
                    <h6 className="fw-bold mb-3">₹{product.price}</h6>
                    <AddToCartButton
                      navigateTo="/products/cart"
                      isAddedToCart={product.isAddedToCart}
                      handleAddToCartBtn={() =>
                        handleChangeBtn(
                          `${baseUrl}/featuredCategories/products/${selectedFeaturedCategory}`,
                          product?._id,
                          {
                            isAddedToCart: true,
                          },
                          refetch
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

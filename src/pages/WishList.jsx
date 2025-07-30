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

  const { handleChangeBtn, message } = useHandleChangeBtn();

  const filteredWishListProduct = data?.filter(
    (product) => product.isAddedToWishlist === true
  );

  return (
    <>
      <Header />
      <div className="bg-light">
        <h5 className="fw-bold text-center py-3">My WishList</h5>
        <div className="container">
          <div className="row py-3">
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center">Error while fetching data.</p>}
            {!filteredWishListProduct?.length > 0 && (
              <p className="text-center">No Data Found.</p>
            )}
            {message && <p className="text-center">{message}</p>}
            {filteredWishListProduct?.map((product) => (
              <div className="col-md-3 mb-3" key={product._id}>
                <div className="position-relative">
                  <img
                    src={product.productUrl}
                    className="object-fit-cover"
                    style={{ height: "18rem", width: "16.3rem" }}
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

                <div style={{ backgroundColor: "white" }}>
                  <p
                    className="py-1 text-center"
                    style={{ marginBottom: "-5px" }}
                  >
                    {product.productName} <br />
                    <span className="fw-bold">₹{product.price}</span>
                  </p>
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

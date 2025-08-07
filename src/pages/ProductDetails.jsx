import { useParams, Link } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import CartHeader from "../components/CartHeader";
import Header from "../components/Header";
import useClothingDataContext from "../contexts/ClothingDataContext";
import useHandleChangeBtn from "../useHandleChangeBtn";
import useFetch from "../useFetch";

export default function ProductDetails() {
  const { productList, setProductList, baseUrl } = useClothingDataContext();

  const productId = useParams();
  let selectedFeaturedCategory = productId.categoryName;
  let selectedId = productId.productId;

  const { data, loading, error, refetch } = useFetch(
    `${baseUrl}/featuredCategories/products/${selectedFeaturedCategory}/id/${selectedId}`
  );

  const { handleChangeBtn } = useHandleChangeBtn();

  const productDetails = productList?.find((prod) => prod?._id === data?._id);

  const sizes = ["S", "M", "XL", "XXL"];

  const addselectedSizeToProductList = (productId, size) => {
    if (productDetails?.selectedSize) {
      setProductList((prevValue) =>
        prevValue.map((property) =>
          property._id === productId
            ? {
                ...property,
                selectedSize: size,
              }
            : property
        )
      );
    }
  };

  return (
    <>
      <Header />
      <div className="bg-light py-4">
        <div className="container">
          <div className="p-3 bg-white rounded shadow-sm">
            {loading && <p className="text-center">Loading...</p>}
            {error && (
              <p className="text-center">Error while fetching the data.</p>
            )}

            {data && (
              <div className="row g-4">
                <div className="col-12 col-md-4">
                  <img
                    className="img-fluid w-100 rounded"
                    src={data?.productUrl}
                    alt={`${data?.productName} image`}
                  />
                  <Link
                    to={`/products/cart`}
                    className="w-100 mt-3 btn btn-primary"
                    onClick={() =>
                      handleChangeBtn(
                        `${baseUrl}/featuredCategories/products/${selectedFeaturedCategory}`,
                        data?._id,
                        {
                          selectedSize: productDetails?.selectedSize,
                          quantity: productDetails?.quantity,
                          isAddedToCart: true,
                        },
                        refetch
                      )
                    }
                  >
                    Buy Now
                  </Link>

                  <AddToCartButton
                    navigateTo={"/products/cart"}
                    isAddedToCart={data?.isAddedToCart}
                    handleAddToCartBtn={() =>
                      handleChangeBtn(
                        `${baseUrl}/featuredCategories/products/${selectedFeaturedCategory}`,
                        data?._id,
                        {
                          selectedSize: productDetails?.selectedSize,
                          quantity: productDetails?.quantity,
                          isAddedToCart: true,
                        },
                        refetch
                      )
                    }
                  />
                </div>

                <div className="col-12 col-md-8">
                  <CartHeader productDetails={data} canRender={true} />

                  <div className="mb-3">
                    <label className="fw-medium me-2">Size:</label>
                    {sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`btn btn-sm me-2 px-3 py-1 ${
                          productDetails?.selectedSize === size
                            ? "btn-outline-primary"
                            : "btn-outline-secondary"
                        }`}
                        onClick={() =>
                          addselectedSizeToProductList(data?._id, size)
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <hr />
                  <div className="row text-center gy-3">
                    <div className="col-6 col-sm-3">
                      <i className="bi bi-shop bg-light p-2 rounded-circle fs-5"></i>
                      <p className="mt-2 lh-sm small">
                        {data?.numberOfReturnableDays} days Returnable
                      </p>
                    </div>
                    <div className="col-6 col-sm-3">
                      <i className="bi bi-cash bg-light p-2 rounded-circle fs-5"></i>
                      <p className="mt-2 lh-sm small">
                        {data?.isPayOnDeliveryAvailable
                          ? "Pay on Delivery"
                          : "Pay Online"}
                      </p>
                    </div>
                    <div className="col-6 col-sm-3">
                      <i className="bi bi-truck bg-light p-2 rounded-circle fs-5"></i>
                      <p className="mt-2 lh-sm small">
                        {data?.isFreeDeliveryAvailable
                          ? "Free Delivery"
                          : "Delivery Charges"}
                      </p>
                    </div>
                    <div className="col-6 col-sm-3">
                      <i className="bi bi-credit-card-2-back bg-light p-2 rounded-circle fs-5"></i>
                      <p className="mt-2 lh-sm small">
                        {data?.isSecurePayment && "Secure Payment"}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div>
                    <small className="fw-medium">Description: </small>
                    <ul className="mt-2 ps-3">
                      {data?.description.map((list, index) => (
                        <li key={index} className="small">
                          {list}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

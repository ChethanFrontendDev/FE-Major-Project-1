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

  const { handleChangeBtn, message } = useHandleChangeBtn();

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
      <div className="bg-light py-4" style={{ padding: "0 10rem" }}>
        <div className="p-3" style={{ backgroundColor: "white" }}>
          {loading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center">Error while fetching the data.</p>
          )}
          {message && <p className="text-center">{message}</p>}
          {data && (
            <div className="row">
              <div className="col-md-3">
                <img
                  className="img-fluid"
                  src={data?.productUrl}
                  alt={`${data?.productName} image`}
                />
                <Link
                  to={`/products/cart`}
                  className="w-100 mt-2 btn btn-primary"
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
              <div className="col-md-9 py-3 ps-4">
                <CartHeader productDetails={data} canRender={true} />
                <small>
                  <label className="pe-2 fw-medium">Size:</label>
                  <>
                    {sizes.map((size, index) => (
                      <button
                        key={index}
                        className={`btn ${
                          productDetails?.selectedSize === size
                            ? "btn-outline-primary"
                            : "btn-outline-secondary"
                        }  me-2 px-2 py-0`}
                        onClick={() =>
                          addselectedSizeToProductList(data?._id, size)
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </>
                </small>
                <hr />
                <div className="row d-flex gap-4 align-items-center">
                  <div className="col-md-1 text-center">
                    <i className="bi bi-shop bg-light p-2 rounded-circle"></i>
                    <p className="mt-2 lh-sm" style={{ fontSize: "0.6rem" }}>
                      {data?.numberOfReturnableDays} days Returnable
                    </p>
                  </div>
                  <div className="col-md-1 text-center">
                    <i className="bi bi-cash bg-light p-2 rounded-circle"></i>
                    <p className="mt-2 lh-sm" style={{ fontSize: "0.6rem" }}>
                      {data?.isPayOnDeliveryAvailable
                        ? "Pay on Delivery"
                        : "Pay Online"}
                    </p>
                  </div>
                  <div className="col-md-1 text-center">
                    <i className="bi bi-truck bg-light p-2 rounded-circle"></i>
                    <p className="mt-2 lh-sm" style={{ fontSize: "0.6rem" }}>
                      {data?.isFreeDeliveryAvailable
                        ? "Free Delivery"
                        : "Delivery Charges"}
                    </p>
                  </div>
                  <div className="col-md-1 text-center">
                    <i className="bi bi-credit-card-2-back bg-light p-2 rounded-circle"></i>
                    <p className="mt-2 lh-sm" style={{ fontSize: "0.6rem" }}>
                      {data?.isSecurePayment && "Secure Payment"}
                    </p>
                  </div>
                </div>
                <hr />
                <div>
                  <small className="fw-medium">Description: </small>
                  <ul>
                    {data?.description.map((list, index) => (
                      <li style={{ fontSize: "0.9rem" }} key={index}>
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
    </>
  );
}

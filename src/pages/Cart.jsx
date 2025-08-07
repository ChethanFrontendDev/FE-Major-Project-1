import { useEffect } from "react";
import { Link } from "react-router-dom";
import useClothingDataContext from "../contexts/ClothingDataContext";
import CartHeader from "../components/CartHeader";
import Header from "../components/Header";
import WishListButton from "../components/WishListButton";
import useHandleChangeBtn from "../useHandleChangeBtn";
import useFetch from "../useFetch";

export default function Cart() {
  const {
    productList,
    baseUrl,
    deliveryCharges,
    setAddedToCheckout,
    selectedFeaturedCategory,
  } = useClothingDataContext();

  const { data, loading, error, refetch } = useFetch(
    `${baseUrl}/featuredCategories/products`
  );

  const { handleChangeBtn } = useHandleChangeBtn();

  const CartProduct = data?.filter((product) => product.isAddedToCart === true);

  const filteredCartProducts = productList?.filter(
    (product) => product.isAddedToCart === true
  );

  const getAddedToCartItemsCount = filteredCartProducts?.reduce(
    (acc, curr) => (curr.isAddedToCart ? acc + 1 : acc),
    0
  );

  const getItemPrice = filteredCartProducts?.reduce(
    (acc, curr) =>
      curr.isAddedToCart === true ? acc + curr.price * curr.quantity : acc,
    0
  );

  const getDiscountedPrice = (getItemPrice, discountValue) => {
    return getItemPrice - getItemPrice * discountValue;
  };

  const getTotalDiscountedAmount = filteredCartProducts?.reduce((acc, curr) => {
    if (!curr.isAddedToCart) return acc;
    const discountValue = curr.discountRate / 100;
    const discountedPrice = getDiscountedPrice(curr.price, discountValue);
    return acc + discountedPrice * curr.quantity;
  }, 0);

  const getFinalCartPrice =
    getItemPrice + deliveryCharges - getTotalDiscountedAmount;

  const cartItems = productList
    ?.filter((item) => item.isAddedToCart)
    .map((item) => ({
      price: item.price,
      quantity: item.quantity,
      discountRate: item.discountRate,
    }));

  const handleCheckout = () => {
    if (filteredCartProducts && filteredCartProducts.length > 0) {
      const updatedOrderList = filteredCartProducts.map((item) => ({
        ...item,
        isAddedToCheckout: true,
      }));

      const finalCheckoutData = {
        products: updatedOrderList,
        totalItemPrice: getItemPrice,
        totalItemDiscount: getTotalDiscountedAmount,
        deliveryCharges: deliveryCharges,
        totalCartValue: getFinalCartPrice,
      };
      setAddedToCheckout(finalCheckoutData);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Header />
      <div className="bg-light py-4">
        <div className="container" style={{ padding: "0px 50px" }}>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center">Error While Fetching data.</p>}
          {!CartProduct?.length && (
            <p className="text-center">No Data Found.</p>
          )}
          {CartProduct && CartProduct.length > 0 && (
            <div className="row">
              <div className="col-md-7">
                {CartProduct.map((product) => (
                  <div className="card mb-4" key={product._id}>
                    <div className="row g-0">
                      <div className="col-md-5">
                        <img
                          src={product.productUrl}
                          alt={`${product.productName} image`}
                          className="img-fluid h-100 object-fit-cover w-100"
                          style={{ maxHeight: "17.5rem", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <CartHeader
                            productDetails={product}
                            canRender={false}
                          />
                          <button
                            onClick={() =>
                              handleChangeBtn(
                                `${baseUrl}/featuredCategories/products/${selectedFeaturedCategory}`,
                                product._id,
                                {
                                  isAddedToCart: false,
                                  selectedSize: "M",
                                  quantity: 1,
                                },
                                refetch
                              )
                            }
                            className="btn btn-secondary w-100 mt-2"
                          >
                            Remove From Cart
                          </button>
                          <div className="mt-3">
                            <WishListButton
                              isAddedToWishlist={product.isAddedToWishlist}
                              handleToggleWishlistBtn={() =>
                                handleChangeBtn(
                                  `${baseUrl}/featuredCategories/products/${selectedFeaturedCategory}`,
                                  product._id,
                                  {
                                    isAddedToWishlist:
                                      !product.isAddedToWishlist,
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

              <div className="col-md-5">
                <div className="card border-0">
                  <div className="card-body">
                    <small className="fw-medium">PRICE DETAILS</small>
                    <hr />
                    <span className="d-flex justify-content-between">
                      <small>Price ({getAddedToCartItemsCount} items)</small>
                      <small>₹{getItemPrice}</small>
                    </span>

                    {cartItems?.map((item, index) => (
                      <small
                        key={index}
                        className="d-flex justify-content-between pt-1"
                      >
                        <small className="text-secondary">
                          Item {index + 1}: {item.price} x {item.quantity}
                          <br />
                        </small>
                        <small className="text-secondary">
                          {item.price * item.quantity}
                        </small>
                        <small className="text-secondary">
                          -
                          {(item.price -
                            item.price * (item.discountRate / 100)) *
                            item.quantity}
                        </small>
                      </small>
                    ))}

                    <br />

                    <span className="d-flex justify-content-between">
                      <small>Discount</small>
                      <small>-{getTotalDiscountedAmount}</small>
                    </span>

                    <span className="d-flex justify-content-between">
                      <small>Delivery Charges</small>
                      <small>
                        {getItemPrice > 1000
                          ? deliveryCharges
                          : "Free Delivery"}
                      </small>
                    </span>

                    <hr />

                    <span className="d-flex justify-content-between">
                      <small className="fw-medium">TOTAL AMOUNT</small>
                      <small>₹{getFinalCartPrice}</small>
                    </span>

                    <hr />
                    <small>
                      You will save ₹{getTotalDiscountedAmount} on this order
                    </small>

                    <Link
                      to="/products/cart/checkout"
                      className="btn btn-primary w-100 mt-3"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

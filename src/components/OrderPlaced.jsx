import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useClothingDataContext from "../contexts/ClothingDataContext";
import useHandleChangeBtn from "../useHandleChangeBtn";
import Header from "./Header";

const OrderPlaced = () => {
  const { addedToCheckout, baseUrl, refetch } = useClothingDataContext();

  const { handleChangeBtn } = useHandleChangeBtn();

  const location = useLocation();
  const selectedAddress = location.state?.address;

  const [ordered, setOrderes] = useState(null);

  const handleSaveOrder = () => {
    const payload = {
      products: ordered?.items?.products,
      address: ordered.address,
      deliveryCharges: ordered.items?.deliveryCharges,
      totalCartValue: ordered.items?.totalCartValue,
      totalItemDiscount: ordered.items?.totalItemDiscount,
      totalItemPrice: ordered.items?.totalItemPrice,
    };
    fetch(`${baseUrl}/featuredCategories/placedOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClearCart = () => {
    if (!addedToCheckout?.products?.length) return;

    addedToCheckout.products
      .filter((item) => item.isAddedToCart)
      .forEach((item) => {
        handleChangeBtn(
          `${baseUrl}/featuredCategories/products/${item.featuredCategory}`,
          item._id,
          {
            isAddedToCart: false,
            selectedSize: "M",
            quantity: 1,
          },
          refetch,
          true
        );
      });
  };

  useEffect(() => {
    setOrderes({ items: addedToCheckout, address: selectedAddress });
    handleClearCart();
    refetch();
  }, []);

  useEffect(() => {
    if (ordered) {
      handleSaveOrder();
    }
  }, [ordered]);
  return (
    <div className="container">
      <Header />

      <div style={{ margin: "0px 100px" }}>
        <div className="container py-5 bg-light">
          {(!ordered?.items?.products ||
            ordered.items.products.length === 0) && (
            <p className="text-center">No data to show.</p>
          )}
          {addedToCheckout && (
            <>
              <h3 className="text-center text-secondary">
                Order Placed Successfully.
              </h3>
              <p className="text-center pt-3">Order Summary</p>

              <div style={{ margin: "0px 100px" }}>
                <ul className="list-group">
                  {(ordered?.items?.products || []).map((product) => (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center"
                      key={product._id}
                    >
                      <span className="col-md-9">{product.productName}</span>
                      <span className="col-md-1">{product.quantity}</span>
                      <span className="col-md-1">x</span>
                      <span className="col-md-1">
                        ₹{product.quantity * product.price}
                      </span>
                    </li>
                  ))}
                </ul>
                {ordered?.items?.products?.length > 0 && (
                  <div className="px-3 py-3 text-secondary">
                    <span className="d-flex justify-content-between align-items-center">
                      <span>Total Price</span>
                      <span>₹{ordered?.items?.totalItemPrice}</span>
                    </span>

                    <span className="d-flex justify-content-between align-items-center">
                      <span>Total Discount </span>
                      <span>-{ordered?.items?.totalItemDiscount}</span>
                    </span>

                    <span className="d-flex justify-content-between align-items-center">
                      <span>Delivery Charges </span>
                      <span>+{ordered?.items?.deliveryCharges}</span>
                    </span>

                    <hr />

                    <p className="d-flex justify-content-between align-items-center text-dark">
                      <span>Total Cart Value</span>
                      <span>₹{ordered?.items?.totalCartValue}</span>
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderPlaced;

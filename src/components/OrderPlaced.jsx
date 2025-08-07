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

      <div className="py-4">
        <div className="container bg-light p-4 p-md-5 rounded">
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

              <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                  <ul className="list-group">
                    {(ordered?.items?.products || []).map((product) => (
                      <li
                        key={product._id}
                        className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center"
                      >
                        <span className="fw-medium">{product.productName}</span>
                        <div className="d-flex gap-2">
                          <span>{product.quantity}</span>
                          <span>x</span>
                          <span>₹{product.quantity * product.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {ordered?.items?.products?.length > 0 && (
                    <div className="text-secondary mt-4">
                      <div className="d-flex justify-content-between py-1">
                        <span>Total Price</span>
                        <span>₹{ordered?.items?.totalItemPrice}</span>
                      </div>
                      <div className="d-flex justify-content-between py-1">
                        <span>Total Discount</span>
                        <span>-₹{ordered?.items?.totalItemDiscount}</span>
                      </div>
                      <div className="d-flex justify-content-between py-1">
                        <span>Delivery Charges</span>
                        <span>+₹{ordered?.items?.deliveryCharges}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between py-1 text-dark fw-bold">
                        <span>Total Cart Value</span>
                        <span>₹{ordered?.items?.totalCartValue}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderPlaced;

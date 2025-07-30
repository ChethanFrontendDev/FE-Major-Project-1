import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useClothingDataContext from "../contexts/ClothingDataContext";
import useHandleChangeBtn from "../useHandleChangeBtn";
import Header from "./Header";
import OrderList from "./OrderList";

const OrderPlaced = () => {
  const { addedToCheckout, baseUrl, refetch } = useClothingDataContext();

  const { handleChangeBtn } = useHandleChangeBtn();

  const location = useLocation();
  const selectedAddress = location.state?.address;

  const [ordered, setOrderes] = useState(null);

  const handleSaveOrder = () => {
    fetch(`${baseUrl}/featuredCategories/placedOrders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ordered),
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
          refetch
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
          {addedToCheckout && (
            <>
              <h3 className="text-center text-secondary">
                Order Placed Successfully.
              </h3>
              <p className="text-center pt-3">Order Summary</p>
              <OrderList />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderPlaced;

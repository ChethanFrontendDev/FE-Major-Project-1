import useClothingDataContext from "../contexts/ClothingDataContext";
import useFetch from "../useFetch";

const OrderList = () => {
  const { baseUrl } = useClothingDataContext();

  const { data } = useFetch(`${baseUrl}/featuredCategories/placedOrders`);

  const totalItemPrice = data?.reduce(
    (acc, curr) => acc + curr.totalItemPrice,
    0
  );

  const totalItemDiscount = data?.reduce(
    (acc, curr) => acc + curr.totalItemDiscount,
    0
  );

  const totalCartValue = data?.reduce(
    (acc, curr) => acc + curr.totalCartValue,
    0
  );

  const deliveryCharges = data?.reduce(
    (acc, curr) => acc + curr.deliveryCharges,
    0
  );

  return (
    <div style={{ margin: "0px 100px" }}>
      <ul className="list-group">
        {!data && <p className="text-center">No data to show.</p>}
        {data?.flatMap((item) =>
          item.products.map((product) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={product._id}
              >
                <span className="col-md-9"> {product.productName} </span>
                <span className="col-md-1">{product.quantity}</span>
                <span className="col-md-1">x</span>
                <span className="col-md-1">
                  ₹{product.quantity * product.price}
                </span>
              </li>
            );
          })
        )}
      </ul>
      {data?.length > 0 && (
        <div className="px-3 py-3 text-secondary">
          {totalItemPrice && (
            <span className="d-flex justify-content-between align-items-center">
              <span>Total Price</span>
              <span>₹{totalItemPrice}</span>
            </span>
          )}
          {totalItemDiscount && (
            <span className="d-flex justify-content-between align-items-center">
              <span>Total Discount </span>
              <span>-{totalItemDiscount}</span>
            </span>
          )}
          {deliveryCharges && (
            <span className="d-flex justify-content-between align-items-center">
              <span>Delivery Charges </span>
              <span>+{deliveryCharges}</span>
            </span>
          )}
          <hr />
          {totalCartValue && (
            <p className="d-flex justify-content-between align-items-center text-dark">
              <span>Total Cart Value</span>
              <span>₹{totalCartValue}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default OrderList;

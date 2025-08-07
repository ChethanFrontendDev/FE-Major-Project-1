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
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <ul className="list-group">
            {!data && <p className="text-center">No data to show.</p>}
            {data?.flatMap((item) =>
              item.products.map((product) => (
                <li
                  className="list-group-item d-flex flex-wrap justify-content-between align-items-center"
                  key={product._id}
                >
                  <span className="flex-grow-1">{product.productName}</span>
                  <span className="mx-2">{product.quantity}</span>
                  <span className="mx-2">x</span>
                  <span className="mx-2">
                    ₹{product.quantity * product.price}
                  </span>
                </li>
              ))
            )}
          </ul>

          {data?.length > 0 && (
            <div className="px-3 py-3 text-secondary">
              {totalItemPrice && (
                <div className="d-flex justify-content-between">
                  <span>Total Price</span>
                  <span>₹{totalItemPrice}</span>
                </div>
              )}
              {totalItemDiscount && (
                <div className="d-flex justify-content-between">
                  <span>Total Discount</span>
                  <span>-{totalItemDiscount}</span>
                </div>
              )}
              {deliveryCharges && (
                <div className="d-flex justify-content-between">
                  <span>Delivery Charges</span>
                  <span>+{deliveryCharges}</span>
                </div>
              )}
              <hr />
              {totalCartValue && (
                <div className="d-flex justify-content-between text-dark">
                  <strong>Total Cart Value</strong>
                  <strong>₹{totalCartValue}</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderList;

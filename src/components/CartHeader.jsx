import { useEffect } from "react";
import useClothingDataContext from "../contexts/ClothingDataContext";

const CartHeader = ({ productDetails, canRender }) => {
  const { productList, handleIncrement, handleDecrement, refetch } =
    useClothingDataContext();

  const getQuantityFromContext = productList?.find(
    (prod) => prod?._id === productDetails?._id
  );

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <h6>{productDetails?.productName}</h6>
      {canRender && (
        <p>
          {productDetails?.rating}{" "}
          <span className="text-warning ps-1" style={{ fontSize: "1.2rem" }}>
            {"★".repeat(productDetails?.rating)}
          </span>
        </p>
      )}

      <h5 className="pt-2">
        ₹
        {productDetails?.price -
          (productDetails?.price * productDetails?.discountRate) / 100}
        <small
          className="text-secondary text-decoration-line-through ps-3"
          style={{ fontSize: "0.9rem" }}
        >
          ₹{productDetails?.price}
        </small>
      </h5>
      <p className="text-secondary fw-medium ps-2">
        {productDetails?.discountRate}% Off
      </p>
      <small className="d-flex align-items-center pb-3 pt-2">
        <label className="pe-2 fw-medium">Quantity: </label>
        <button
          className="btn btn-light rounded-circle border px-2 py-0"
          onClick={() => handleDecrement(productDetails?._id)}
        >
          -
        </button>
        <span className="mx-2 px-2 border">
          {getQuantityFromContext?.quantity}
          {/* {productDetails?.quantity} */}
        </span>
        <button
          className="btn btn-light rounded-circle border  px-2 py-0"
          onClick={() => handleIncrement(productDetails?._id)}
        >
          +
        </button>
      </small>
    </div>
  );
};
export default CartHeader;

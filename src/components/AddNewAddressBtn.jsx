import { Link } from "react-router-dom";
import useClothingDataContext from "../contexts/ClothingDataContext";

const AddNewAddressBtn = () => {
  const { setFormStatus } = useClothingDataContext();
  return (
    <Link
      to="/products/cart/checkout/adress-form"
      className="btn btn-primary"
      onClick={() => setFormStatus("add")}
    >
      Add New Address
    </Link>
  );
};

export default AddNewAddressBtn;

import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddNewAddressBtn from "../components/AddNewAddressBtn";
import Header from "../components/Header";
import useClothingDataContext from "../contexts/ClothingDataContext";
import useFetch from "../useFetch";

export default function Checkout() {
  const { setFormStatus, setEditFormById, baseUrl } = useClothingDataContext();
  const { data, loading, error, refetch } = useFetch(`${baseUrl}/profile`);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const userAdressList = data?.flatMap((user) =>
    user?.address?.map((item) => ({
      id: item._id,
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      addressLine: item.addressLine,
      landMark: item.landMark,
      zipCode: item.zipCode,
    }))
  );

  const handleAddress = (id) => {
    const selectedAddress = userAdressList.find(
      (address) => address?.id === id
    );
    setSelectedAddress(selectedAddress);
  };

  const userId = data?.map((user) => user?._id).join(", ");

  const handleDelete = (addressId) => {
    if (addressId) {
      fetch(`${baseUrl}/profile/user/${userId}/address/${addressId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.message) {
            refetch();
            toast.error("Address deleted successfully!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleEdit = (id) => {
    setFormStatus("edit");
    setEditFormById(id);
  };

  return (
    <>
      <Header />
      <div className="bg-light">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center">Error While Fetching Data.</p>}
        <div className="container" style={{ padding: "30px 200px" }}>
          <div className="d-flex justify-content-between align-items-start pb-3">
            <h4>Select Address</h4>
            {selectedAddress ? (
              <Link
                to="/products/cart/checkout/order-placed"
                state={{ address: selectedAddress }}
                className="btn btn-primary"
              >
                Place Your Order
              </Link>
            ) : (
              <button className="btn btn-primary" disabled>
                Place Your Order
              </button>
            )}
          </div>
          {userAdressList?.map((product, index) => (
            <div className="col-md-12 mb-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="selectedAddress"
                      id={`address-${product?.id}`}
                      checked={selectedAddress?.id === product?.id}
                      onChange={() => handleAddress(product?.id)}
                    />
                    <div className="text-end">
                      <Link
                        to="/products/cart/checkout/adress-form"
                        onClick={() => handleEdit(product?.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="bi bi-pen"></i>
                      </Link>
                      <span
                        onClick={() => handleDelete(product?.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="bi bi-trash text-danger ms-3"></i>
                      </span>
                    </div>
                    <label
                      className="form-check-label"
                      htmlFor={`address-${product?.id}`}
                    >
                      <h6 className="card-title">{product?.fullName}</h6>

                      <span>
                        {product?.addressLine} - {product?.zipCode} <br />
                        {product?.landMark}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <AddNewAddressBtn />
        </div>
      </div>
    </>
  );
}

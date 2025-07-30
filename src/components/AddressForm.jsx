import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useClothingDataContext from "../contexts/ClothingDataContext";
import useFetch from "../useFetch";
import Header from "./Header";

const AddressForm = () => {
  const { baseUrl, formStatus, editFormById } = useClothingDataContext();

  const { data, loading, error, refetch } = useFetch(`${baseUrl}/profile`);

  const userId = data?.map((user) => user?._id).join(", ");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [editAddressMessage, setEditAddressMessage] = useState("");
  const [addAddressMessage, setAddAddressMessage] = useState("");

  const editAdressById = data
    ?.flatMap((user) => user?.address)
    .find((addr) => addr?._id === editFormById);

  useEffect(() => {
    if (editAdressById && formStatus === "edit") {
      setFormData(editAdressById);
    } else {
      setFormData({
        fullName: "",
        phoneNumber: "",
        addressLine: "",
        landMark: "",
        zipCode: "",
      });
    }
  }, [editAdressById, formStatus]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name) {
      setFormData((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (event, addressId) => {
    event.preventDefault();

    if (formStatus === "edit") {
      fetch(`${baseUrl}/profile/user/${userId}/address/${addressId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          console.log(data);
          setEditAddressMessage("Address Updated.");
          refetch();
          setTimeout(() => {
            setEditAddressMessage("");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (formStatus === "add") {
      fetch(`${baseUrl}/profile/user/${userId}/address`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          setAddAddressMessage("Address Added.");
          console.log(data);
          refetch();
          setTimeout(() => {
            setAddAddressMessage("");
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container pb-5">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center">Error While Fetching Data.</p>}
          <h5 className="py-3">Your Address</h5>
          <form onSubmit={(event) => handleFormSubmit(event, formData._id)}>
            <div className="mb-3">
              <label className="form-label" htmlFor="fullName">
                Full Name:
              </label>
              <input
                className="form-control"
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="phoneNumber">
                Phone Number:
              </label>
              <input
                className="form-control"
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="addressLine1">
                Address Line:
              </label>
              <input
                className="form-control"
                type="text"
                id="addressLine"
                placeholder="House No, Building Name, Street, Area"
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="landmark">
                Landmark:
              </label>
              <input
                className="form-control"
                type="text"
                id="landmark"
                name="landMark"
                value={formData.landMark}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="zipCode">
                Zipcode:
              </label>
              <input
                className="form-control"
                type="number"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
            <button
              to="/products/cart/checkout"
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
          {editAddressMessage && (
            <p className="text-warning py-2">{editAddressMessage}</p>
          )}
          {addAddressMessage && (
            <p className="text-success py-2">{addAddressMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressForm;

import AddNewAddressBtn from "../components/AddNewAddressBtn";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import useClothingDataContext from "../contexts/ClothingDataContext";
import useFetch from "../useFetch";

export default function Profile() {
  const { baseUrl } = useClothingDataContext();
  const { data, loading, error } = useFetch(`${baseUrl}/profile`);

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container py-3">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center">Error while fetching Data.</p>}
          {!data?.length && <p className="text-center">No Data Found.</p>}

          {data?.map((user) => (
            <div
              className="row justify-content-center align-items-center mb-5"
              key={user?._id}
            >
              <div className="col-12 col-md-3 d-flex justify-content-center mb-3 mb-md-0">
                <img
                  style={{
                    height: "150px",
                    width: "150px",
                    objectFit: "cover",
                  }}
                  className="rounded-circle img-fluid"
                  src={user.profilePictureUrl}
                  alt="profile picture"
                />
              </div>

              <div className="col-12 col-md-9 d-flex flex-column">
                <div>
                  <h5>
                    Username:{" "}
                    <span className="fw-normal text-secondary fs-6">
                      {user.name}
                    </span>
                  </h5>
                  <h5>
                    Email:{" "}
                    <span className="fw-normal text-secondary fs-6">
                      {user.email}
                    </span>
                  </h5>
                  <h5>
                    Phone:{" "}
                    <span className="fw-normal text-secondary fs-6">
                      {user.phone}
                    </span>
                  </h5>
                  <h5>
                    Address:{" "}
                    <span className="fw-normal text-secondary fs-6">
                      {user?.address[0]?.addressLine} -{" "}
                      {user?.address[0]?.zipCode}
                    </span>
                  </h5>
                </div>
                <div className="py-3">
                  <AddNewAddressBtn />
                </div>
              </div>
            </div>
          ))}

          <div className="my-5">
            <h6>Orders History:</h6>
            <div className="py-3">
              <OrderList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

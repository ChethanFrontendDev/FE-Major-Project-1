import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../useFetch";
import useClothingDataContext from "../contexts/ClothingDataContext";

export default function Home() {
  const { setSelectedFeaturedCategory } = useClothingDataContext();

  const { data, loading, error } = useFetch(
    "https://major-project-1-ashy.vercel.app/featuredCategories"
  );

  const featuredImagesList = [
    {
      id: 1,
      name: "hanger",
      imageUrl:
        "https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "white shirt",
      imageUrl:
        "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "hanger with bloom",
      imageUrl:
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "shirt on wall",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <>
      <Header />
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            {loading && <p className="text-center">Loading...</p>}
            {error && (
              <p className="text-center">Error Occured While Fetching Data.</p>
            )}
            {data?.map((category) => (
              <div key={category._id} className="col-md-3">
                <NavLink
                  onClick={() => setSelectedFeaturedCategory(category?.name)}
                  className="nav-link"
                  to={`/products/${category.name}`}
                >
                  <div
                    className="card mb-3"
                    style={{ width: "15rem", height: "19rem" }}
                  >
                    <img
                      style={{ height: "16rem", objectFit: "cover" }}
                      className="card-img-top img-fluid"
                      src={category.imgUrl}
                      alt={`${category.name} image`}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{category.name}</h5>
                    </div>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <h3 className="py-2">Featured</h3>
            <div
              id="carouselExampleAutoplaying"
              className="carousel slide"
              data-bs-ride="carousel"
              data-bs-interval="2000"
            >
              <div className="carousel-inner" style={{ height: "30rem" }}>
                {featuredImagesList.map((feature) => (
                  <div key={feature.id} className="carousel-item active">
                    <img
                      src={feature.imageUrl}
                      className="d-block img-fluid w-100"
                      style={{ height: "30rem", objectFit: "cover" }}
                      alt={`${feature.name} image`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          <div className="py-4 row justify-content-between mx-0">
            <div className="col-md-5 bg-secondary p-4 mb-3">
              <div className="row">
                <img
                  className="col-md-4"
                  src="https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div className="col-md-8 d-flex flex-column justify-content-between p-3">
                  <h6>New Arrivals</h6>
                  <p>
                    <strong>Summer Collection</strong> <br />
                    <small>
                      Check out our best summer collection to stay cool in style
                      this season
                    </small>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-5  bg-secondary p-4 mb-3">
              <div className="row">
                <img
                  className="col-md-4"
                  src="https://plus.unsplash.com/premium_photo-1705554519869-fdcebc4ba94b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div className="col-md-8 d-flex flex-column justify-content-between p-3">
                  <h6>New Arrivals</h6>
                  <p>
                    <strong>Summer Collection</strong> <br />
                    <small>
                      Check out our best summer collection to stay cool in style
                      this season
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

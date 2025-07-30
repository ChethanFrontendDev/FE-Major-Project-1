import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import WishList from "./pages/WishList";
import Checkout from "./pages/Checkout";
import AddressForm from "./components/AddressForm";
import OrderPlaced from "./components/OrderPlaced";
import Profile from "./pages/Profile";
import { ClothingDataContextProvider } from "./contexts/ClothingDataContext";

export default function App() {
  return (
    <ClothingDataContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:categoryName" element={<ProductListing />} />
          <Route
            path="/products/:categoryName/:productName/details/:productId"
            element={<ProductDetails />}
          />
          <Route path="/products/cart" element={<Cart />} />
          <Route path="/products/wishlist" element={<WishList />} />
          <Route path="/products/cart/checkout" element={<Checkout />} />
          <Route
            path="/products/cart/checkout/adress-form"
            element={<AddressForm />}
          />
          <Route
            path="/products/cart/checkout/order-placed"
            element={<OrderPlaced />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </ClothingDataContextProvider>
  );
}

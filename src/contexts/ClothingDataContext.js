import { Children, createContext, useContext, useState } from "react";
import useFetch from "../useFetch";

const ClothingDataContext = createContext();

function useClothingDataContext() {
  return useContext(ClothingDataContext);
}
export default useClothingDataContext;

export function ClothingDataContextProvider({ children }) {
  const baseUrl = "https://major-project-1-ashy.vercel.app";

  const { data, setData, loading, error, refetch } = useFetch(
    `${baseUrl}/featuredCategories/products/`
  );

  const deliveryCharges = 499;
  const [inputValue, setInputValue] = useState("");
  const [formStatus, setFormStatus] = useState(null);
  const [editFormById, setEditFormById] = useState(null);
  const [addedToCheckout, setAddedToCheckout] = useState();
  const [selectedFeaturedCategory, setSelectedFeaturedCategory] =
    useState(null);

  const handleDecrement = (productId) => {
    if (productId) {
      setData((prevValue) =>
        prevValue.map((product) =>
          product._id === productId
            ? {
                ...product,
                quantity: product.quantity > 1 ? product.quantity - 1 : 1,
              }
            : product
        )
      );
    }
  };

  const handleIncrement = (productId) => {
    if (productId) {
      setData((prevValue) =>
        prevValue.map((product) =>
          product._id === productId
            ? {
                ...product,
                quantity: product.quantity + 1,
              }
            : product
        )
      );
    }
  };

  return (
    <ClothingDataContext.Provider
      value={{
        inputValue,
        setInputValue,
        handleDecrement,
        handleIncrement,
        deliveryCharges,
        formStatus,
        setFormStatus,
        setEditFormById,
        editFormById,
        addedToCheckout,
        setAddedToCheckout,
        baseUrl,
        productList: data,
        setProductList: setData,
        loading,
        error,
        refetch,
        selectedFeaturedCategory,
        setSelectedFeaturedCategory,
      }}
    >
      {children}
    </ClothingDataContext.Provider>
  );
}

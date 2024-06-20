import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [data, setData] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Load products from local storage if available
        const storedProducts = localStorage.getItem("productData");
        if (storedProducts) {
          setData({ products: JSON.parse(storedProducts) });
        } else {
          // Fetch from API if not available in local storage
          const response = await axios.get("https://dummyjson.com/products");
          setData({ products: response.data.products });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save products to local storage whenever data changes
  useEffect(() => {
    if (data.products.length > 0) {
      localStorage.setItem("productData", JSON.stringify(data.products));
    }
  }, [data]);

  const deleteProduct = (productId) => {
    setData((prevData) => {
      const updatedProducts = prevData.products.filter((item) => item.id !== productId);
      localStorage.setItem("productData", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  };

  const addProduct = (newProduct) => {
    setData((prevData) => {
      const updatedProducts = [...prevData.products, newProduct];
      localStorage.setItem("productData", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  };
  const updateProduct = (productId, updatedProduct) => {
    setData((prevData) => {
      const updatedProducts = prevData.products.map((product) =>
        product.id === parseInt(productId) ? { ...product, ...updatedProduct } : product
      );
      localStorage.setItem("productData", JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getButtonStyle = (item) => {
    if (item.stock > 0 && item.stock < 100) {
      return {
        backgroundColor: "#EBF9F1",
        borderColor: "#EBF9F1",
        borderRadius: "20px",
        color: "#1F9254",
        transition: "background-color 0.3s ease",
      };
    } else if (item.stock >= 100) {
      

      return {
        backgroundColor: "#FEF2E5",
        borderColor: "#FEF2E5",
        color: "orange",
        borderRadius: "20px",
        transition: "background-color 0.3s ease",
      };
    } else  {  
      return {
        backgroundColor: " #FBE7E8",
        borderColor: " #FBE7E8",
        color: "red",
        borderRadius: "20px",
        transition: "background-color 0.3s ease",
      };
    }
  };

  const truncateDescription = (description, maxLength = 26) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + "..";
  };

  return (
    <ProductContext.Provider
      value={{
        data: data.products,
        loading,
        error,
        capitalizeFirstLetter,
        getButtonStyle,
        truncateDescription,
        deleteProduct,
        addProduct,
        updateProduct
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

import React, { useContext, useState, useEffect } from "react";
import { useParams,  useNavigate } from "react-router-dom";
import { ProductContext } from "../store/ProductContext";
import Swal from "sweetalert2";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, updateProduct } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    brand: "",
    rating: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    const selectedProduct = data.find((item) => item.id === parseInt(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
      setFormValues({
        title: selectedProduct.title,
        description: selectedProduct.description,
        brand: selectedProduct.brand,
        rating: selectedProduct.rating,
        category: selectedProduct.category,
        stock: selectedProduct.stock
      });
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(id, formValues);
    Swal.fire({
      title: "Updated!",
      text: "Your product has been updated.",
      icon: "success"
    }).then(() => {
      navigate(`/product/${id}`);
    });
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formValues.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            value={formValues.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            className="form-control"
            value={formValues.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            name="rating"
            className="form-control"
            value={formValues.rating}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            className="form-control"
            value={formValues.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            className="form-control"
            value={formValues.stock}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

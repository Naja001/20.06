import React, { useContext } from "react";
import { ProductContext } from "../store/ProductContext";
import { editBtn, deleteBtn } from "./svg";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

export default function ProductList() {
  const {
    data,
    loading,
    error,
    capitalizeFirstLetter,
    truncateDescription,
    getButtonStyle,
    deleteProduct
  } = useContext(ProductContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  function handleDelete(productId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId);
        Swal.fire({
          title: "Deleted!",
          text: "Your product has been deleted.",
          icon: "success"
        });
      }
    });
  }

  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr className="tableHeader">
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "#F7F6FE" : ""}>
                <td>#{item.id}</td>
                <td><Link to={`product/${item.id}`}>{item.title}</Link></td>
                <td>{truncateDescription(item.description)}</td>
                <td>{item.brand}</td>
                <td>${item.rating}</td>
                <td>{capitalizeFirstLetter(item.category)}</td>
                <td>
                  {item.stock > 0 && item.stock < 100 ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      style={getButtonStyle(item)}
                    >
                      Available
                    </button>
                  ) : item.stock >= 100 ? (
                    <button
                      type="button"
                      className="btn btn-success"
                      style={getButtonStyle(item)}
                    >On Sale</button>
                  ) : (
                    <button
                    type="button"
                    className="btn btn-success"
                    style={getButtonStyle(item)}
                  >Not available</button>
                  )}
                </td>
                <td>
                  <div className="d-flex justify-content-around">
                    <Link to={`/edit/${item.id}`}>{editBtn}</Link>
                    <div onClick={() => handleDelete(item.id)}>{deleteBtn}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

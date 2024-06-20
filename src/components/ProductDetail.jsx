import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../store/ProductContext";


export default function ProductDetails() {
  const { data } = useContext(ProductContext);
  const { id } = useParams();

  const selectedProduct = data.find((item) => item.id === parseInt(id));
  if (!selectedProduct) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-6">
          <h1>{selectedProduct.title}</h1>
          <img
            src={selectedProduct.thumbnail}
            alt={selectedProduct.title}
            className="img-fluid rounded thumbnail"
          />
        </div>
        <div className="col-lg-6">
          <div className="details">
            <p>
              <strong>Description:</strong> {selectedProduct.description}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {selectedProduct.category.charAt(0).toUpperCase() +
                selectedProduct.category.slice(1)}
            </p>
            <p>
              <strong>Price:</strong>{" "}
              ${selectedProduct.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>
              <strong>Discount Percentage:</strong>{" "}
              {selectedProduct.discountPercentage}%
            </p>
            <p>
              <strong>Rating:</strong> {selectedProduct.rating}
            </p>
            <p>
              <strong>Stock:</strong> {selectedProduct.stock}
            </p>
            <p>
              <strong>Tags:</strong> {selectedProduct.tags.join(", ")}
            </p>
            <p>
              <strong>Brand:</strong> {selectedProduct.brand}
            </p>
            <p>
              <strong>SKU:</strong> {selectedProduct.sku}
            </p>
            <p>
              <strong>Weight:</strong> {selectedProduct.weight}g
            </p>
            <p>
              <strong>Dimensions:</strong>{" "}
              {selectedProduct.dimensions.width} x{" "}
              {selectedProduct.dimensions.height} x{" "}
              {selectedProduct.dimensions.depth} cm
            </p>
            <p>
              <strong>Warranty Information:</strong>{" "}
              {selectedProduct.warrantyInformation}
            </p>
            <p>
              <strong>Shipping Information:</strong>{" "}
              {selectedProduct.shippingInformation}
            </p>
            <p>
              <strong>Availability Status:</strong>{" "}
              {selectedProduct.availabilityStatus}
            </p>
            <p>
              <strong>Return Policy:</strong>{" "}
              {selectedProduct.returnPolicy}
            </p>
            <p>
              <strong>Minimum Order Quantity:</strong>{" "}
              {selectedProduct.minimumOrderQuantity}
            </p>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6">
          <div className="reviews">
            <h3>Reviews:</h3>
            {selectedProduct.reviews.map((review, index) => (
              <div key={index} className="review">
                <p>
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p>
                  <strong>Comment:</strong> {review.comment}
                </p>
                <p>
                  <strong>Reviewer Name:</strong> {review.reviewerName}
                </p>
                <p>
                  <strong>Reviewer Email:</strong> {review.reviewerEmail}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="images">
            <h3>Images:</h3>
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${selectedProduct.title} image ${index + 1}`}
                className="img-fluid rounded image"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-6">
          <p>
            <strong>Barcode:</strong> {selectedProduct.meta.barcode}
          </p>
          <p>
            <strong>QR Code:</strong>{" "}
            <a
              href={selectedProduct.meta.qrCode}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View QR Code
            </a>
          </p>
        </div>
        <div className="col-lg-6">
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(selectedProduct.meta.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(selectedProduct.meta.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}

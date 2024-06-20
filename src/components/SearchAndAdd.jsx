import React, { useState } from "react";
import styles from "../components/SearchAndAdd.module.css";
import AddProductForm from "../components/AddProduct.jsx";

export default function SearchAndAddBtn() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container">
      <div className={styles.row}>
        <input className={styles.input} placeholder="Search" type="text" />
        <button className={styles.btnBdPrimary} onClick={() => setShowForm(!showForm)}>
          + ADD
        </button>
      </div>
      {showForm && <AddProductForm />}
    </div>
  );
}

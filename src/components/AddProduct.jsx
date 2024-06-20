import React, { useState, useContext } from 'react';
import { ProductContext } from '../store/ProductContext';
import styles from './AddProduct.module.css';
import { useNavigate } from 'react-router-dom';

export default function AddProductForm() {
  const { data, addProduct } = useContext(ProductContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');

  const navigate = useNavigate()

  const generateUniqueId = () => {
    const ids = data.map(product => product.id);
    const maxId = ids.length ? Math.max(...ids) : 0;
    return maxId + 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: generateUniqueId(),
      title,
      description,
      brand,
      rating: parseFloat(rating),
      category,
      stock: parseInt(stock),
    };
    
    addProduct(newProduct);
    setTitle('');
    setDescription('');
    setBrand('');
    setRating('');
    setCategory('');
    setStock('');
    navigate('/')
  };

  return (
    <div className='container mt-3'>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Title:</label>
          <input className={styles['form-input']} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Description:</label>
          <input className={styles['form-input']} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Brand:</label>
          <input className={styles['form-input']} value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Rating:</label>
          <input type="number" className={styles['form-input']} value={rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Category:</label>
          <input className={styles['form-input']} value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className={styles['form-group']}>
          <label className={styles['form-label']}>Stock:</label>
          <input type="number" className={styles['form-input']} value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <button type="submit" className={styles['form-button']}>Add Product</button>
      </form>
    </div>
  );
}

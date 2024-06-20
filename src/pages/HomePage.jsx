import React from 'react';
import ProductList from '../components/ProductList';
import { ProductProvider } from '../store/ProductContext';
import SearchAndAddBtn from '../components/SearchAndAdd';

export default function HomePage() {
  return (
    <>
      <ProductProvider>
        <SearchAndAddBtn />
        <ProductList />
      </ProductProvider>
    </>
  );
}

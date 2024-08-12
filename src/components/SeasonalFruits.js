import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './styles/components/SeasonalFruits.css';

const SeasonalFruits = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3001/green_nutrify/products')
      .then(response => {
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Initialize filtered products with all products
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on search query
    const results = products.filter(product =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <section className="seasonal-fruits">
      <h2>Seasonal Fruits</h2>
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="fruits-list">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.product_id}
            product={{
              name: product.product_name,
              description: product.description,
              price: product.price,
              image: `http://localhost:3001/uploads/${product.product_image}`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SeasonalFruits;

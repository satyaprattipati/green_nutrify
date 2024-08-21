import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './styles/components/SeasonalFruits.css';

const SeasonalFruits = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');

  useEffect(() => {
    const fetchProducts = axios.get('http://localhost:3001/green_nutrify/products');
    const fetchSeasons = axios.get('http://localhost:3001/green_nutrify/seasons');

    Promise.all([fetchProducts, fetchSeasons])
      .then(([productsResponse, seasonsResponse]) => {
        setProducts(productsResponse.data.data);
        setFilteredProducts(productsResponse.data.data);
        setSeasons(seasonsResponse.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    let results = products;

    if (searchQuery) {
      results = results.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSeason) {
      results = results.filter(product =>
        product.season_name.toLowerCase() === selectedSeason.toLowerCase()
      );
    }

    setFilteredProducts(results);
  }, [searchQuery, selectedSeason, products]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleAddToCart = (product) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const cartItem = {
      user_id: userId,
      product_id: product.id,
      quantity: 1
    };

    axios.post('http://localhost:3001/green_nutrify/cart', cartItem)
      .then(response => {
        console.log('Product added to cart:', response.data);
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <section className="seasonal-fruits">
      <h2>Seasonal Fruits</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <label>
          Filter by Season:
          <select value={selectedSeason} onChange={handleSeasonChange} className="season-select">
            <option value="">Select a season</option>
            {seasons.map(season => (
              <option key={season.season_name} value={season.season_name}>
                {season.season_name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="fruits-list">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.product_id}
            product={{
              id: product.product_id,
              name: product.product_name,
              description: product.description,
              price: product.price,
              season: product.season_name,
              image: `http://localhost:3001/uploads/${product.product_image}`
            }}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default SeasonalFruits;

import React, { useEffect, useState } from 'react';
import SeasonalFruits from '../components/SeasonalFruits';
import CreateProductPopup from '../components/CreateProductPopup';

const Products = () => {
  const [userId, setUserId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleCreateProduct = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <main>
      <h2>Welcome to Green Nutrify</h2>
      <p>Your source for fresh organic products and seasonal fruits.</p>
      {userId === '1' && (
        <div className="button-container">
          <button onClick={handleCreateProduct} className="create-product-button">
            Create Product
          </button>
        </div>
      )}
      <SeasonalFruits />
      <CreateProductPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </main>
  );
};

export default Products;

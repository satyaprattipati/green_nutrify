import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/components/ProductCard.css';

const ProductCard = ({ product, onAddToCart, onUpdateProduct, onRemoveProduct, onClick }) => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3001/green_nutrify/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      alert('Product deleted successfully');
      onRemoveProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleRemoveProduct = (product) => {
    if (window.confirm('Are you sure you want to remove this product?')) {
      deleteProduct(product.id);
    }
  };

  const handleUpdateProduct = () => {
    navigate(`/update-product/${product.id}`);
  };

  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-season">{product.season}</p>
        {userId === '1' ? (
          <>
            <button onClick={(e) => { e.stopPropagation(); handleUpdateProduct(); }} className="update-product-button">
              Update Product
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleRemoveProduct(product); }} className="remove-product-button">
              Remove Product
            </button>
          </>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); onAddToCart(product); }} className="add-to-cart-button">
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

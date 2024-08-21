import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/styles/components/CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error('User ID not found in localStorage.');
      return;
    }

    if (userId) {
      axios.get('http://localhost:3001/green_nutrify/cart', { params: { userId } })
        .then(response => {
          console.log('Fetched cart items:', response.data);
          setCartItems(response.data.data || []);
          calculateTotalPrice(response.data.data || []);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    }
  }, [userId]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      const price = item.price || 0;
      const quantity = item.quantity || 0;
      return sum + (price * quantity);
    }, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedItems = cartItems.map(item =>
      item.product_id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  const handleRemoveItem = (productId) => {
    const updatedItems = cartItems.filter(item => item.product_id !== productId);
    setCartItems(updatedItems);
    calculateTotalPrice(updatedItems);
    axios.delete('http://localhost:3001/green_nutrify/cart', { data: { user_id: userId, product_id: productId } })
      .then(response => {
        console.log('Item removed:', response.data);
      })
      .catch(error => {
        console.error('Error removing item:', error);
      });
  };

  const handleUpdateCart = () => {
    const updates = cartItems.map(item => ({
      user_id: userId,
      product_id: item.product_id,
      quantity: item.quantity
    }));

    axios.put('http://localhost:3001/green_nutrify/cart/batch', { updates })
      .then(response => {
        console.log('Cart updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating cart:', error);
      });
  };

  const handlePurchase = () => {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

    axios.post('http://localhost:3001/green_nutrify/purchases', {
      purchase_date: formattedDate,
      user_id: userId,
      total_amount: totalPrice
    })
      .then(response => {
        console.log('Purchase successful:', response.data);
        setCartItems([]);
        setTotalPrice(0);
        alert('Purchase successful!');
      })
      .catch(error => {
        console.error('Error during purchase:', error);
        alert('Error during purchase. Please try again.');
      });
  };
  

  return (
    <section className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.product_id} className="cart-item">
              <img src={`http://localhost:3001/uploads/${item.product_image}`} alt={item.product_name} />
              <div className="cart-item-details">
                <h3>{item.product_name}</h3>
                <p>Price: ${item.price ? item.price.toFixed(2) : '0.00'}</p>
                <p>
                  Quantity: 
                  <input
                    type="number"
                    min="1"
                    value={item.quantity || 1}
                    onChange={(e) => handleQuantityChange(item.product_id, parseInt(e.target.value, 10))}
                  />
                </p>
                <p>Total: ${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                <button onClick={() => handleRemoveItem(item.product_id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <button className="update-button" onClick={handleUpdateCart}>Update Cart</button>
          <button className="purchase-button" onClick={handlePurchase}>Purchase</button>
        </div>
      )}
    </section>
  );
};

export default CartPage;

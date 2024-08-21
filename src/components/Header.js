import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/components/Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user information from localStorage
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_name');
    localStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <header className="header">
      <h1>Green Nutrify</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/cart">Cart</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

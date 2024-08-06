import React from 'react';
import { Link } from 'react-router-dom';
import './styles/components/Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Green Nutrify</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;

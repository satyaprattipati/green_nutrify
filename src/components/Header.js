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
      </nav>
    </header>
  );
};

export default Header;

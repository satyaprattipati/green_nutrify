import React from 'react';
import ProductCard from './ProductCard';
import './styles/components/SeasonalFruits.css';
import strawberryImage from './styles/components/strawberry.jpg';
import Cherries from './styles/components/cherry.jpg';

const seasonalFruits = [
  {
    name: 'Strawberries',
    description: 'Fresh organic strawberries.',
    price: 5.99,
    image: strawberryImage
  },
  {
    name: 'Cherries',
    description: 'Fresh organic Cherries.',
    price: 4.99,
    image: Cherries
  },
  {
    name: 'Strawberries',
    description: 'Fresh organic strawberries.',
    price: 5.99,
    image: strawberryImage
  },
  {
    name: 'Cherries',
    description: 'Fresh organic Cherries.',
    price: 5.99,
    image: Cherries
  },
  {
    name: 'Strawberries',
    description: 'Fresh organic strawberries.',
    price: 5.99,
    image: strawberryImage
  },
  {
    name: 'Cherries',
    description: 'Fresh organic Cherries.',
    price: 5.99,
    image: Cherries
  },
  {
    name: 'Strawberries',
    description: 'Fresh organic strawberries.',
    price: 5.99,
    image: strawberryImage
  },
  {
    name: 'Cherries',
    description: 'Fresh organic Cherries.',
    price: 5.99,
    image: Cherries
  },
  {
    name: 'Strawberries',
    description: 'Fresh organic strawberries.',
    price: 5.99,
    image: strawberryImage
  },
  {
    name: 'Cherries',
    description: 'Fresh organic Cherries.',
    price: 5.99,
    image: Cherries
  },
];

const SeasonalFruits = () => {
    return (
      <section className="seasonal-fruits">
        <h2>Seasonal Fruits</h2>
        <div className="fruits-list">
          {seasonalFruits.map((fruit, index) => (
            <ProductCard key={index} product={fruit} />
          ))}
        </div>
      </section>
    );
  };
  
  export default SeasonalFruits;
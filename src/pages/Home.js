import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/styles/components/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Green Nutrify</h1>
          <p>Your journey to healthy living starts here.</p>
          <button className="cta-button" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </section>

      <section className="services">
        <h2>Our Services</h2>
        <div className="services-list">
          <div className="service-item">
            <h3>Organic Products</h3>
            <p>We offer a wide range of organic products to keep you healthy.</p>
          </div>
          <div className="service-item">
            <h3>Personalized Nutrition Plans</h3>
            <p>Get customized nutrition plans tailored to your needs.</p>
          </div>
          <div className="service-item">
            <h3>Health Coaching</h3>
            <p>Work with our experts to achieve your health goals.</p>
          </div>
        </div>
      </section>

      <section className="reviews">
        <h2>What Our Customers Say</h2>
        <div className="reviews-list">
          <div className="review-item">
            <p>"Green Nutrify transformed my life. The organic products are top-notch!"</p>
            <h4>- Sarah W.</h4>
          </div>
          <div className="review-item">
            <p>"The personalized nutrition plan was exactly what I needed. Highly recommend!"</p>
            <h4>- James L.</h4>
          </div>
          <div className="review-item">
            <p>"The health coaching sessions were insightful and effective. Thank you!"</p>
            <h4>- Emily R.</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

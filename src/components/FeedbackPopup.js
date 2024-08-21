import React, { useState } from 'react';
import './styles/components/FeedbackPopup.css';
import axios from 'axios';

const FeedbackPopup = ({ isOpen, onClose, productId, onSubmit }) => {
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('You need to be logged in to submit feedback.');
      return;
    }

    const feedbackData = {
      user_id: userId,
      product_id: productId,
      rating: parseInt(rating, 10),
      comments,
    };

    axios.post('http://localhost:3001/green_nutrify/feedback', feedbackData)
      .then(response => {
        alert('Feedback submitted successfully');
        onSubmit(response.data.data);
      })
      .catch(error => {
        console.error('Error submitting feedback:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="feedback-popup-overlay">
      <div className="feedback-popup">
        <h2>Add Review</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Rating:
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </label>
          <label>
            Comments:
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPopup;

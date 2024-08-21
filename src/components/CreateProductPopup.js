import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/components/CreateProductPopup.css';

const CreateProductPopup = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [seasonId, setSeasonId] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      axios.get('http://localhost:3001/green_nutrify/seasons')
        .then(response => {
          setSeasons(response.data.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching seasons:', error);
          setError('Failed to fetch seasons.');
          setLoading(false);
        });
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    setProductImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('product_name', productName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('season_id', seasonId);
    if (productImage) {
      formData.append('product_image', productImage);
    }

    try {
      const response = await axios.post('http://localhost:3001/green_nutrify/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Create New Product</h2>
        {loading && <p>Loading seasons...</p>}
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Product Name:
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
          </label>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            Season:
            <select value={seasonId} onChange={(e) => setSeasonId(e.target.value)} required>
              <option value="">Select a season</option>
              {seasons.map(season => (
                <option key={season.season_id} value={season.season_id}>
                  {season.season_name} {/* Adjust according to your API response */}
                </option>
              ))}
            </select>
          </label>
          <label>
            Product Image:
            <input type="file" onChange={handleFileChange} />
          </label>
          <button type="submit">Create Product</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPopup;

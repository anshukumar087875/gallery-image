import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Your Unsplash API key
const API_KEY ="wCoZerZdjSVKlg_Fl5OPaDzz6BxuH-QO0wR_3-qQpLU";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRandomImages();
  }, []);

  const fetchRandomImages = async (searchQuery = '') => {
    setLoading(true);
    try {
      const url = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=10&query=${searchQuery}`;
      const response = await axios.get(url);
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images: ', error);
    }
    setLoading(false);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchRandomImages(query);
  };

  const saveToFavorites = (image) => {
    setFavorites((prevFavorites) => [...prevFavorites, image]);
  };

  const removeFromFavorites = (imageId) => {
    setFavorites(favorites.filter((img) => img.id !== imageId));
  };

  return (
    <div className="gallery-container">
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Search images"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div className="images">
          {images.map((image) => (
            <div key={image.id} className="image-card">
              <img src={image.urls.small} alt={image.alt_description} />
              <button onClick={() => saveToFavorites(image)}>Save</button>
            </div>
          ))}
        </div>
      )}

      <div className="favorites">
        <h2>Saved Images</h2>
        <div className="favorites-list">
          {favorites.length === 0 ? (
            <p>No saved images yet.</p>
          ) : (
            favorites.map((image) => (
              <div key={image.id} className="image-card">
                <img src={image.urls.small} alt={image.alt_description} />
                <button onClick={() => removeFromFavorites(image.id)}>
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

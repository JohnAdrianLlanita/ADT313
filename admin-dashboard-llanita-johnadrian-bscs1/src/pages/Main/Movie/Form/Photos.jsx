import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Photos = ({ movieId }) => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState('');

  useEffect(() => {
    axios
      .get(`/movies/${movieId}/photos`)
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error('Error fetching photos:', error));
  }, [movieId]);

  const addPhoto = () => {
    if (!newPhoto) return alert('Photo URL is required');
    axios
      .post(`/movies/${movieId}/photos`, { url: newPhoto })
      .then((response) => setPhotos([...photos, response.data]))
      .catch((error) => console.error('Error adding photo:', error));
    setNewPhoto('');
  };

  const deletePhoto = (id) => {
    axios
      .delete(`/movies/${movieId}/photos/${id}`)
      .then(() => setPhotos(photos.filter((photo) => photo.id !== id)))
      .catch((error) => console.error('Error deleting photo:', error));
  };

  return (
    <div>
      <h2>Photos</h2>
      <input
        type="text"
        placeholder="Photo URL"
        value={newPhoto}
        onChange={(e) => setNewPhoto(e.target.value)}
      />
      <button onClick={addPhoto}>Add</button>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.url} alt="Movie" width={100} />
            <button onClick={() => deletePhoto(photo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;

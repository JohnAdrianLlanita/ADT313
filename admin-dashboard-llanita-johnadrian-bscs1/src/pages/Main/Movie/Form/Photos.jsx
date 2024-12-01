import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Photos = ({ movieId }) => {
  const [photos, setPhotos] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get(`/movies/${movieId}/photos`)
      .then((response) => setPhotos(response.data))
      .catch((error) => console.error('Error fetching photos:', error));
  }, [movieId]);

  const uploadPhoto = () => {
    if (!selectedFile) return alert('Please select a file to upload');
    
    // Create FormData object to hold the file
    const formData = new FormData();
    formData.append('photo', selectedFile);

    axios
      .post(`/movies/${movieId}/photos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setPhotos([...photos, response.data]);
        setSelectedFile(null); // Clear the selected file after successful upload
      })
      .catch((error) => console.error('Error uploading photo:', error));
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
        type="file"
        accept="image/*"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button onClick={uploadPhoto}>Upload</button>
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

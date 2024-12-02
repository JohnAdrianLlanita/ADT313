import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from 'react-router-dom';

const Photos = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { photos, setSelectedPhoto, handleAddPhoto, selectedMovie } = useOutletContext();

  return (
    <div>
      <h2>Photos</h2>
      <div className="photosMainCont">
        {photos && photos.length > 0 ? (
          photos.map((photo) => (
            <div className="photosCont" key={photo.file_path}>
              <p>{photo.file_path ? 'Photo' : 'No photo available'}</p>
              <div className="photolist">
                <div className="photo-preview">
                  <img
                    width="280"
                    height="158"
                    src={`https://image.tmdb.org/t/p/w500${photo.file_path}`}  // Using the file path to display the image
                    alt={photo.file_path}
                  />
                </div>
                <button
                  onClick={() => {
                    setSelectedPhoto(photo);
                    alert("Successfully selected a photo!");
                  }}
                >
                  Select Photo
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No photos found</p>
        )}
      </div>
    </div>
  );
};

export default Photos;

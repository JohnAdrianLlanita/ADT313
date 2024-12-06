import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Photos from "../../../../pages/Main/Movie/Form/Photos";
import "./View.css";

function View({ setSelectedMovie }) {
  const [movie, setMovie] = useState(null); 
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    if (movieId) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          const movieData = response.data;

          
          const transformedMovie = {
            ...movieData,
            videos: movieData.videos || [],
            photos: movieData.photos || [],
            casts: movieData.casts || [],
          };

          setMovie(transformedMovie);
          setSelectedMovie?.(transformedMovie); 
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          navigate("/"); 
        });
    }
  }, [movieId, navigate, setSelectedMovie]);

  return (

<div
        className="movie-page-container"
        style={{
          backgroundColor: 'transparent',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${movie?.posterPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
      {movie ? (
        <>
          <div className="banner">
            <img src={movie.posterPath} alt={movie.title} className="movie-poster" />
            <div className="banner-info">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>
          

          {movie.casts && movie.casts.length > 0 && (
            <div className="cast-crew">
            <h2>Cast & Crew</h2>
            <div className="cast-list">
              {movie.casts.map((cast, index) => (
                <div key={index} className="cast-member">
                  <img
                    src={cast.url}
                    alt={`Photo of ${cast.name}`}
                    className="cast-photo"
                  />
                  <span>
                    <strong>{cast.name}</strong>
                  </span>
                  <span>as {cast.characterName}</span>
                </div>
              ))}
            </div>
          </div>
          
          
          )}

{movie.videos && movie.videos.length > 0 && (
  <div className="movie-videos">
    <h2>Trailers</h2>
    {movie.videos.map((video, index) => (
      <iframe
        key={index}
        src={`https://www.youtube.com/embed/${video.videoKey}`}
        title={video.name}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ))}
  </div>
)}

{movie.photos && movie.photos.length > 0 && (
  <div className="movie-photos">
    <h2>Photos</h2>
    <div className="photo-gallery">
      {movie.photos.map((photo, index) => (
        <img
          key={index}
          src={photo.url}
          alt={`Movie Photo ${index + 1}`}
          className="photo-item"
        />
      ))}
    </div>
  </div>
)}

        </>
      ) : (
        <p>Loading movie details...</p>
      )}
       
    </div>
  );
}

export default View;

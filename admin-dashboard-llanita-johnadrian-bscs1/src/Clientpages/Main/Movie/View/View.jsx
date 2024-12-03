import React, { useEffect, useState } from "react"; // Add useState to the import
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Photos from "../../../../pages/Main/Movie/Form/Photos";
import "./View.css";

function View({ setSelectedMovie }) {
  const [movie, setMovie] = useState(null); // Local state for movie
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    if (movieId) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          const movieData = response.data;

          // Transform movie data if necessary to match earlier structure
          const transformedMovie = {
            ...movieData,
            videos: movieData.videos || [],
            photos: movieData.photos || [],
            casts: movieData.casts || [],
          };

          setMovie(transformedMovie);
          setSelectedMovie?.(transformedMovie); // Update selectedMovie if needed in the parent
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
          navigate("/"); // Redirect to homepage if fetching fails
        });
    }
  }, [movieId, navigate, setSelectedMovie]);

  return (

<div
        className="movie-page-container"
        style={{
          backgroundColor: 'transparent', // Ensures transparency for the background color
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
              <ul>
                {movie.casts.map((cast, index) => (
                  <li key={index} className="cast-member">
                    <strong>{cast.name}</strong> as {cast.characterName}

                    <img
                    src={cast.url}
                    alt={`Movie Photo ${index + 1}`}
                    className="photo-item"
                  />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {movie.videos && movie.videos.length > 0 && (
            <div className="video-preview">
              <h2>Trailer</h2>
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${movie.videos[0]?.videoKey}`}
                title={movie.videos[0]?.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
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

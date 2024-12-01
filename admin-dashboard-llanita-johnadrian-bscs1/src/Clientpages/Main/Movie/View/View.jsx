import { useEffect } from 'react';
import { useMovieContext } from '../../../../context/MovieContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './View.css';

function View() {
  const { movie, setMovie } = useMovieContext();
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieId !== undefined) {
      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
        })
        .catch((e) => {
          console.log(e);
          navigate('/');
        });
    }
    return () => {};
  }, [movieId]);

  return (
    <div className="movie-view">
      {movie && (
        <>
          <div className="banner">
            <img src={movie.posterPath} alt={movie.title} className="movie-poster" />
            <div className="banner-info">
              <h1 className="movie-title">{movie.title}</h1>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          </div>

          {JSON.stringify(movie)}

          {movie.casts && movie.casts.length > 0 && (
            <div className="cast-crew">
              <h2>Cast & Crew</h2>
              <ul>
                {movie.casts.map((cast, index) => (
                  <li key={index} className="cast-member">
                    <strong>{cast.name}</strong> as {cast.character}
                  </li>
                ))}
              </ul>
            </div>
          )}

{movie.videos && movie.videos[0] ? (
            <div className="video-preview">
              {/* Assuming the video.key is the unique identifier for a YouTube video */}
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
          ) : null}

          {movie.photos && movie.photos.length > 0 && (
            <div className="movie-photos">
              <h2>photos</h2>
              <div className="photo-gallery">
                {movie.photos.map((photo, index) => (
                  <img key={index} src={photo.url} alt={`Movie Photo ${index + 1}`} className="photo-item" />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default View;

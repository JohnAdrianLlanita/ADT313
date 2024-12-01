import { Outlet, useNavigate } from 'react-router-dom';
import './Movie.css'; // Ensure you add your styling here
import { useEffect, useState } from 'react';
import MovieGenres from '../../../components/MovieCards/MovieGenres';

const Movie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [genres, setGenres] = useState(null);

  console.log(movieData);

  return (
    <>
      <div
        className="movie-page-container"
        style={{
          backgroundColor: 'transparent', // Ensures transparency for the background color
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${movieData?.posterPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <header className="movie-header">
          <div className="poster-container">
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${movieData?.posterPath}`}
              alt={movieData?.title || 'Movie Poster'}
            />
          </div>

          <div className="movie-details">
            <h1 className="movie-title">{movieData?.title}</h1>
            <p className="movie-release-date">{movieData?.releaseDate}</p>
            <div className="movie-genres">

              {movieData && movieData.tmdbId && <MovieGenres movieId={movieData.tmdbId} />}
            </div>
            <div className="movie-rating">
              <span className="genre">Ratings: {movieData?.voteAverage} /10</span>
            </div>
          </div>
        </header>

        <section className="movie-overview">
          <h2>Overview</h2>
          <p className="overview-text">{movieData?.overview}</p>
        </section>

        <Outlet context={{ setMovieData }} />
      </div>
    </>
  );
};

export default Movie;

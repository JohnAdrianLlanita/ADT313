import { Outlet, useNavigate } from 'react-router-dom';
import './Movie.css';  // Ensure you add your styling here
import { useEffect, useState } from 'react';

const Movie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState();

  console.log(movieData)

  return (
    <>
      <div className="movie-page-container">
        <header className="movie-header">
          <div className="poster-container">
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${movieData?.posterPath}`}  // Replace with dynamic movie poster URL
              alt="Movie Poster"
            />
          </div>
          <div className="movie-details">
            <h1 className="movie-title">{movieData?.title}</h1>
            <p className="movie-release-date">{movieData?.releaseDate}</p>
            <div className="movie-genres">
              <span className="genre">Action</span>
              <span className="genre">Drama</span>
              <span className="genre">Thriller</span>
            </div>
            <div className="movie-rating">
            <span className="genre">Ratings: {movieData?.voteAverage}</span>
            </div>
          </div>
        </header>

        <section className="movie-overview">
          <h2>Overview</h2>
          <p className="overview-text">
            {movieData?.overview}
          </p>
        </section>

        <nav className="movie-navigation">
          <ul className="tabs">
            <li className="tab" onClick={() => navigate(`cast-and-crews`)}>Cast & Crew</li>
            <li className="tab" onClick={() => navigate(`/movies/videos`)}>Videos</li>
            <li className="tab" onClick={() => navigate(`/movies/photos`)}>Photos</li>
          </ul>
        </nav>
        <Outlet context={{ setMovieData }} />
      </div>
    </>
  );
};

export default Movie;

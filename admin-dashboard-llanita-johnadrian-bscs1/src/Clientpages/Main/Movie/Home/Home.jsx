import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MovieCards from '../../../../components/MovieCards/MovieCards';
import { useMovieContext } from '../../../../context/MovieContext';

const Home = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(7); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [topMovies, setTopMovies] = useState([]);

  const { movieList, setMovieList, setMovie } = useMovieContext();

  const getMovies = () => {
   
    axios
      .get('/movies')
      .then((response) => {
        setMovieList(response.data);
        const random = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[random]);
      })
      .catch((e) => console.log(e));
  };

  const getTopMovies = () => {

    axios
      .get('/movies')
      .then((response) => {
        const sortedMovies = response.data.sort((a, b) => b.rating - a.rating);
        setTopMovies(sortedMovies.slice(0, 7));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getMovies();
    getTopMovies();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (movieList.length) {
        const random = Math.floor(Math.random() * movieList.length);
        setFeaturedMovie(movieList[random]);
      }
    }, 5000);
  }, [featuredMovie]);

  
  const filteredMovies = movieList
    .filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.title.localeCompare(b.title);
      else return b.title.localeCompare(a.title);
    });

  
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  const handlePageChange = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="main-container">
      <span className="page-title">Movies</span>


      {featuredMovie && movieList.length ? (
        <div className="featured-list-container">
          <div
            className="featured-backdrop"
            style={{
              background: `url(${featuredMovie.backdropPath !==
                  'https://image.tmdb.org/t/p/original/undefined'
                  ? featuredMovie.backdropPath
                  : featuredMovie.posterPath
                }) no-repeat center top`,
            }}
          >
            <span className="featured-movie-title">{featuredMovie.title}</span>
          </div>
        </div>
      ) : (
        <div className="featured-list-container-loader"></div>
      )}
      <div className="search-container-home">
        <label htmlFor="search">Search Movie: </label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
        />
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort by Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
        </button>
      </div>


      <div className="top-movies-container">
        <h2>Top Movies</h2>
        <div className="movie-list">
          {topMovies.map((movie) => (
            <MovieCards
              key={movie.id}
              movie={movie}
              onClick={() => {
                navigate(`/view/${movie.id}`);
                setMovie(movie);
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <div className='moviesign'> 
          <div >
            <h2>Movies</h2>
          </div>


        </div>


        <div className="list-container">

          {currentMovies.map((movie) => (
            <MovieCards
              key={movie.id}
              movie={movie}
              onClick={() => {
                navigate(`/view/${movie.id}`);
                setMovie(movie);
              }}
            />
          ))}
        </div>

      </div>


      <div className="pagination-container">
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;

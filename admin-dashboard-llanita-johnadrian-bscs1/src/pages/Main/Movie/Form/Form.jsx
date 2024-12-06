import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState([]);
  const [description, setDescription] = useState("");
  const [cast, setCast] =useState([]);
  const [crew, setCrew]= useState([]);
  

  let { movieId } = useParams();

  const handleAddCastAndCrew = async (movieId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      
      const castAndCrewData = {
        cast: cast.map((member) => ({
          name: member.name,
          character: member.character,
          profilePath: member.profile_path
            ? `https://image.tmdb.org/t/p/original/${member.profile_path}`
            : null,
        })),
        crew: crew.map((member) => ({
          name: member.name,
          job: member.job,
          profilePath: member.profile_path
            ? `https://image.tmdb.org/t/p/original/${member.profile_path}`
            : null,
        })),
      };
  
      
      await axios.post(`/movies/${movieId}/cast-and-crew`, castAndCrewData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log("Cast and Crew added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding Cast and Crew:", error);
      return false;
    }
  };
  

  const handleAddVideo = async (movieId2) => {
    const accessToken = localStorage.getItem("accessToken");
    const videoData = {
      movieId: movieId ? movieId : movieId2,
      url: selectedVideo?.key
        ? `https://www.youtube.com/embed/${selectedVideo.key}`
        : "https://www.youtube.com/embed/not_available", 
      name: selectedVideo?.name || "No video selected",
      site: selectedVideo?.site || "YouTube",
      videoKey: selectedVideo?.key || "not_available",
      videoType: selectedVideo?.type || "placeholder",
      official: selectedVideo?.official || false,
    };
  
    try {
      const response = await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/videos/${movieId}` : "/videos",
        data: videoData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Video added successfully:", response.data);
      alert("Video added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding video:", error);
      console.log('raw',selectedVideo);
      alert("Failed to add video. Please try again.");
      return false;
    }
  };
  
  const handleAddPhoto = async (movieId2) => {
    console.log("Adding image for movieId:", movieId2);
  
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    
    const imageData = {
      movieId: movieId ? movieId : movieId2,
      url: selectedPhoto?.file_path ? 
        `https://image.tmdb.org/t/p/w500${selectedPhoto.file_path}` : "",
      description: selectedPhoto?.height ?
        `Height: ${selectedPhoto.height}, Aspect Ratio: ${selectedPhoto.aspect_ratio}` : ""
    };
  
    console.log("Sending image data:", imageData);
  
    try {
      const response = await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/photos/${movieId}` : "/photos",
        data: imageData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });
      console.log("Photos added successfully:", response.data);
      alert("Photos added successfully!");
      return true;
    } catch (error) {
      console.error("Error adding Photos:", error.response?.data || error.message);
      alert("Failed to add Photos. Please try again.");
      return false;
    }
  };

  const fetchCastAndCrew = (tmdbId) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${tmdbId}/credits?language=en-US`,
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c',
          },
        }
      )
      .then((response) => {
        const castAndCrew = response.data;
        const cast = castAndCrew.cast || [];
        const crew = castAndCrew.crew || [];
        setCast(cast);
        setCrew(crew);
        console.log(cast)
      })
      .catch((error) => {
        console.error("Error fetching cast and crew:", error);
        setCast([]);
        setCrew([]);
      });
  };
  

  const fetchVideos = (tmdbId) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${tmdbId}/videos?language=en-US`,
        {
          headers: {
            Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c',
        },
        }
      )
      .then((response) => {
        const videoResults = response.data.results;
        setVideos(videoResults.length > 0 ? videoResults : []);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setVideos([]);
      });
  };
  const fetchPhotos = (tmdbId) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${tmdbId}/images?language=en-US`,
        {
          headers: {
            Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c',
        },
        }
      )
      .then((response) => {
        console.log("Full Image Response:", response.data);
        
        console.log("Backdrops:", response.data.backdrops);
        
        if (response.data.backdrops && response.data.backdrops.length > 0) {
          console.log("First Backdrop Details:", response.data.backdrops[0]);
        }
  
        const imageResults = response.data.backdrops;
        setPhotos(imageResults.length > 0 ? imageResults : "");
        console.log("Images set to state:", imageResults);
      })
      .catch((error) => {
        console.error("Error fetching Images:", error);
        setPhotos("");
      });
  };

  
  
  const handleSearch = useCallback(
    (page = 1) => {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        headers: {
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c',
        },
      })
        .then((response) => {
          setSearchedMovieList(response.data.results);
          setTotalPages(response.data.total_pages);
          setCurrentPage(page);
          console.log(response.data.results);
        })
        .catch((error) => {
          console.error('Error fetching movie data:', error);
        });
    },
    [query]
  );
  

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    
    Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c",
          },
        }
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/images`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c",
          },
        }
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c",
          },
        }
      )
      .then((response) => {
        console.log("CastandCrew:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching cast and crew:", error);
      })

      
    ])
    .then(([videoResponse, imageResponse, castAndCrewResponse]) => {
      const castResults = castAndCrewResponse.data.cast || [];
    const crewResults = castAndCrewResponse.data.crew || [];
    setCast(castResults.length > 0 ? castResults : []);
    setCrew(crewResults.length > 0 ? crewResults : []);
    console.log("Cast from TMDB:", castResults);
    console.log("Crew from TMDB:", crewResults);

      const videoResults = videoResponse.data.results;
      setVideos(videoResults.length > 0 ? videoResults : "");
      console.log("Videos from TMDB:", videoResults);
  
      const backdrops = imageResponse.data.backdrops || [];
      const imageResults = [...backdrops];
      setPhotos(imageResults.length > 0 ? imageResults : "");
      console.log("Images from TMDB:", imageResults);
    })
    .catch(error => {
      console.error("Error fetching movie data:", error);
    });
  };

  const handleSave = async () => {
    console.log(selectedVideo);
    console.log(movieId);
    if (videos && videos.length > 0 && (!selectedVideo || !selectedVideo.key)) {
      alert("Videos are available. Please select a video before proceeding.");
      return false; 
    }
  
    if (!videos || videos.length <= 0) {
      alert("No videos found. Proceeding with empty video data.");
    }
  
    const accessToken = localStorage.getItem("accessToken");
  
    if (!selectedMovie) {
      alert("Please search and select a movie.");
      return;
    }
  
    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.original_title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };
  
    try {
      
      const response = await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : "/movies",
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      const newMovieId = movieId || response.data.id;
      console.log("Movie saved successfully:", response.data);
      alert("Movie saved successfully!");
  
      // Add video
      const isVideoAdded = await handleAddVideo(newMovieId);
      if (!isVideoAdded) {
        alert("Please add or edit a Video.");
        return;
      }
  
      // Add photos
      const isPhotoAdded = await handleAddPhoto(newMovieId);
      if (!isPhotoAdded) {
        alert("Please add Photo.");
        return;
      }
  
      navigate(`/main/movies`);
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("Failed to save the movie. Please try again.");
    }
  };
  
  

  const handleInputChange = (e, field) => {
    setSelectedMovie({
      ...selectedMovie,
      [field]: e.target.value,
    });
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
        
        fetchVideos(tempData.id);
        fetchPhotos(tempData.id);
        fetchCastAndCrew(tempData.id);
  
        const tmdbId = response.data.tmdbId;
  
        return Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}/videos?language=en-US`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c",
              },
            }
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}/images`,
            {
              headers: {
                Accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c",
              },
            }
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}/credits`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDQ1NWJkYzBmNjRkYjY4MzE5MjM3YzE5OTgyYTc4OCIsIm5iZiI6MTczMjk4NDU4MC45OTEwMDAyLCJzdWIiOiI2NzRiM2YwNDZmZDgzYTY2MzA5ZDdmNDEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxfUE-4lnwWhgHYurAj_0q3yL3QN-MnpeszW4m_5A_c",
              },
            }
          )
        ]);
      })
      .then(([videoResponse, imageResponse, creditsResponse]) => {
        // Process videos
        const videoResults = videoResponse.data.results;
        setVideos(videoResults.length > 0 ? videoResults : "");
        console.log("Videos from TMDB:", videoResults);
  
        // Process images
        const backdrops = imageResponse.data.backdrops || [];
        const posters = imageResponse.data.posters || [];
        const imageResults = [...backdrops, ...posters];
        setPhotos(imageResults.length > 0 ? imageResults : "");
        console.log("Image Results:", imageResults);
  
        // Process cast and crew
        const castResults = creditsResponse.data.cast || [];
        const crewResults = creditsResponse.data.crew || [];
        setCast(castResults.length > 0 ? castResults : []);
        setCrew(crewResults.length > 0 ? crewResults : []);
        console.log("Cast from TMDB:", castResults.length > 0 ? castResults : []);
        console.log("Crew from TMDB:", crewResults);
      })
      .catch((error) => console.log(error));
    }
  }, [movieId]);
  

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage - 1;
        handleSearch(newPage);
        return newPage;
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => {
        const newPage = prevPage + 1;
        handleSearch(newPage);
        return newPage;
      });
    }
  };
  

  return (
    <>
      <div className='center'>
        <h1 className='create'>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>

        {movieId === undefined && (
          <>
            <div className='search-container'>
  Search Movie:{' '}
  <input
    type='text'
    onChange={(event) => setQuery(event.target.value)}
  />
  <button type='button' onClick={() => handleSearch(1)}>
    Search
  </button>
  <div className='searched-movie'>
    {searchedMovieList.map((movie) => (
      <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
        {movie.original_title}
      </p>
    ))}
  </div>
  {/* Pagination */}
  <div className="pagination">
    <button className='prev' onClick={handlePrevPage} disabled={currentPage === 1}>
      Previous
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button className='next'
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
</div>
          </>
        )}
        <div className='center2'>
          <div className='container-pic'>
            <form>
              {selectedMovie ? (
                <img
                  className='poster-image'
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
                />
              ) : (
                ''
              )}
              <div className='field'>
                Title:
                <input className='titletext'
                  type='text'
                  value={selectedMovie ? selectedMovie.original_title : ''}
                  onChange={(e) => handleInputChange(e, 'original_title')}
                />
              </div>
              <div className='field'>
                Overview:
                <textarea className='textoverview'
                  rows={10}
                  value={selectedMovie ? selectedMovie.overview : ''}
                  onChange={(e) => handleInputChange(e, 'overview')}
                />
              </div>
              <div className='field'>
                Popularity:
                <input className='popularity'
                  type='text'
                  value={selectedMovie ? selectedMovie.popularity : ''}
                  onChange={(e) => handleInputChange(e, 'popularity')}
                />
              </div>
              <div className='field'>
                Release Date:
                <input className='date'
                  type='text'
                  value={selectedMovie ? selectedMovie.release_date : ''}
                  onChange={(e) => handleInputChange(e, 'release_date')}
                />
              </div>
              <div className='field'>
                Vote Average:
                <input className='vote'
                  type='text'
                  value={selectedMovie ? selectedMovie.vote_average : ''}
                  onChange={(e) => handleInputChange(e, 'vote_average')}
                />
              </div>
              <button className='savebutton' type='button' onClick={handleSave}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      

      {movieId && (
  <div>
    <hr />
    <nav>
      <ul className="tabs">
        <li
          onClick={() => {
            navigate(`/main/movies/form/${movieId}/cast-and-crews`);
          }}
        >
          Cast & Crews
        </li>
        <li
          onClick={() => {
            navigate(`/main/movies/form/${movieId}/videos`);
          }}
        >
          Videos
        </li>
        <li
          onClick={() => {
            navigate(`/main/movies/form/${movieId}/photos`);
          }}
        >
          Photos
        </li>
      </ul>
    </nav>
    <Outlet context={{ videos, setSelectedVideo, handleAddVideo, selectedMovie, handleAddPhoto, photos, setSelectedPhoto,cast,crew, handleAddCastAndCrew, setCast ,setCrew}} />
  </div>
)}

    </>
  );
};

export default Form;

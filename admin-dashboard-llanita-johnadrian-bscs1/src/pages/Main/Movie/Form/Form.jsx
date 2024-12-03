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

  let { movieId } = useParams();

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
    // Get userId from localStorage or your auth state management
    const userId = localStorage.getItem("userId"); // Add this line
    
    const imageData = {
      movieId: movieId ? movieId : movieId2,
      url: selectedPhoto?.file_path ? 
        `https://image.tmdb.org/t/p/w500${selectedPhoto.file_path}` : "",
      description: selectedPhoto?.height ?
        `Height: ${selectedPhoto.height}, Aspect Ratio: ${selectedPhoto.aspect_ratio}` : "" // Added description field
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

  const fetchVideos = (tmdbId) => {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${tmdbId}/videos?language=en-US`,
        {
          headers: {
            Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
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
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
        },
        }
      )
      .then((response) => {
        // Log the entire response to see the structure
        console.log("Full Image Response:", response.data);
        
        // Log the backdrops specifically
        console.log("Backdrops:", response.data.backdrops);
        
        // Check if backdrops exist and log their content
        if (response.data.backdrops && response.data.backdrops.length > 0) {
          console.log("First Backdrop Details:", response.data.backdrops[0]);
        }
  
        const imageResults = response.data.backdrops;
        setPhotos(imageResults.length > 0 ? imageResults : "");
        console.log("Images set to state:", imageResults);
      })
      .catch((error) => {
        console.error("Error fetching Images:", error);
        setPhotos(""); // Set to "" in case of error
      });
  };

  
  
  const handleSearch = useCallback(
    (page = 1) => { // Default to page 1 if no argument is passed
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        headers: {
          Accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
        },
      })
        .then((response) => {
          setSearchedMovieList(response.data.results);
          setTotalPages(response.data.total_pages);
          setCurrentPage(page); // Update current page
          console.log(response.data.results);
        })
        .catch((error) => {
          console.error('Error fetching movie data:', error);
        });
    },
    [query] // Removed `currentPage` dependency
  );
  

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    
    // Fetch both videos and images
    Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
          },
        }
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/images`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
          },
        }
      )
    ])
    .then(([videoResponse, imageResponse]) => {
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
      console.log("safjadsfdsgfdsfhdsbfj", movieId || "sd");
      console.log("safjadsfdsgfdsfhdsbfj", newMovieId);
      console.log("Movie saved successfully:", response.data);
      alert("Movie saved successfully!");

      const isVideoAdded = await handleAddVideo(newMovieId);
      if (!isVideoAdded) {
        alert("Video could not be added. Please try again.");
        return;
      }
      const isPhotoAdded = await handleAddPhoto(newMovieId);
if (!isPhotoAdded) {
  alert("Photo could not be added. Please try again.");
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
        fetchVideos(tempData.id)
        fetchPhotos(tempData.id);
        
        const tmdbId = response.data.tmdbId;
          
        // Parallel fetching of videos and images
        return Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}/videos?language=en-US`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
              },
            }
          ),
          axios.get(
            `https://api.themoviedb.org/3/movie/${tmdbId}/images`,
            {
              headers: {
                Accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
              },
            }
          )
        ]);
      })
      .then(([videoResponse, imageResponse]) => {
        // Process videos
        const videoResults = videoResponse.data.results;
        setVideos(videoResults.length > 0 ? videoResults : "");
        console.log("Videos from TMDB:", videoResults);

        // Process images
        console.log("Full Image API Response:", imageResponse.data);
        
        const backdrops = imageResponse.data.backdrops || [];
        const posters = imageResponse.data.posters || [];
        
        const imageResults = [...backdrops, ...posters];
        
        console.log("Image Results:", imageResults);
        
        setPhotos(imageResults.length > 0 ? imageResults : "");
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
  <button type='button' onClick={() => handleSearch(1)}> {/* Always starts from page 1 */}
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

            <hr />
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
      {!movieId &&(
        <>
        {/* Show videos section */}
      <div className="videosMainCont">
          {videos && videos.length > 0 ? (
            videos.map((video) => (
              <div className="videosCont" key={video.id}>
                <p>{video.name}</p>
                <div className="videolist">
                  <div className="video-preview">
                    <iframe
                      width="280"
                      height="158"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedVideo(video);
                      alert("Successfully selected a video!");
                    }}
                  >
                    Select Video
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No videos found</p>
          )}
        </div>
        </>
      )}

{!movieId &&(

<div className="imagesMainCont">
  {selectedMovie ? (
    photos && photos.length > 0 ? (
      photos.map((image) => (
        <div className="imagesCont" key={image.file_path}>
          <div className="image-preview">
            <img
              src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
              alt="Movie Scene"
              width="200"
            />
          </div>
          <button
            onClick={() => {
              setSelectedPhoto(image);
              alert("Successfully selected an image!");
            }}
          >
            Select Image
          </button>
        </div>
      ))
    ) : (
      <p>No images found for this movie</p>
    )
  ) : (
    <p>Select a movie to view available images</p>
  )}
</div>
)}

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
    <Outlet context={{ videos, setSelectedVideo, handleAddVideo, selectedMovie, handleAddPhoto, photos, setSelectedPhoto }} />
  </div>
)}

    </>
  );
};

export default Form;

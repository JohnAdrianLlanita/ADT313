import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieGenres = ({ movieId }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bearerToken = "your_bearer_token";

  console.log(movieId);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

    axios({
      method: "get",
      url: url,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
      },
    })
      .then((response) => {
        setGenres(response.data.genres);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data from TMDb API");
        setLoading(false);
      });
  }, [movieId, bearerToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return "";
  }

  return (
    <>
        {genres.map((genre) => (
            <span className="genre" key={genre.id}>{genre.name}</span>
        ))}
    </>
      
  );
};

export default MovieGenres;
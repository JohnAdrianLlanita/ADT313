import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const CastAndCrew = () => {
  const { movieId } = useParams(); // Get the movie ID from the URL
  const [castAndCrew, setCastAndCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch cast and crew data
    const fetchCastAndCrew = () => {
      axios.get('/credits')
        .then((response) => {
          setCastAndCrew(response.data);
        })
        .catch((error) => {
          console.error('Error fetching cast and crew:', error);
        });
    };
  
    fetchCastAndCrew(); // Call the function to fetch data
  
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Show an error message if the fetch fails
  }

  return (
    <div>
      <h1>Cast and Crew for Movie ID: {movieId}</h1>
      <h2>Cast</h2>
      <ul>
        {castAndCrew.cast?.map((castMember) => (
          <li key={castMember.id}>
            <strong>{castMember.name}</strong> as {castMember.character}
          </li>
        ))}
      </ul>
      <h2>Crew</h2>
      <ul>
        {castAndCrew.crew?.map((crewMember) => (
          <li key={crewMember.id}>
            <strong>{crewMember.name}</strong> - {crewMember.job}
          </li>
        ))}
      </ul>
    </div>
  );
};

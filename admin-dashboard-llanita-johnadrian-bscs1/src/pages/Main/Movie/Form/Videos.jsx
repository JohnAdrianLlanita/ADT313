import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Videos = ({ movieId }) => {
  const [videos, setVideos] = useState([]);
  const [newVideo, setNewVideo] = useState('');

  useEffect(() => {
    axios
      .get(`/movies/${movieId}/videos`)
      .then((response) => setVideos(response.data))
      .catch((error) => console.error('Error fetching videos:', error));
  }, [movieId]);

  const addVideo = () => {
    if (!newVideo) return alert('Video URL is required');
    axios
      .post(`/movies/${movieId}/videos`, { url: newVideo })
      .then((response) => setVideos([...videos, response.data]))
      .catch((error) => console.error('Error adding video:', error));
    setNewVideo('');
  };

  const deleteVideo = (id) => {
    axios
      .delete(`/movies/${movieId}/videos/${id}`)
      .then(() => setVideos(videos.filter((video) => video.id !== id)))
      .catch((error) => console.error('Error deleting video:', error));
  };

  return (
    <div>
      <h2>Videos</h2>
      <input
        type="text"
        placeholder="Video URL"
        value={newVideo}
        onChange={(e) => setNewVideo(e.target.value)}
      />
      <button onClick={addVideo}>Add</button>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              {video.url}
            </a>
            <button onClick={() => deleteVideo(video.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Videos;

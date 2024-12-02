import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from 'react-router-dom';

const Videos = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { videos, setSelectedVideo, handleAddVideo,selectedMovie } = useOutletContext();


  return (
    <div>
      <h2>Videos</h2>
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
    </div>
  );
};

export default Videos;

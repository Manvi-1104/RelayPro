import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Services.css';

function Services() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch YouTube video data from backend
    axios.get('http://localhost:3001/youtube-data')
      .then(response => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="services-container">
      <h2 className="section-title">Speech Assisting Videos</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="videos-container">
          {videos.map((video, index) => (
            <div className="video" key={index}>
              <h3 className="video-title">{video.title}</h3>
              <p className="video-description">Description: {video.description}</p>
              <a className="video-link" href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer">Watch Video</a>
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
              <hr className="video-divider" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;

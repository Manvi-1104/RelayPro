import React from 'react';
import '../App.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import '@fortawesome/fontawesome-free/css/all.css';
function HeroSection() {
  return (
    <div>

{/* <video src='public/videos/video-1.mp4' autoPlay loop muted /> */}
    <div className='hero-container'>
      {/* <video src='public/videos/video-1.mp4' autoPlay loop muted /> */}
      {/* img */}
      <h1>RelayPro</h1>
      <p>Speak Like a Pro

      </p>
       {/* <div className='hero-btns'>
        
        <Link to='/pages/Login'>
          <Button
            
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
          
          LOGIN <i className='far fa-play-circle' />
          
          
          </Button>
        </Link>
      </div>  */}
    </div>    </div>
  );
}

export default HeroSection;
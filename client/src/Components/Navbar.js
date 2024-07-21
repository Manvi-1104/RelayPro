import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import { Button } from './Button';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const closeMobileMenu=()=> setClick(false);
  const [button, setButton]=useState(true);
  const showButton = () =>{
    if(window.innerWidth<=960){
        setButton(false)
    }else{
        setButton(true)
    }
  };

  useEffect(()=>{
    showButton()
  },[]);
  window.addEventListener('resize',showButton);
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            RelayPro
          </Link>
          <div className='menu-icon' onClick={() => setClick(!click)}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
           
            <li className='nav-item'>
              <Link
                to='/services'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Lessons
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/createPosts'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Posts
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/posts'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Community
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/chat'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                ProBot
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/classify'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Analysis Engine
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} 
        </div>
      </nav>
    </>
  );
}

export default Navbar;

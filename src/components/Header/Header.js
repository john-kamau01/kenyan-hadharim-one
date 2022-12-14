import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import './Header.css';

import Logo from '../../assets/images/transparent-logo.png';
import { toast, ToastContainer } from 'react-toastify';
import { UserAuth } from '../../context/AuthContext';

const Header = () => {
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  const { user, userData, logout } = UserAuth();

  const handleToggle = () => {
    setShow(!show);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className='navbar__container'>
      <ToastContainer />
      <nav className="navbar navbar-light navbar-expand-lg bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="" className='img-fluid' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setShow(!show)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse  ${show ? "show" : ""}`} id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <NavLink to='/' className="nav-link" onClick={handleToggle}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/about' className="nav-link" onClick={handleToggle}>About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/plans' className="nav-link" onClick={handleToggle}>Plans</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/articles' className="nav-link" onClick={handleToggle}>Articles</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/contact' className="nav-link" onClick={handleToggle}>Contact</NavLink>
              </li>
              {!user ? (
                <>
                  <li className="nav-item">
                    <NavLink to='/login' className="nav-link" onClick={handleToggle}>Login / Register</NavLink>
                  </li>
                </>
              ) : (
                <>
                {user && userData && userData?.role === "admin" && (
                  <li className="nav-item">
                    <NavLink to='/admin' className="nav-link" onClick={handleToggle}>Admin</NavLink>
                  </li>
                )}
                  <li className="nav-item">
                    <NavLink to='/profile' className="nav-link" onClick={handleToggle}>Profile</NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <span className="dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={userData?.profile_image} alt="avatar" style={{ width: "30px", height:"30px",borderRadius:"50%", objectFit:"cover" }} />
                    </span>
                    <ul className="dropdown-menu">
                      <li><span className='nav-link logout-link dropdown-item' onClick={handleLogout}>Logout</span></li>
                    </ul>
                  </li>
                </>
              )}
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
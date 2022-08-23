import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

const ProfileSidebar = () => {
  const {userData} = UserAuth();

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" >
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">{`Welcome ${userData?.first_name}`}</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink end to="/profile" className="nav-link link-dark">
            Profile
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/blog" className="nav-link link-dark">
            My Blogs
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/profile/subscriptions" className="nav-link link-dark">
            Subscriptions
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default ProfileSidebar;
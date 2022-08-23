import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const ProfileSidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" >
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Admin</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink end to="/admin" className="nav-link link-dark">
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/users" className="nav-link link-dark">
            Users
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/blogs" className="nav-link link-dark">
            Blogs
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default ProfileSidebar;
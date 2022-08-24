import React from 'react';
import { Link } from 'react-router-dom';
import AddArticle from '../../../components/AddArticle';
import CheckUserRole from '../../../components/CheckUserRole';
import { UserAuth } from '../../../context/AuthContext';
import ProfileSidebar from '../ProfileSidebar';

const AddBlog = () => {
  const {userData} = UserAuth();

  if(userData?.subscription_level === "Free"){
    return <CheckUserRole />
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <ProfileSidebar />
        </div>

        <div className='col-md-9 py-5'>
          <div className='row'>
            <div className='col-md-12 col-xs-12 d-inline-flex justify-content-between align-items-center'>
              <h1>Add Blog</h1>
              <Link to="/blog" className='btn btn-success btn-sm'>My Blogs</Link>
            </div>
          </div>
          <AddArticle />
        </div>
      </div>
    </div>
  )
}

export default AddBlog;
import React from 'react';
import AddArticle from '../../../components/AddArticle';
import CheckUserRole from '../../../components/CheckUserRole';
import { UserAuth } from '../../../context/AuthContext';

const AddBlog = () => {
  const {userData} = UserAuth();

  if(userData?.subscription_level === "Free"){
    return <CheckUserRole />
  }

  return (
    <div className='container'>
      <AddArticle />
    </div>
  )
}

export default AddBlog;
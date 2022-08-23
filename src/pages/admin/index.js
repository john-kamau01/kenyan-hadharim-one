import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import VerifyAccount from '../../components/VerifyAccount';
import CheckUserRole from '../../components/CheckUserRole';
import Sidebar from './Sidebar';

const Admin = () => {
  let navigate = useNavigate();
  const { user, userData } = UserAuth();
  
  if(user.emailVerified === false){
    return <VerifyAccount user={user} />
  };

  if( userData?.role !== 'admin' ){
    return <CheckUserRole />
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <Sidebar />
        </div>

        <div className='col-md-9 col-xs-12 py-5'>
          <h1>Welcome to The Admin Page</h1>
          <p>
            This is where we will manage users
          </p>
          <div className='hero__btns'>
            <Link to='/reset-password' className='btn btn-primary px-4'>Reset Password</Link>
            <Link to='/add-business' className='btn btn-success px-4'>Add a Business</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin;
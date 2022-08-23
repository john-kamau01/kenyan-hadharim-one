import React from 'react';
import { UserAuth } from '../context/AuthContext';

const VerifyAccount = ({user}) => {
  const { verifyEmail } = UserAuth();

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 py-5'>
          <h1>Welcome, {user.email}</h1>
          <p>Please verify your account to proceed!</p>
          <button className='btn btn-success' onClick={verifyEmail}>Verify Email</button>
        </div>
      </div>
    </div>
  )
}

export default VerifyAccount;
import React from 'react';

const CheckUserRole = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 py-5'>
          <h1>You are not authorized to access this page. </h1>
          <p>You cannot access this page.</p>
        </div>
      </div>
    </div>
  )
}

export default CheckUserRole;
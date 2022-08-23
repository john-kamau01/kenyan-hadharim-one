import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 py-5 text-center'>
          <h1>Sorry</h1>
          <p>Page not found</p>
          <Link to='/' className='btn btn-danger'>Home</Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
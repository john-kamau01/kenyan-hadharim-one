import React from 'react';
import HomePackages from '../components/HomePackages';

const PlansPage = () => {
  return (
    <div className='container'>
      <div className='row' id="subscriptions">
        <div className='col-12 py-5'>
          <h1 className='text-center fw-normal'>Our Subscription Plans</h1>
          <p className='text-center mb-5 lead text-muted'>
            This is a website that we will use to subsbribe users. This is the main landing page
          </p>
          
          <HomePackages />

        </div>
      </div>
      <h1></h1>
    </div>
  )
}

export default PlansPage;
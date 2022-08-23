import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import HomePackages from '../components/HomePackages';
import { UserAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = UserAuth();
  return (
    <div className='container'>
      <Hero />
      <div className='row' id="subscriptions">
        <div className='col-12 py-5'>
          <h2 className='text-center fw-normal'>Our Subscription Plans</h2>
          <p className='text-center mb-5'>
            This is a website that we will use to subsbribe users. This is the main landing page
          </p>
          
          <HomePackages />

        </div>
      </div>
      <h1></h1>
    </div>
  );
}

export default HomePage;
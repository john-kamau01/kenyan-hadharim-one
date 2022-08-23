import { addMonths, format, formatDistance, addDays, addMinutes } from 'date-fns';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserAuth } from '../context/AuthContext';

const HomePackages = () => {
  const { user, userData, subscriptions, subscribersCollectionRef, userSubscriptions } = UserAuth();
  const navigate = useNavigate();

  const handleSubscription = async (id, period, price) => {
    if(period !== undefined && period === "1 Month"){
      try {
        await addDoc(subscribersCollectionRef, {
          userID: user?.uid,
          name_of_subscriber: userData?.first_name + " " + userData?.last_name,
          subscription_date: format(new Date(), "MM/dd/yyyy"),
          subscription_expiry: format(addMonths(new Date(), 1), "MM/d/yyyy"),
          subscription_period: period,
          subscription_plan: period,
          subscription_price: price,
          subscription_status: "Pending",
        });

        toast.success("Subscription was successfull. Please check your email for further instructions!");
        navigate("/profile")

      } catch (error) {
        console.log(error);
        toast.error("Subscription not successful.");
      }
    }

    if(period !== undefined && period === "3 Months"){
      try {
        await addDoc(subscribersCollectionRef, {
          userID: user?.uid,
          name_of_subscriber: userData?.first_name + " " + userData?.last_name,
          subscription_date: format(new Date(), "MM/dd/yyyy"),
          subscription_expiry: format(addMonths(new Date(), 3), "MM/dd/yyyy"),
          subscription_period: period,
          subscription_plan: period,
          subscription_price: price,
          subscription_status: "Pending",
        });
        toast.success("Subscription was successfull. Please check your email for further instructions!");
        navigate("/profile")
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <div className='container'>
      <ToastContainer />

      <div className='row'>
        <div className='col-md-12'>
          <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
              {subscriptions?.map((subscription) => {
                const { subscription_period, subscription_price, id } = subscription;
                return (
                  <div className="col" key={id}>
                    <div className="card mb-4 rounded-3 shadow-sm">
                      <div className="card-header py-3">
                        <h4 className="my-0 fw-normal">{subscription_period}</h4>
                      </div>
                      <div className="card-body">
                        <h3 className="card-title pricing-card-title">ksh. {subscription_price}<small className="text-muted fw-light">/month</small></h3>
                        {subscription?.subscription_period === "Free" ? (
                          <ul className="list-unstyled mt-3 mb-4">
                            <li>View Blog Posts</li>
                            <li>Search for businesses</li>
                            <li>View Business Listings</li>
                          </ul>
                        ) : (
                          <ul className="list-unstyled mt-3 mb-4">
                            <li>Post and view Blog Posts</li>
                            <li>Ability to vote</li>
                            <li>List, Search, and View Business Listings</li>
                          </ul>
                        )}
                        
                        {user ? (
                          <button 
                            type="button" 
                            className="w-100 btn btn-outline-primary" 
                            onClick={() => handleSubscription(id, subscription_period, subscription_price)} disabled={userData?.subscription_level === subscription?.subscription_period || subscription?.subscription_period === "Free" }
                          >
                            Subscribe{userData?.subscription_level === subscription?.subscription_period && "d"}
                          </button>
                        ) : (
                          <Link to='/login' className='w-100 btn btn-outline-primary'>Login</Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default HomePackages
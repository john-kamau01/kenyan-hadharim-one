import { addMonths, format, formatDistance, addDays, addMinutes } from 'date-fns';
import { addDoc, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserAuth } from '../context/AuthContext';

const HomePackages = () => {
  const { user, userData, subscriptions, subscribersCollectionRef, userSubscriptions } = UserAuth();
  const navigate = useNavigate();
  const [mpesaCode, setMpesaCode] = useState("");
  const [data, setData] = useState({
    id:"",
    period: "",
    price: "",
  });

  const handleData = (id, period, price) => {
    setData({...data, id, period, price})
  };

  const handleInput = (e) => {
    setData({...data, mpesa_code: e.target.value});
  };

  const handleSubscription = async (e) => {
    const {period, price} = data;
    e.preventDefault();
    if(data?.mpesa_code === ""){
      toast.error("Please enter the MPESA Code received.")
      return;
    }
    
    if(data?.period !== undefined && data?.period === "1 Month"){
      try {
        await addDoc(subscribersCollectionRef, {
          id:data?.id,
          userID: user?.uid,
          email: userData?.email,
          name_of_subscriber: userData?.first_name + " " + userData?.last_name,
          subscription_date: format(new Date(), "MM/dd/yyyy"),
          subscription_expiry: format(addMonths(new Date(), 1), "MM/d/yyyy"),
          subscription_period: data?.period,
          subscription_plan: data?.period,
          subscription_price: data?.price,
          subscription_status: "Pending",
          mpesa_code: data?.mpesa_code,
        });

        toast.success("Subscription was successfull. Please check your email for further instructions!");
        navigate("/profile")

      } catch (error) {
        console.log(error);
        toast.error("Subscription not successful.");
      }
    }

    if(data?.period !== undefined && data?.period === "3 Months"){
      try {
        await addDoc(subscribersCollectionRef, {
          id:data?.id,
          userID: user?.uid,
          email: userData?.email,
          name_of_subscriber: userData?.first_name + " " + userData?.last_name,
          subscription_date: format(new Date(), "MM/dd/yyyy"),
          subscription_expiry: format(addMonths(new Date(), 3), "MM/dd/yyyy"),
          subscription_period: data?.period,
          subscription_plan: data?.period,
          subscription_price: data?.price,
          subscription_status: "Pending",
          mpesa_code: data?.mpesa_code,
        });
        toast.success("Subscription was successfull. Please check your email for further instructions!");
        navigate("/profile")
      } catch (error) {
        console.log(error)
        toast.error("There was an error.")
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
                          <>
                          {/* <button 
                            type="button" 
                            className="w-100 btn btn-outline-primary" 
                            onClick={() => handleSubscription(id, subscription_period, subscription_price)} disabled={userData?.subscription_level !== "Free" || subscription?.subscription_period === "Free" }
                          >
                            Subscribe{userData?.subscription_level === subscription?.subscription_period && "d"}
                          </button> */}

                          <button 
                            type="button" 
                            className="w-100 btn btn-outline-primary mt-1" 
                            data-bs-toggle="modal" 
                            data-bs-target={`#modal${id}`}
                            disabled={userData?.subscription_level !== "Free" || subscription?.subscription_period === "Free"}
                            onClick={() => handleData(id,subscription_period, subscription_price)}
                          >
                            Subscribe{userData?.subscription_level === subscription?.subscription_period && "d"}
                          </button>

                          <div className="modal fade" id={`modal${id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="exampleModalLabel">Subscribing to {data?.period} plan</h5>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="mb-3">
                                      <label htmlFor="mpesa_code" className="form-label">MPESA Code</label>
                                      <input 
                                        type="text" 
                                        className="form-control" 
                                        id="mpesa_code"
                                        placeholder='Example: MPESA123CODE'
                                        required={true} 
                                        onChange={handleInput}
                                      />
                                    </div>
                                    <button 
                                      type="submit" 
                                      className="btn btn-primary"
                                      onClick={handleSubscription}
                                      disabled={userData?.subscription_level !== "Free" || subscription?.subscription_period === "Free" || data?.mpesa_code === ""}
                                      data-bs-dismiss="modal"
                                    >
                                      Submit
                                    </button>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          </>
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
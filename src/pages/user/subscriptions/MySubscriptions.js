import { differenceInDays, formatDistance } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import VerifyAccount from '../../../components/VerifyAccount'
import { UserAuth } from '../../../context/AuthContext'
import ProfileSidebar from '../ProfileSidebar'

const MySubscriptions = () => {
  
  const {user, userSubscriptions, isLoadingUserSubscriptions} = UserAuth();

  if(user.emailVerified === false){
    return <VerifyAccount user={user}/>
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <ProfileSidebar />
        </div>

        <div className='col-md-9 py-5'>
          <div className='row'>
            <div className='col-md-12 col-xs-12 d-inline-flex justify-content-between align-items-center'>
              <h1>My Subscriptions</h1>
              <Link to="/#subscriptions" className='btn btn-success btn-sm'>Subscribe</Link>
            </div>
          </div>

          <div className='row'>
            {isLoadingUserSubscriptions ? (
              <div>
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading Subscriptions...</p>
              </div>
              ) : (
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Plan</th>
                    <th scope="col">Period</th>
                    <th scope="col">Price <small>(ksh.)</small></th>
                    <th scope="col">Status</th>
                    <th scope="col">Date Subscribed</th>
                    <th scope="col">Expiry Date</th>
                    <th scope="col">Time Remaining</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userSubscriptions?.map((subscription, index) => {
                    const { id, userID, subscription_plan, subscription_period, subscription_price, subscription_status, subscription_date, subscription_expiry } = subscription;

                    const expiryDate = new Date(subscription_expiry); // MM/DD/YYYY
                    const subscriptionDate = new Date(subscription_date); // MM/DD/YYYY

                    const remainingDays = differenceInDays(expiryDate, subscriptionDate);

                    return (
                      <tr key={id}>
                        <th scope="row">{index + 1}</th>
                        <td>{subscription_plan}</td>
                        <td>{subscription_plan === "Free" ? "Free" : subscription_period}</td>
                        <td>{subscription_price}</td>
                        <td><button className={`btn btn-xs ${subscription_status === "Approved" && "btn-success"} ${subscription_status === "Rejected" && "btn-danger"} ${subscription_status === "Pending" && "btn-warning"}`} style={{ padding: "2px 5px", fontSize:"13px" }}>{subscription_status}</button></td>
                        <td>{subscription_date}</td>
                        <td>{subscription_plan === "Free" ? "No Expiry" : subscription_expiry}</td>
                        <td>{subscription_plan === "Free" ? "No Expiry" : remainingDays}</td>
                        <td className='d-flex justify-content-between'>
                          <button type="button" className="btn btn-sm btn-success mb-3 mx-1" data-bs-toggle="modal" data-bs-target={`#modal${id}`}>
                            View
                          </button>

                          <div className="modal fade" id={`modal${id}`} tabIndex={-1} aria-labelledby="userModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-scrollable">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title" id="userModalLabel">{`${subscription_plan} Subscription`}</h5>
                                  <button type="button" className="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <div className='row'>
                                    <div className='col-md-8 col-sm-12'>
                                      <table className="table table-responsive">
                                        <tbody>
                                          <tr>
                                            <th scope="row">Plan:</th>
                                            <td>{subscription_plan}</td>
                                          </tr>
                                          <tr>
                                            <th scope="row">Period:</th>
                                            <td>{subscription_plan === "Free" ? "Free" : subscription_period}</td>
                                          </tr>
                                          <tr>
                                            <th scope="row">Price:</th>
                                            <td>{subscription_price}</td>
                                          </tr>
                                          <tr>
                                            <th scope="row">Status:</th>
                                            <td><button className={`btn btn-xs ${subscription_status === "Approved" && "btn-success"} ${subscription_status === "Rejected" && "btn-danger"} ${subscription_status === "Pending" && "btn-warning"}`} style={{ padding: "2px 5px", fontSize:"13px" }}>{subscription_status}</button></td>
                                          </tr>
                                          <tr>
                                            <th scope="row">Date Subscribed:</th>
                                            <td>{subscription_date}</td>
                                          </tr>
                                          <tr>
                                            <th scope="row">Expiry Date:</th>
                                            <td>{subscription_plan === "Free" ? "No Expiry" : subscription_expiry}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MySubscriptions
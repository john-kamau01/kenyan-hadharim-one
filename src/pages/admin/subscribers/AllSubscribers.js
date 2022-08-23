import { differenceInDays, formatDistance } from 'date-fns'
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import CheckUserRole from '../../../components/CheckUserRole';
import VerifyAccount from '../../../components/VerifyAccount';
import { UserAuth } from '../../../context/AuthContext';
import { db } from '../../../firebase/firebase';
import Sidebar from '../Sidebar';


const AllSubscribers = () => {
  const navigate = useNavigate();
  const {user,userData, isLoadingAllSubscribers, allSubscribers, } = UserAuth();

  if(user.emailVerified === false){
    return <VerifyAccount user={user}/>
  };

  if( userData?.role !== 'admin' ){
    return <CheckUserRole />
  };

  const handleApprove = async (id, userID, subscription_plan) => {
      const subscribersCollectionRef = doc(db, "subscribers", id);
      const subscriberCollectionRef = doc(db, "users", userID);
      try {
        await updateDoc(subscribersCollectionRef, {
          subscription_status: "Approved"
        });

        await updateDoc(subscriberCollectionRef, {
          subscription_level: subscription_plan
        });

        toast.success("Subscription Approved successfully!");
        navigate('/admin/subscribers');
      } catch (error) {
        toast.error("Error approving the subscription");
      }
  };


  const handleReject = async (id, userID) => {
    const subscribersCollectionRef = doc(db, "subscribers", id);
    const subscriberCollectionRef = doc(db, "users", userID);
      try {
        await updateDoc(subscribersCollectionRef, {
          subscription_status: "Rejected"
        });
        await updateDoc(subscriberCollectionRef, {
          subscription_level: "Free"
        });
        toast.success("Subscription recjected successfully!");
        navigate('/admin/subscribers');
      } catch (error) {
        toast.error("Error rejecting");
      }
  };

  const handleDelete = async (id, userID) => {
    const subscriberCollectionRef = doc(db, "users", userID);
    try {
      await deleteDoc(doc(db, 'subscribers', id));
      await updateDoc(subscriberCollectionRef, {
        subscription_level: "Free"
      });
      toast.success('Subscription deleted successfully');
      navigate('/admin/subscribers');
    } catch (error) {
      console.log(error.message);
      toast.error('Error deleting the subscription');
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <Sidebar />
        </div>

        <div className='col-md-9 py-5'>
          <div className='row'>
            <div className='col-md-12 col-xs-12 d-inline-flex justify-content-between align-items-center'>
              <h1>All Subscriptions</h1>
              <Link to="/admin/subscribers" className='btn btn-success btn-sm'>Manage Subscriptions</Link>
            </div>
          </div>

          <div className='row'>
            {isLoadingAllSubscribers ? (
              <div>
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading Subscriptions...</p>
              </div>
              ) : (
                <div className='table-responsive'>
                <table className="table table-hover table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Subscriber</th>
                      <th scope="col">Plan</th>
                      <th scope="col">Price <small>(ksh.)</small></th>
                      <th scope="col">Status</th>
                      <th scope="col">Date Subscribed</th>
                      <th scope="col">Expiry Date</th>
                      <th scope="col">Time Remaining</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSubscribers?.map((subscription, index) => {
                      const { id, userID, subscription_plan, subscription_period, subscription_price, subscription_status, subscription_date, subscription_expiry, name_of_subscriber } = subscription;

                      const expiryDate = new Date(subscription_expiry); // MM/DD/YYYY
                      const subscriptionDate = new Date(subscription_date); // MM/DD/YYYY

                      const remainingDays = differenceInDays(expiryDate, subscriptionDate);

                      return (
                        <tr key={id}>
                          <th scope="row">{index + 1}</th>
                          <td>{name_of_subscriber}</td>
                          <td>{subscription_plan === "Free" ? "Free" : subscription_period}</td>
                          <td>{subscription_price}</td>
                          <td><button className={`btn btn-xs ${subscription_status === "Approved" && "btn-success"} ${subscription_status === "Rejected" && "btn-danger"} ${subscription_status === "Pending" && "btn-warning"}`} style={{ padding: "2px 5px", fontSize:"13px" }}>{subscription_status}</button></td>
                          <td>{subscription_date}</td>
                          <td>{subscription_plan === "Free" ? "No Expiry" : subscription_expiry}</td>
                          <td>{subscription_plan === "Free" ? "No Expiry" : remainingDays} Day{`${remainingDays > 1 ? "s" : ""}`}</td>
                          <td className='d-flex justify-content-between'>
                            <button type="button" className="btn btn-sm btn-success mb-3 mx-1" data-bs-toggle="modal" data-bs-target={`#modal${id}`}>
                              View
                            </button>
                            {subscription_status === 'Pending' && (
                              <div className='d-flex align-items-center'>
                                <button className='btn btn-sm btn-primary mb-3 mx-1' onClick={() => handleApprove(id, userID, subscription_plan)}>Approve</button>
                                <button className='btn btn-sm btn-warning mb-3 mx-1' onClick={() => handleReject(id, userID)}>Reject</button>
                                <button className='btn btn-sm btn-danger mb-3 mx-1' onClick={() => handleDelete(id, userID)}>Delete</button>
                              </div>
                            )}

                            {subscription_status === 'Approved' && (
                              <div className='d-flex align-items-center'>
                                <button className='btn btn-sm btn-warning mb-3 mx-1' onClick={() => handleReject(id, userID)}>Reject</button>
                                <button className='btn btn-sm btn-danger mb-3 mx-1' onClick={() => handleDelete(id, userID)}>Delete</button>
                              </div>
                            )}

                            {subscription_status === 'Rejected' && (
                              <div className='d-flex align-items-center'>
                                <button className='btn btn-sm btn-primary mb-3 mx-1' onClick={() => handleApprove(id, userID)}>Approve</button>
                                <button className='btn btn-sm btn-danger mb-3 mx-1' onClick={() => handleDelete(id, userID)}>Delete</button>
                              </div>
                            )}

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
                                              <th scope="row">Subscriber:</th>
                                              <td>{name_of_subscriber}</td>
                                            </tr>
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
                                            <tr>
                                              <th scope="row">Time Remaining:</th>
                                              <td>{remainingDays}</td>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllSubscribers
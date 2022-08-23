import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CheckUserRole from '../../../components/CheckUserRole';
import VerifyAccount from '../../../components/VerifyAccount';
import { UserAuth } from '../../../context/AuthContext';
import Sidebar from '../Sidebar';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';

const Subscriptions = () => {
  let navigate = useNavigate();
  const { user, userData, subscriptions, isLoading } = UserAuth();

  if(user.emailVerified === false){
    return <VerifyAccount user={user} />
  };

  if( userData?.role !== 'admin' ){
    return <CheckUserRole />
  };

  const deleteSubscription = async (id) => {
    try {
      await deleteDoc(doc(db, 'subscriptions', id));
      toast.success('Subscription deleted successfully');
      navigate('/admin/subscriptions');
    } catch (error) {
      toast.error('Error deleting the article');
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <Sidebar />
        </div>

        <div className='col-md-9 col-xs-12 py-5'>
          <>
          <div className='row'>
            <div className='col-md-12 col-xs-12 d-inline-flex justify-content-between align-items-center'>
              <h1>All Subscriptions</h1>
              <Link to="/admin/subscriptions/add" className='btn btn-success btn-sm'>Add Subscription</Link>
            </div>
          </div>
          </>
          <div className='row'>
            {isLoading ? (
              <div>
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading Subscriptions...</p>
              </div>
              ) : (
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Period</th>
                    <th scope="col">Price</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions?.map((subscription, index) => {
                    const { subscription_period, subscription_price, id } = subscription;
                    // console.log(subscription)
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{subscription_period}</td>
                        <td>{subscription_price}</td>
                        <td className='d-flex align-items-center'>
                          <Link className='btn btn-warning btn-sm ms-1' to={`/admin/subscription/${id}`}>Edit</Link>
                          <button className='btn btn-danger btn-sm ms-1' onClick={() => deleteSubscription(id)}>Delete</button>
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

export default Subscriptions;
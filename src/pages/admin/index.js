import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import VerifyAccount from '../../components/VerifyAccount';
import CheckUserRole from '../../components/CheckUserRole';
import Sidebar from './Sidebar';

const Admin = () => {
  let navigate = useNavigate();
  const { user, userData, users, allSubscribers, articles } = UserAuth();
  const [totalAmount, setTotalAmount] = useState(0);
  const [approvedSubscriptions, setApprovedSubscriptions] = useState([]);
  const [rejectedSubscriptions, setRejectedSubscriptions] = useState([]);
  const [pendingSubscriptions, setPendingSubscriptions] = useState([]);

  const [publishedArticles, setPublishedArticles] = useState([]);
  const [rejectedArticles, setRejectedArticles] = useState([]);
  const [pendingArticles, setPendingArticles] = useState([]);

  useEffect(() => {
    const getAmount = () => {
      const sum = users?.reduce((accumulator, object) => {
        return accumulator + parseInt(object.total_contributions)
      }, 0)
      setTotalAmount(sum);
    }
    
    return () => {
      getAmount();
    }
  }, [user]);

  useEffect(() => {
    let approvedSubscriber = allSubscribers.filter(function (subscription){
      return subscription.subscription_status === "Approved";
    });

    setApprovedSubscriptions(approvedSubscriber);

  },[user]);

  useEffect(() => {
    let rejectedSubscriber = allSubscribers.filter(function (subscription){
      return subscription.subscription_status === "Rejected";
    });

    setRejectedSubscriptions(rejectedSubscriber);

  },[user]);

  useEffect(() => {
    let pendingSubscriber = allSubscribers.filter(function (subscription){
      return subscription.subscription_status === "Pending";
    });

    setPendingSubscriptions(pendingSubscriber);

  },[user]);

  useEffect(() => {
    let publishedArticle = articles.filter(function (article){
      return article.status === "published";
    });

    setPublishedArticles(publishedArticle);

  },[user]);

  useEffect(() => {
    let rejectedArticle = articles.filter(function (article){
      return article.status === "rejected";
    });

    setRejectedArticles(rejectedArticle);

  },[user]);

  useEffect(() => {
    let pendingArticle = articles.filter(function (article){
      return article.status === "pending";
    });

    setPendingArticles(pendingArticle);

  },[user]);
  
  if(user.emailVerified === false){
    return <VerifyAccount user={user} />
  };

  if( userData?.role !== 'admin' ){
    return <CheckUserRole />
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <Sidebar />
        </div>

        <div className='col-md-9 col-xs-12 py-5'>
          <h1>Welcome to The Admin Page</h1>
          <p>
            This is where we will manage users, subscriptions, blogs, and businesses!
          </p>

          <div className='row mt-4'>
          <div className='col-md-12 pt-5 pb-2'>
              <h3 className='fw-normal'>Users</h3>
              <hr />
            </div>
            <div className='col-md-4 mb-2'>
              <div className="card" style={{ boxShadow:"5px 5px 19px 0px rgba(0,0,0,0.23)", borderRadius:"5px", border:"none" }}>
                <div className="card-header text-center">Total Users</div>
                <div className="card-body text-center">
                  <h6 className="card-subtitle tex-success" style={{ fontSize:"40px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"30px" }}>
                    {users?.length}
                  </h6>
                  <Link to='/admin/users' className='w-100 btn btn-primary px-5 btn-sm'>
                    View Users
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-md-4 mb-2'>
              <div className="card" style={{ boxShadow:"5px 5px 19px 0px rgba(0,0,0,0.23)", borderRadius:"5px", border:"none" }}>
              <div className="card-header text-center">Total Amount</div>
                <div className="card-body text-center">
                  <h6 className="card-subtitle tex-success" style={{ fontSize:"40px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"30px" }}>
                    {totalAmount}
                  </h6>
                  <Link to='/admin/users' className='w-100 btn btn-danger px-5 btn-sm'>
                    View Users
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-md-12 pt-5 pb-2'>
              <h3 className='fw-normal'>Subscriptions</h3>
              <hr />
            </div>

            <div className='col-md-4 mb-2'>
              <div className="card" style={{ boxShadow:"5px 5px 19px 0px rgba(0,0,0,0.23)", borderRadius:"5px", border:"none" }}>
              <div className="card-header text-center">Approved Subscriptions</div>
                <div className="card-body text-center">
                  <h6 className="card-subtitle tex-success" style={{ fontSize:"40px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"30px" }}>
                    {approvedSubscriptions?.length}
                  </h6>
                  <Link to='/admin/subscribers' className='w-100 btn btn-success px-5 btn-sm'>
                    View Subscriptions
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-md-4 mb-2'>
              <div className="card" style={{ boxShadow:"5px 5px 19px 0px rgba(0,0,0,0.23)", borderRadius:"5px", border:"none" }}>
              <div className="card-header text-center">Pending Subscriptions</div>
                <div className="card-body text-center">
                  <h6 className="card-subtitle tex-success" style={{ fontSize:"40px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"30px" }}>
                    {pendingSubscriptions?.length}
                  </h6>
                  <Link to='/admin/subscribers' className='w-100 btn btn-danger px-5 btn-sm'>
                    View Subscriptions
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-md-4 mb-2'>
              <div className="card" style={{ boxShadow:"5px 5px 19px 0px rgba(0,0,0,0.23)", borderRadius:"5px", border:"none" }}>
              <div className="card-header text-center">Rejected Subscriptions</div>
                <div className="card-body text-center">
                  <h6 className="card-subtitle tex-success" style={{ fontSize:"40px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"30px" }}>
                    {rejectedSubscriptions?.length}
                  </h6>
                  <Link to='/admin/subscribers' className='w-100 btn btn-primary px-5 btn-sm'>
                    View Subscriptions
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-md-12 pt-5 pb-2'>
              <h3 className='fw-normal'>Blogs</h3>
              <hr />
            </div>

            <div className='col-md-4 mb-2'>
              <div className="card" style={{ boxShadow:"5px 5px 19px 0px rgba(0,0,0,0.23)", borderRadius:"5px", border:"none" }}>
              <div className="card-header text-center">Published Blogs</div>
                <div className="card-body text-center">
                  <h6 className="card-subtitle tex-success" style={{ fontSize:"40px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"30px" }}>
                    {publishedArticles?.length}
                  </h6>
                  <Link to='/admin/subscribers' className='w-100 btn btn-outline-success px-5 btn-sm'>
                    View Blogs
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-md-4 mb-2'>
              <div className="card" style={{ boxShadow:"5px 5px 19px 0px rgba(0,0,0,0.23)", borderRadius:"5px", border:"none" }}>
              <div className="card-header text-center">Pending Blogs</div>
                <div className="card-body text-center">
                  <h6 className="card-subtitle tex-success" style={{ fontSize:"40px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"30px" }}>
                    {pendingArticles?.length}
                  </h6>
                  <Link to='/admin/subscribers' className='w-100 btn btn-outline-danger px-5 btn-sm'>
                    View Blogs
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-md-4 mb-2'>
              <div className="card" style={{ boxShadow:"5px 5px 19px 0px rgba(0,0,0,0.23)", borderRadius:"5px", border:"none" }}>
              <div className="card-header text-center">Rejected Blogs</div>
                <div className="card-body text-center">
                  <h6 className="card-subtitle tex-success" style={{ fontSize:"40px", fontWeight:"bold", paddingTop:"30px", paddingBottom:"30px" }}>
                    {rejectedArticles?.length}
                  </h6>
                  <Link to='/admin/subscribers' className='w-100 btn btn-primary px-5 btn-sm'>
                    View Blogs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin;
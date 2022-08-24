import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddArticle from '../components/AddArticle';
import Articles from '../components/Articles';
import { UserAuth } from '../context/AuthContext';

const ArticlesPage = () => {
  const { articles, isLoadingArticles, user, userData } =UserAuth();

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 py-5'>
          <h1 className='text-center fw-normal'>Blogs Page</h1>
          <p className='text-center lead text-muted'>
            View All Blog Posts
          </p>
        </div>
      </div>
      
      <div className='row'>
        <div className='col-md-8'>
          {isLoadingArticles ? (
            <div>
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading Articles...</p>
            </div>
          ) : (
            <div className="row">
            {articles?.map((article) => {
              if(article.status === 'published'){
                return (
                  <Articles article={article} key={article.id} />
                );
              }
            })}
            </div>
          )}
        </div>
        <div className='col-md-4'>
          <h2 className='fw-normal'>Add Article</h2>
          {!user && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Enjoy our priveledges</h5>
                <Link to="/login" className='btn btn-warning px-5 mx-1'>Login</Link>
                <Link to="/register" className='btn btn-danger px-5 mx-1'>Register</Link>
              </div>
          </div>
          )}
          
          {user && userData?.subscription_level !== "Free" && (
            <AddArticle />
          )}
          {user && userData?.subscription_level === "Free" && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">You are on a free subscription</h5>
                <Link to="/#subscriptions" class="btn btn-primary btn-sm px-4">Subscribe to Post</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticlesPage;
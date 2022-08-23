import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddArticle from '../components/AddArticle';
import Articles from '../components/Articles';
import { UserAuth } from '../context/AuthContext';

const ArticlesPage = () => {
  const { articles, isLoadingArticles } =UserAuth();

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12 py-5'>
          <h1>Welcome to the articles page.</h1>
          <p>
            This is the page for all articles. 
          </p>
          <div className='hero__btns mt-3'>
            <Link to='/' className='btn btn-primary px-4'>Explore</Link>
            <Link to='/my-account' className='btn btn-success px-4'>Your Account</Link>
          </div>
        </div>
      </div>
      
      <div className='row'>
        <div className='col-md-8'>
          <h2>All Articles</h2>
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
          <h2>Add Article</h2>
          <AddArticle />
        </div>
      </div>
    </div>
  )
}

export default ArticlesPage;
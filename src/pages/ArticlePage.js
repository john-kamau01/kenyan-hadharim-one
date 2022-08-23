import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase/firebase';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [articleID, setArticleID] = useState(null);
  const {user} = UserAuth();

  useEffect(() => {
    const articleRef = doc(db, "articles", id);
    onSnapshot(articleRef, (data) => {
      setLoadingArticle(true);
      setArticle(data.data());
    })
  }, []);

  useEffect(() => {
    setLoadingArticle(false);
    if(article){
      setArticleID(id);
    }
  },[article]);

  console.log(article)
  // console.log(articleID)

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 py-5">
          {loadingArticle ? (
            <div>
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading Article...</p>
            </div>
          ) : (
          <div className="card mb-4">
            <div className='card-header'>
              <h2 className="card-title">{article?.title}</h2>
              <div className="small text-muted pb-2">Published on: {article?.createdAt.toDate().toDateString()}</div>
            </div>
            <img className="card-img-top" src={article?.imageURL} alt={article?.title} style={{ maxHeight: "350px", objectFit: "cover" }} />
            <div className="card-body">
              
              
              <p className="card-text">{article?.article_content}</p>
              <Link to="/articles" className="btn btn-primary btn-sm">more articles →</Link>
            </div>
          </div>
          )}
        </div>
        <div className="col-lg-4 py-5">
          <div className="card mb-4">
            <div className="card-header">Useful Links</div>
            <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-unstyled mb-0">
                      <li><Link to="/articles" className='text-decoration-none'>All Articles</Link></li>
                      <li><Link to="/blog/add" className='text-decoration-none'>Add Article</Link></li>
                      <li><Link to="/profile" className='text-decoration-none'>Profile</Link></li>
                      <li><Link to="/profile" className='text-decoration-none'>My Subscriptions</Link></li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">Search</div>
            <div className="card-body">
              <div className="input-group">
                <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                <button className="btn btn-primary" id="button-search" type="button">Go!</button>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">Categories</div>
            <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <ul className="list-unstyled mb-0">
                      <li><Link to="#">Web Design</Link></li>
                      <li><Link to="#">HTML</Link></li>
                      <li><Link to="#">Freebies</Link></li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header">Side Widget</div>
            <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticlePage;
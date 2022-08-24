import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Articles = ({article}) => {
  const {id, title, article_content, createdAt, imageURL} = article;
  return (
    <div className="col-lg-6">
      <div className="card mb-4">
          <Link to={`/article/${id}`}><img className="card-img-top" src={imageURL} alt={title} style={{ height:"150px", objectFit:"cover" }} /></Link>
          <div className="card-body">
            <div className="small text-muted">{createdAt.toDate().toDateString()}</div>
            <h2 className="card-title h4">{title}</h2>
            <p className="card-text">{article_content.substring(0, 100)}</p>
            <Link to={`/article/${id}`} class="btn btn-primary">Read more →</Link>
          </div>
      </div>
  </div>
  )
}

export default Articles;
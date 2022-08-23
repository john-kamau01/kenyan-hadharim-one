import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Articles = ({article}) => {
  const {id, title, article_content, createdAt, imageURL} = article;
  return (
    <div class="col-lg-6">
      <div class="card mb-4">
          <Link to={`/article/${id}`}><img class="card-img-top" src={imageURL} alt={title} style={{ height:"150px", objectFit:"cover" }} /></Link>
          <div class="card-body">
            <div class="small text-muted">{createdAt.toDate().toDateString()}</div>
            <h2 class="card-title h4">{title}</h2>
            <p class="card-text">{article_content.substring(0, 100)}</p>
            <Link to={`/article/${id}`} class="btn btn-primary">Read more →</Link>
          </div>
      </div>
  </div>
  )
}

export default Articles;
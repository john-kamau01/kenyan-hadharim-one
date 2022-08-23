import { deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserAuth } from '../../../context/AuthContext';
import { db, storage } from '../../../firebase/firebase';

const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [articleID, setArticleID] = useState(null);
  const [mainImageURL, setMainImageURL] = useState(null);
  const [articleOwner, setArticleOwner] = useState({});

  useEffect(() => {
    const articleRef = doc(db, 'articles', id);
    onSnapshot(articleRef, (data) => {
      setLoadingArticle(true)
      setArticle({...data.data(), id: id});
    });
  },[]);

  useEffect(() => {
    setLoadingArticle(false)
    if(article){
      setArticleID(id);
      setMainImageURL(article.imageURL);
    }
  },[article]);

  const handleApprove = async () => {
    if(articleID !== undefined){
      const articleRef = doc(db, "articles", articleID);
      try {
        await updateDoc(articleRef, {
          status: "published"
        });
        toast.success("Blog published successfully!")
      } catch (error) {
        toast.error("Error approving the post");
      }
    }
  };


  const handleReject = async () => {
    if(articleID !== undefined){
      const articleRef = doc(db, "articles", articleID);
      try {
        await updateDoc(articleRef, {
          status: "rejected"
        });
        toast.success("Blog recjected successfully!")
      } catch (error) {
        toast.error("Error approving the post");
      }
    }
  };

  const handleDelete = async () => {
    if(articleID !== undefined && mainImageURL !== undefined){
      try {
        await deleteDoc(doc(db, 'articles', articleID));
        toast.success('Article deleted successfully');
        const storageRef = ref(storage, mainImageURL);
        await deleteObject(storageRef);
        navigate('/admin/blogs');
      } catch (error) {
        console.log(error.message);
        toast.error('Error deleting the article');
      }
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      {article === null ? (
        <div className='row'>
          <div className='col-md-4 py-5 text-center'>
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading Article...</p>
          </div>
        </div>
      ) : (
      <div className='row'>
        <div className='col-md-3 py-5'>
          <img src={article.imageURL} alt="" className='img-fluid' />
        </div>

        <div className='col-md-6 py-5'>
          <h1>{article.title}</h1>
          {/* <p>{article.createdAt.toDate().toDateString()}</p> */}
          <p>{article.article_content}</p>
        </div>

        <div className='col-md-3 py-5'>
          <button className='btn btn-sm btn-danger mb-3' onClick={() => navigate(-1)}>Back</button>
          <h6>Blog Status: <span className={`${article?.status === 'pending' ? 'text-danger' : 'text-success'}`}>{article?.status}</span></h6>
          {article?.status === 'pending' && (
            <div className='d-flex align-items-center'>
              <button className='btn btn-sm btn-primary mb-3 mx-1' onClick={() => handleApprove()}>Approve</button>
              <button className='btn btn-sm btn-warning mb-3 mx-1' onClick={() => handleReject()}>Reject</button>
            </div>
          )}

          {article?.status === 'published' && (
            <div className='d-flex align-items-center'>
              <button className='btn btn-sm btn-warning mb-3 mx-1' onClick={() => handleReject()}>Reject</button>
            </div>
          )}

          {article?.status === 'rejected' && (
            <div className='d-flex align-items-center'>
              <button className='btn btn-sm btn-primary mb-3 mx-1' onClick={() => handleApprove()}>Approve</button>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
}

export default Blog;
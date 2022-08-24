import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VerifyAccount from '../../../components/VerifyAccount';
import { UserAuth } from '../../../context/AuthContext';
import ProfileSidebar from '../ProfileSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye, faEdit } from '@fortawesome/free-solid-svg-icons'
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';

const AllBlogs = () => {

  const { user, userData, currentUserID, userArticles, isLoadingUserArticles } = UserAuth();



  if(user.emailVerified === false){
    return <VerifyAccount user={user}/>
  }

  const deleteBlog = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, 'articles', id));
      toast.success('Article deleted successfully');
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
    } catch (error) {
      console.log(error.message);
      toast.error('Error deleting the article');
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <ProfileSidebar />
        </div>

        <div className='col-md-9 py-5'>
          <div className='row'>
            <div className='col-md-12 col-xs-12 d-inline-flex justify-content-between align-items-center'>
              <h1>My Blogs</h1>
              <Link to="/blog/add" className='btn btn-success btn-sm'>Add Blog</Link>
            </div>
          </div>
          <div className='row'>
            {isLoadingUserArticles ? (
              <div>
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading Articles...</p>
              </div>
              ) : (
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Author</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userArticles?.map((article, index) => {
                    const {id, title, article_content, createdAt, imageURL, status, createdBy} = article;
                    // console.log(status)
                    return (
                      <tr key={article.id}>
                        <th scope="row">{index + 1}</th>
                        <td><img src={imageURL} alt="" className='img-fluid' style={{ width: "80px", height: '50px', objectFit: 'contain' }} /></td>
                        <td>{title}</td>
                        <td>{article_content.substring(0, 50)}</td>
                        <td>{status}</td>
                        <td>{createdBy ? createdBy : 'Unknown'}</td>
                        <td className='d-flex justify-content-between'>                          
                          <button 
                              type="button" 
                              className="btn btn-sm btn-warning mb-3 mx-1" 
                              data-bs-toggle="modal" 
                              data-bs-target={`#modal${id}`}
                            >
                              View
                            </button>

                            <div className="modal fade" id={`modal${id}`} tabIndex={-1} aria-labelledby="userModalLabel" aria-hidden="true">
                              <div className="modal-dialog modal-dialog-scrollable modal-lg">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5 className="modal-title" id="userModalLabel">{}</h5>
                                    <button type="button" className="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                                  </div>
                                  <div className="modal-body">
                                    <div className='row'>
                                      <div className='col-md-12 col-sm-12'>
                                      <div className="card text-center">
                                        <div className="card-header">
                                          <h5 className='fw-normal'>{article?.title}</h5>
                                        </div>
                                        <img src={article?.imageURL} className="card-img-top" alt="" style={{ maxHeight: "250px", objectFit:"contain", objectPosition:"center center" }} />
                                        <div className="card-body">
                                          <h5 className="card-title"></h5>
                                          <p className="card-text">
                                            {article?.article_content}
                                          </p>
                                        </div>
                                        <div className="card-footer text-muted">
                                          Posted on: {article?.createdAt.toDate().toDateString()}
                                        </div>
                                      </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    
                                    <div className='d-flex align-items-center'>
                                      <button type="button" className="btn btn-sm btn-secondary mb-3" data-bs-dismiss="modal">Close</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Link to={`/profile/ownblog/edit/${id}`} className='btn btn-sm btn-primary mb-3 mx-1'>Edit</Link>
                            <button className='btn btn-sm btn-danger mb-3 mx-1' onClick={()=>deleteBlog(id, imageURL)}>Delete</button>
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

export default AllBlogs;
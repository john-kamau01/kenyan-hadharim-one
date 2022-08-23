import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import CheckUserRole from '../../../components/CheckUserRole';
import VerifyAccount from '../../../components/VerifyAccount';
import { UserAuth } from '../../../context/AuthContext';
import Sidebar from '../Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEye, faEdit } from '@fortawesome/free-solid-svg-icons'
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../firebase/firebase';
import { toast, ToastContainer } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';

const Blogs = () => {
  let navigate = useNavigate();
  const { articles, isLoadingArticles, user, userData } = UserAuth();

  if(user.emailVerified === false){
    return <VerifyAccount user={user} />
  };

  if( userData?.role !== 'admin' ){
    return <CheckUserRole />
  };

  const deleteBlog = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, 'articles', id));
      toast.success('Article deleted successfully');
      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      navigate('/admin/blogs');
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
          <Sidebar />
        </div>

        <div className='col-md-9 col-xs-12 py-5'>
          <div className='row'>
            {isLoadingArticles ? (
              <div>
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading Articles...</p>
              </div>
              ) : (
              <table className="table table-striped table-hover table-bordered">
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
                  {articles?.map((article, index) => {
                    const {id, title, article_content, createdAt, imageURL, status, createdBy} = article;
                    // console.log(article)
                    return (
                      <tr key={article.id}>
                        <th scope="row">{index + 1}</th>
                        <td><img src={imageURL} alt="" className='img-fluid' style={{ width: "80px", height: '50px', objectFit: 'contain' }} /></td>
                        <td>{title}</td>
                        <td>{article_content.substring(0, 50)}</td>
                        <td>{status}</td>
                        <td>{createdBy ? createdBy : 'Unknown'}</td>
                        <td className='d-flex align-items-center'>
                          <Link to={`/admin/blog/${id}`} className='btn btn-warning btn-sm ms-1'>View</Link>
                          <button className='btn btn-danger btn-sm ms-1' onClick={()=>deleteBlog(id, imageURL)}>Delete</button>
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

export default Blogs;
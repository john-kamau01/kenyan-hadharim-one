import { UserAuth } from '../../../context/AuthContext';
import { db, storage } from '../../../firebase/firebase';
import { collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import ProfileSidebar from '../ProfileSidebar';

const Update = () => {
  const { id } = useParams();
  const { user, userData } = UserAuth();

  const articlesRef = doc(db, "articles", id);

  let navigate = useNavigate();
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({
    title: "",
    imageURL: "",
    article_content: "",
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    id && getSingleArticle();
  },[id]);

  const getSingleArticle = async () => {
    const docRef = doc(db, "articles", id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()){
      setData({...snapshot.data()});
    }
  }

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageReference = ref(storage, `/images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          toast.error("There was an error uploading the image. Please try again.")
          console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({...prev, imageURL: downloadURL}));
          });
        }
      );
    };

    file && uploadFile();
  },[file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({...data, [id]:value});
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    setFormErrors(validate(data));

    if(isSubmit){
      const docRef = doc(db, 'articles', id);
      try {
        await updateDoc(docRef, {
          ...data,
        });

        toast.success('Article updated successful!');
        setTimeout(() => {
          navigate('/blog');
        }, 1000);
      } catch (err) {
        toast.error("Error updating!")
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if(Object.keys(formErrors).length === 0){
      setIsSubmit(true);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if(!values.file){
      errors.file = "Please upload the post image";
    }
    if(!values.title){
      errors.first_titlename = "Please enter a title";
    }
    if(!values.content){
      errors.content = "Please enter post content";
    }
    return errors;
  };

  // console.log(data)


  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <ProfileSidebar />
        </div>

        <div className='col-md-9 py-5'>
          <div>
          <h1>Update Article Details</h1>
          <button className='btn btn-warning btn-sm px-5'>Back</button>
          </div>

          <form onSubmit={handleUpdateArticle}>
            <div className='row'>
              <div className='col-md-12'>
                <h4 className='title'>Featured Image:</h4>
                <hr />
              </div>
              <div className="col-md-12 col-sm-12 mb-3">
                <img src={data?.imageURL ? data.imageURL :
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" 
                  } 
                  alt=''
                  className='img-fluid'
                  style={{ borderRadius: "5px", objectFit: "cover", marginBottom: "5px", maxHeight:"200px" }}
                />
                {progress === 0 && null }
                {progress > 0 && (
                  <div className="progress mb-2">
                    <div className="progress-bar progress-bar-success progress-bar-animated" style={{ width: `${progress}%`}}>
                      Uploading {progress}%
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-sm-6 mb-3">
                <label htmlFor="file" className="form-label">Post Image</label>
                <input 
                  type="file"
                  className="form-control" 
                  id="file" 
                  onChange={e => setFile(e.target.files[0])}
                  accept='image/*'
                />
                <span className='text-danger text-sm'>{formErrors.file}</span>
              </div>
              <div className='col-md-12'>
                <h4 className='title'>Title & Content</h4>
                <hr />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input 
                  type="text"
                  className="form-control" 
                  id="title" 
                  placeholder='Article Title'
                  onChange={handleInput}
                  value={data?.title}
                />
                <span className='text-danger text-sm'>{formErrors.title}</span>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="article_content" className="form-label">Article Content</label>
                <textarea
                  className="form-control" 
                  id="article_content" 
                  placeholder='Article Content'
                  onChange={handleInput}
                  value={data?.article_content}
                />
                <span className='text-danger text-sm'>{formErrors.title}</span>
              </div>
            </div>
            <button type="submit" className="btn btn-danger ps-3">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update
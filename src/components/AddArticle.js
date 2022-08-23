import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { db, storage } from '../firebase/firebase';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddArticle = () => {
  // Get the current logged in user
  const navigate = useNavigate();
  const { user,userData } = UserAuth();
  const fullName = userData?.first_name + ' ' + userData?.last_name;
  const userID = user?.uid;

  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({...formData, image: e.target.files[0] });
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if(!formData.title || !formData.content || !formData.image){
      toast.error('Please fill in all the blanks');
      return;
    }

    const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on('state_changed', (snapshot) => {
      const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgress(progressPercent);
    },
    (err) => {
      toast.error("There was an error uploading the image. Please try again.")
      console.log(err);
    },
    () => {
      setFormData({
        title: "",
        content: "",
        image: "",
      });
      getDownloadURL(uploadImage.snapshot.ref)
      .then((url) => {
        const articleRef = collection(db, 'articles');
        addDoc(articleRef, {
          title: formData.title,
          article_content: formData.content,
          imageURL: url,
          createdBy: fullName,
          userID,
          status: 'pending',
          createdAt: Timestamp.now().toDate()
        })
        .then(() => {
          toast.success('Article added successfully. Your article will be published after it has been reviewed.');
          setProgress(0);
          navigate('/blog')
        })
        .catch((err) => {
          toast.error('Error submitting the article');
          console.log(err);
        })
      });
    }
    );
  };

  return (
    <div className=''>
      <ToastContainer />
      <form>
        <div className='mb-3'>
          <label htmlFor='title'>Article Title</label>
          <input type="text" className='form-control' name="title" id="title" value={formData.title} onChange={e => handleChange(e)} />
        </div>

        <div className='mb-3'>
          <label htmlFor='content'>Article Content</label>
          <textarea className='form-control' name="content" id="content" value={formData.content} onChange={e => handleChange(e)} />
        </div>

        <div className='mb-3'>
          <label htmlFor='image'>Upload image</label>
          <input type="file" className='form-control' name="image" id="image" accept='image/*' onChange={e => handleImageChange(e)} />
        </div>

        {progress === 0 ? null : (
          <div className="progress mb-2">
            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${progress}%`}}>
              Uploading {progress}%
            </div>
          </div>
        )} 
        
        <button className='btn btn-danger' onClick={handlePublish}>Add Article</button>
      </form>
      <hr />
    </div>
  )
}

export default AddArticle;
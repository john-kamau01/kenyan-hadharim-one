import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserAuth } from '../../../context/AuthContext';
import { db } from '../../../firebase/firebase';
import Sidebar from '../Sidebar';

const EditSubscription = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {subscriptions, subscriptionsCollectionRef} = UserAuth();
  const [existingSubs, setExistingSubs] = useState([]);
  const [data, setData] = useState({
    subscription_period: "",
    subscription_price: "",
  });

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({...data, [id]:value});
  };

  useEffect(() => {
    subscriptions.map((subscription) => {
      setExistingSubs((prev) => [...prev, subscription.subscription_period]);
    })
  },[subscriptions]);

  useEffect(() => {
    id && getSingleSubscription();
  },[id]);

  const getSingleSubscription = async () => {
    const docRef = doc(db, "subscriptions", id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()){
      setData({...snapshot.data()});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!data.subscription_period || !data.subscription_price){
      toast.error("Please fill in all the details");
      return;
    }

    try {
      await updateDoc(doc(subscriptionsCollectionRef, id), {
        ...data,
      });

      toast.success('Subscription updated successful!');
      setTimeout(() => {
        navigate('/admin/subscriptions');
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='container'>
      <ToastContainer />

      <div className='row'>
      <div className='col-md-3 col-xs-12 py-5'>
          <Sidebar />
        </div>

        <div className='col-md-9 col-xs-12 py-5'>
          <>
            <div className='row'>
              <div className='col-md-12 col-xs-12 d-inline-flex justify-content-between align-items-center'>
                <h1>Edit Subscription</h1>
                <button className='btn btn-sm btn-danger mb-3' onClick={() => navigate(-1)}>Back</button>
              </div>
            </div>
          </>
          
          <hr />

          <form onSubmit={handleSubmit} className="mt-3">
            <div className="col-md-3 mb-3">
              <label htmlFor="subscription_period" className="form-label">Period</label>
              <select 
                className="form-select" 
                id="subscription_period"
                onChange={handleInput}
                value={data?.subscription_period}
                required={true}
              >
                <option value="" disabled>Please select</option>
                <option value="Free">Free</option>
                <option value="1 Month">1 Month</option>
                <option value="3 Months">3 Month</option>
              </select>
            </div>

            <div className="col-md-3 mb-3">
              <label htmlFor="subscription_price" className="form-label">Price</label>
              <input 
                type="number"
                className="form-control" 
                id="subscription_price" 
                placeholder='Price of Subscription' 
                onChange={handleInput}
                required={true}
                value={data?.subscription_price}
              />
            </div>

            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditSubscription;
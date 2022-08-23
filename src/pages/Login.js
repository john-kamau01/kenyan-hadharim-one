import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserAuth } from '../context/AuthContext';

const Login = () => {
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser, user } = UserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/profile', {replace: true});
    } catch (err) {
      if(err.code === 'auth/user-not-found'){
        toast.error('User not found');
      }
      if(err.code === 'auth/wrong-password'){
        toast.error('Please check the password');
      }
    }
  };

  useEffect(() => {
    if(user){
      navigate('/profile')
    }
  }, []);

  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-md-8 offset-md-2 py-5'>
          <h1>Login</h1>
          <p className='pb-3'>Please fill in the form below to log in</p>

          <form>
            <div className="mb-3">
              <label htmlFor='' className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder='Enter email' required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder='*******' required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-danger px-4" onClick={handleLogin}>Login</button>
          </form>

          <p className='pt-3'>Don't have an account? <Link to='/register' className="red__link-color" >Register Here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login;
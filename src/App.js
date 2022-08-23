import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/user';
import AddBusiness from './pages/AddBusiness';
import Admin from './pages/admin';
import ArticlesPage from './pages/ArticlesPage';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Users from './pages/admin/users/Users';
import PageNotFound from './pages/PageNotFound';
import Blogs from './pages/admin/blogs/Blogs';
import Blog from './pages/admin/blogs/Blog';
import Footer from './components/Footer';
import AddBlog from './pages/user/blog/AddBlog';
import AllBlogs from './pages/user/blog/AllBlogs';
import Update from './pages/user/profile/Update';
import Subscriptions from './pages/admin/subscriptions/Subscriptions';
import AddSubscription from './pages/admin/subscriptions/AddSubscription';
import EditSubscription from './pages/admin/subscriptions/EditSubscription';
import ArticlePage from './pages/ArticlePage';
import MySubscriptions from './pages/user/subscriptions/MySubscriptions';
import AllSubscribers from './pages/admin/subscribers/AllSubscribers';

const App = () => {
  return (
    <div className='main__container'>
      <BrowserRouter>
        <AuthContextProvider>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='articles' element={<ArticlesPage />} />
            <Route path='article/:id' element={<ArticlePage />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            {/* Admin Routes */}
            <Route path='admin'>
              <Route index element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path='users' element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path='blogs' element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
              <Route path='blog/:id' element={<ProtectedRoute><Blog /></ProtectedRoute>} />
              <Route path='subscriptions' element={<ProtectedRoute><Subscriptions /></ProtectedRoute>} />
              <Route path='subscriptions/add' element={<ProtectedRoute><AddSubscription /></ProtectedRoute>} />
              <Route path='subscription/:id' element={<ProtectedRoute><EditSubscription /></ProtectedRoute>} />
              <Route path='subscribers' element={<ProtectedRoute><AllSubscribers /></ProtectedRoute>} />
            </Route>

            <Route path="profile">
              <Route index element={<ProtectedRoute><Account /></ProtectedRoute>} />
              <Route path='update/:id' element={<ProtectedRoute><Update /></ProtectedRoute>} />
              <Route path='subscriptions' element={<ProtectedRoute><MySubscriptions /></ProtectedRoute>} />
            </Route>

            <Route path="blog">
              <Route index element={<ProtectedRoute><AllBlogs /></ProtectedRoute>}/>
              <Route path="add" element={<ProtectedRoute><AddBlog /></ProtectedRoute>}/>
            </Route>

            <Route path='add-business' element={<AddBusiness />} />
            <Route path='reset-password' element={<ResetPassword />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
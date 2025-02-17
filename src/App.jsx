// Desc: Main App component
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home,NotFound ,AllNews, ProductDetails,NewsDetails,StoreLocator,ContactUs, UpdatePost,Registration,About,AllProducts,Dashoboard, Login} from './pages';
import 'tailwindcss/tailwind.css';
import { ProtectedRoutes } from './components';

import { useGetProducts } from './hooks/useGetProducts';

import { useGetCategories } from './hooks/useGetCategories';

function App() {
  


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path='/store' element={<StoreLocator />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/admin/dashboard' element={
          <ProtectedRoutes >
            <Dashoboard />
          </ProtectedRoutes>
        } />
        <Route path='/admin/login' element={<Login/>} />
        <Route path='/admin/registration' element={
          <ProtectedRoutes >
            <Registration />
          </ProtectedRoutes>
        } />
        <Route path='/admin/update-product/:id' element={
          <ProtectedRoutes >
            <UpdatePost />
          </ProtectedRoutes>
        } />
        <Route path='/news' element={<AllNews />} />
        <Route path='/news/:id' element={<NewsDetails />} />
        <Route path='/products/?category_id=:category' element={<AllProducts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );

}
export default App;


  


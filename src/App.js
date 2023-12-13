import React, { useState } from 'react';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './layout/Navbar';
import NavbarAdmin from './layout/NavbarAdmin';

import Home from './user/Home';
import Login from './user/Login';
import Logout from './admin/Logout';

import ViewService from './user/ViewService';
import ViewCategory from './user/ViewCategory';
import AddCategory from './admin/AddCategory';
import AddService from './admin/AddService';
import EditCategory from './admin/EditCategory';
import EditService from './admin/EditService';

import Dashboard from './admin/Dashboard';
import ViewCategoryAdmin from './admin/ViewCategory';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = (username, password) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };


  return (
    <div className="App min-vh-100" data-bs-theme="dark" style={{ backgroundColor: "#212529", color: "#dee2e6" }}>

      <Router>
        {isLoggedIn ? (
          <NavbarAdmin />
        ) : (
          <Navbar />
        )}

        <Routes>

          {isLoggedIn ? (
            <Route exact path="/" element={<Dashboard/>} />
          ) : (
            <Route exact path='/' element={<Home />} />
          )}

          {isLoggedIn ? (
            <Route exact path="/dashboard" element={<Dashboard/>} />
          ) : (
            <Route exact path="/dashboard" element={<Navigate to="/login" />} />
          )}

          {isLoggedIn ? (
            <Route exact path="/addcategory" element={<AddCategory/>} />
          ) : (
            <Route exact path="/addcategory" element={<Navigate to="/login" />} />
          )}

          {isLoggedIn ? (
            <Route exact path="/editcategory/:id" element={<EditCategory/>} />
          ) : (
            <Route exact path="/editcategory/:id" element={<Navigate to="/login" />} />
          )}

          {isLoggedIn ? (
            <Route exact path="/editservice/:id" element={<EditService/>} />
          ) : (
            <Route exact path="/editservice/:id" element={<Navigate to="/login" />} />
          )}

          {isLoggedIn ? (
            <Route exact path="/addservice" element={<AddService/>} />
          ) : (
            <Route exact path="/addservice" element={<Navigate to="/login" />} />
          )}

          <Route exact path='/login' element={<Login onLogin={handleLogin} />} />
          <Route exact path="/logout" element={<Logout onLogout={handleLogout} />} />

          <Route exact path='/service/:id' element={<ViewService />} />

          {isLoggedIn ? (
            <Route exact path='/category/:id' element={<ViewCategoryAdmin />} />
          ) : (
            <Route exact path='/category/:id' element={<ViewCategory />} />
          )}

        </Routes>

      </Router>

    </div>
  );
}

export default App;

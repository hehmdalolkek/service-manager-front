import React, { useState } from 'react';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './layout/Navbar';
import NavbarAdmin from './layout/NavbarAdmin';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import ViewService from './services/ViewService';
import ViewCategory from './categories/ViewCategory';

import Dashboard from './admin/Dashboard';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleLogin = (username, password) => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    setCredentials({ username, password });
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
          
          <Route exact path='/' element={<Home />} />

          {isLoggedIn ? (
            <Route exact path="/dashboard" element={<Dashboard credentials={credentials} />} />
          ) : (
            <Route exact path="/dashboard" element={<Navigate to="/login" />} />
          )}

          <Route exact path='/login' element={<Login onLogin={handleLogin} />} />
          <Route exact path="/logout" element={<Logout onLogout={handleLogout} />} />


          <Route exact path='/service/:id' element={<ViewService />} />
          <Route exact path='/category/:id' element={<ViewCategory />} />


        </Routes>

      </Router>

    </div>
  );
}

export default App;

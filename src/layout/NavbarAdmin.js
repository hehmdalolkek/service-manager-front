import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_BACKEND;

export default function Navbar() {

  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const result = await axios.get(`${apiUrl}/api/categories`);
    setCategories(result.data);
  };

  useEffect(() => {
    loadCategories();
  }, []);


  return (
    <div>
      <nav className="navbar navbar-expand-lg border-body shadow" style={{ backgroundColor: '#702EF8' }}>
        <div className="container">
          <div className='d-flex align-items-center'>
            <Link className="navbar-brand" to='/'>ServiceManager Admin Panel</Link>
          </div>
          <div>
            <Link className="btn btn-outline-light px-4" to='/logout'>Выйти</Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
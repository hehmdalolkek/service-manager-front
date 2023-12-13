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
            <Link className="navbar-brand " to='/'><b>ORWO Expert</b></Link>
            <button className="btn btn-outline-light px-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Категории услуг</button>
          </div>
          <div>
            <Link className="btn btn-outline-light px-4 me-2" to='/dashboard'>Панель администратора</Link>
          </div>
        </div>
      </nav>
      <div className="offcanvas offcanvas-start" data-bs-scroll="false" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Категории услуг</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-group-flush">
            {
              categories.map((category, index) => (
                <li className="list-group-item" key={index}>
                  <Link
                    className="d-block py-2 link-body-emphasis link-offset-2 link-underline-opacity-0"
                    to={`/category/${category.id}`}
                  >
                    {category.title}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
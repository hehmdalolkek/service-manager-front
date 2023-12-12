import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_BACKEND;

export default function ViewCategory() {
  
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    title: ""
  });

  const [services, setServices] = useState([]);

  const { id } = useParams();

  const loadCategory = async () => {
    const result = await axios.get(`${apiUrl}/api/categories/${id}`);
    setCategory(result.data);
  };

  const loadServices = async () => {
    const result = await axios.get(`${apiUrl}/api/categories/${id}/services`);
    setServices(result.data);
  };

  const handleGoBack = () => {
    navigate(-1);
  };


  useEffect(() => {
    loadCategory();
    loadServices();
  }, [id]);


  return (
    <div className='container'>
      <div className='py-5 col-9 mx-auto'>
        <h2 className='mb-5'>{category.title}</h2>
        <div className='row d-flex align-items-stretch'>
          {services.map((service, index) => (
            <div key={index} className='col-4'>
              <Link
                className='d-flex align-items-center justify-content-center btn btn-outline-light shadow mb-4'
                style={{ height: "100px" }}
                to={`/service/${service.id}`}
              >
                {service.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button className='btn btn-outline-light px-5 mb-5' onClick={handleGoBack}>Назад</button>
    </div>
  )
}

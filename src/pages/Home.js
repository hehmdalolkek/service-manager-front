import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_BACKEND;

export default function Home() {

  const [services, setServices] = useState([]);

  const loadServices = async () => {
    const result = await axios.get(`${apiUrl}/api/services`);
    setServices(result.data);
  };

  useEffect(() => {
    loadServices();
  }, []);


  return (
    <div className='container'>
      <div className='py-5 col-9 mx-auto'>
        <h2 className='mb-5'>Наши услуги</h2>
        <div className='row d-flex align-items-stretch'>
          {
            services.map((service, index) => (
              <div key={index} className='col-4'>
                <Link
                  className='d-flex align-items-center justify-content-center btn btn-outline-light shadow mb-4'
                  style={{ height: "100px" }}
                  to={`/service/${service.id}`}
                >
                  {service.title}
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

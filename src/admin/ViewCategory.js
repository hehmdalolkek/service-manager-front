import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_BACKEND;

export default function ViewCategory() {

  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  const [category, setCategory] = useState({});
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

  const deleteService = async (id) => {
    const base64Credentials = btoa(`${username}:${password}`);

    axios
      .delete(`${apiUrl}/api/services/${id}`, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      })
      .then((response) => {
        loadServices();
      })
      .catch((error) => {
        console.log("ошибка удаления");
      });
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
        <div className='row d-flex'>
          {services.map((service, index) => (
            <div key={index} className='col-6'>
              <div className='d-flex mb-4 shadow border rounded bg-dark px-3'>
                <Link
                  className='link-body-emphasis link-offset-2 link-underline-opacity-0 flex-fill d-flex align-items-center justify-content-center'
                  style={{ height: "100px" }}
                  to={`/service/${service.id}`}
                >
                  {service.title}
                </Link>
                <div className='d-flex align-items-center'>
                  <Link className='btn btn-outline-light mx-2' to={`/editservice/${service.id}`}>Изменить</Link>
                  <button className='btn btn-outline-danger' onClick={() => deleteService(service.id)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className='btn btn-outline-light px-5 mb-5' onClick={handleGoBack}>Назад</button>
    </div>
  )
}

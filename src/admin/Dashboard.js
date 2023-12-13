import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_BACKEND;

export default function Dashboard() {

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errorCategory, setErrorCategory] = useState(false);
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  const loadCategories = async () => {
    const result = await axios.get(`${apiUrl}/api/categories`);
    setCategories(result.data);
  };

  const loadServices = async () => {
    const result = await axios.get(`${apiUrl}/api/services`);
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

  const deleteCategory = async (id) => {
    const base64Credentials = btoa(`${username}:${password}`);

    axios
      .delete(`${apiUrl}/api/categories/${id}`, {
        headers: {
          Authorization: `Basic ${base64Credentials}`,
        },
      })
      .then((response) => {
        loadCategories();
      })
      .catch((error) => {
        setErrorCategory(true);
      });
  };

  useEffect(() => {
    loadCategories();
    loadServices();
  }, []);


  return (
    <div className='container'>
      <div className='py-5 col-10 mx-auto'>
        <h1 className='mb-5'>Панель администрирования</h1>

        <div className='border shadow rounded bg-dark py-5 px-4 pb-4 mb-5'>
          <h3 className='mb-4'>Категории</h3>
          <div className='mb-4'>
            <Link className='btn btn-outline-light px-5 py-2' to='/addcategory'>Добавить категорию</Link>
          </div>
          {
            errorCategory &&
            <div className='alert alert-danger' role='alert'>
              Ошибка удаления категории. Категория содержит услуги и не может быть удалена.
            </div>
          }
          <div className='row d-flex'>
            {categories.map((category, index) => (
              <div key={index} className='col-6'>
                <div className='d-flex mb-4 shadow border rounded bg-dark px-3'>
                  <Link
                    className='link-body-emphasis link-offset-2 link-underline-opacity-0 flex-fill d-flex align-items-center justify-content-center'
                    style={{ height: "100px" }}
                    to={`/category/${category.id}`}
                  >
                    {category.title}
                  </Link>
                  <div className='d-flex align-items-center'>
                    <Link className='btn btn-outline-light mx-2' to={`/editcategory/${category.id}`}>Изменить</Link>
                    <button className='btn btn-outline-danger' onClick={() => deleteCategory(category.id)}>Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='border shadow rounded bg-dark py-5 px-4 pb-4 mb-5'>
          <h3 className='mb-4'>Услуги</h3>
          <div className='mb-4'>
            <Link className='btn btn-outline-light px-5 py-2' to='/addservice'>Добавить услугу</Link>
          </div>
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
      </div>
    </div>
  )
}

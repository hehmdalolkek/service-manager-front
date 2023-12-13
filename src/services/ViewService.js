import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_BACKEND;

export default function ViewService() {

  const navigate = useNavigate();

  const [service, setService] = useState({
    title: "",
    description: "",
    category: {
      id: "",
      title: "",
    },
    duration: "",
    price: "",
    change_date: ""
  });

  const { id } = useParams();

  const loadService = async () => {
    const result = await axios.get(`${apiUrl}/api/services/${id}`);
    setService(result.data);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    loadService();
  }, []);


  return (
    <div className='container mt-5'>
      <div className='col-10 mx-auto py-5 mb-5 border shadow rounded'>
        <h2>{service.title}</h2>
        <p className='mt-2'>Категория: <Link className='link-body-emphasis link-underline-opacity-25 link-offset-2' to={`/category/${service.category.id}`}>{service.category.title}</Link></p>
        <p className='col-8 mt-5 mx-auto'>{service.description}</p>
        <h3 className='mt-5'>Стоимость: {service.price.toLocaleString('ru-RU')+'.00'} ₽</h3>
        <p className='mt-2'>Время выполнения в среднем - {service.duration} д.</p>
      </div>
      <button className='btn btn-outline-light px-5 mb-5' onClick={handleGoBack}>Назад</button>
    </div>
  )
}

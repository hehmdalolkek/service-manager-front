import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';



const apiUrl = process.env.REACT_APP_BACKEND;

export default function AddService() {

  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const loadCategories = async () => {
    const result = await axios.get(`${apiUrl}/api/categories`);
    setCategories(result.data);
  };

  const onSubmit = async (data) => {
    data.change_date = "0";
    console.log(data);

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const base64Credentials = btoa(`${username}:${password}`);

    axios
      .post(`${apiUrl}/api/services`, data, {
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
        }
      })
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);


  return (
    <div className='container py-5'>
      <div className='col-8 mb-5 mx-auto p-5 border rounded'>
        <h2 className='mb-5'>Добавить услугу</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating mb-4">
            <input
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              placeholder="Название услуги"
              {...register("title", {
                required: "Введите название услуги",
                minLength: { value: 2, message: "Название услуги должно быть не меньше 2 символов" },
                maxLength: { value: 64, message: "Название услуги должно быть не больше 64 символов" }
              })}
            />
            <label htmlFor="title">Название услуги</label>
            {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>
          <div className="form-floating mb-3">
            <select
              className={`form-select ${errors.category ? "is-invalid" : ""}`}
              aria-label="category"
              name="category"
              id="category"
              {...register("category.id", {
                required: true
              })}
            >
              <option value="">Выберите категорию</option>
              {
                categories.map((category, index) => (
                  <option key={index} value={category.id}>{category.title}</option>
                ))
              }
            </select>
            <label htmlFor="category">Категория</label>
            {errors.category && <span className="invalid-feedback">Выберите категорию</span>}
          </div>
          <div className="form-floating mb-4">
            <textarea
              style={{ minHeight: "200px" }}
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="description"
              placeholder="Описание услуги"
              {...register("description", {
                required: "Введите описание услуги",
                minLength: { value: 2, message: "Описание услуги должно быть не меньше 2 символов" },
                maxLength: { value: 1000, message: "Описание услуги должно быть не больше 1000 символов" }
              })}
            >
            </textarea>
            <label htmlFor="description">Описание услуги</label>
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>
          <div className="form-floating mb-4">
            <input
              type="number"
              className={`form-control ${errors.duration ? "is-invalid" : ""}`}
              id="duration"
              placeholder="Укажите среднее время выполнения услуги"
              {...register("duration", {
                required: "Укажите среднее время выполнения услуги",
                min: { value: 1, message: "Cреднее время выполнения услуги должно быть не меньше 1 дня" }
              })}
            />
            <label htmlFor="duration">Среднее время выполнения услуги - кол-во дней</label>
            {errors.duration && <div className="invalid-feedback">{errors.duration.message}</div>}
          </div>
          <div className="form-floating mb-4">
            <input
              type="number"
              className={`form-control ${errors.price ? "is-invalid" : ""}`}
              id="price"
              placeholder="Стоимость услуги"
              {...register("price", {
                required: "Введите стоимость услуги",
                min: { value: 1, message: "Стоимость услуги должна быть не меньше 1 рубля" }
              })}
            />
            <label htmlFor="price">Стоимость услуги</label>
            {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
          </div>
          <button className='btn btn-outline-light px-4' type='submit'>Сохранить</button>
        </form>
      </div>
      <Link className='btn btn-outline-light px-5' to='/dashboard'>Назад</Link>
    </div>
  )
}

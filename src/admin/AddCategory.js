import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';



const apiUrl = process.env.REACT_APP_BACKEND;

export default function AddCategory() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const base64Credentials = btoa(`${username}:${password}`);

    axios
      .post(`${apiUrl}/api/categories`, data, {
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
        }
      })
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("ошибка добавления");
      });
  };

  return (
    <div className='container py-5'>
      <div className='col-5 mb-5 mx-auto p-5 border rounded'>
        <h2 className='mb-5'>Добавить категорию</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-floating mb-4">
            <input 
              type="text"
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              id="title"
              placeholder="Название категории"
              {...register("title", {
                required: "Введите название категории",
                minLength: { value: 2, message: "Название категории должно быть не меньше 2 символов" },
                maxLength: { value: 32, message: "Название категории должно быть не больше 32 символов" }
              })}
            />
              <label htmlFor="title">Название категории</label>
              {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
          </div>
          <button className='btn btn-outline-light px-4' type='submit'>Сохранить</button>
        </form>
      </div>
      <Link className='btn btn-outline-light px-5' to='/dashboard'>Назад</Link>
    </div>
  )
}

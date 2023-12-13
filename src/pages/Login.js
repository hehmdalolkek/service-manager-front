import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_BACKEND;

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();

    axios.post(`${apiUrl}/api/login`, { username, password })
      .then(response => {
        onLogin(username, password);
        navigate("/dashboard");
      })
      .catch(error => {
        setError(true);
      });
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className='container mt-5'>
      <div className='col-5 mx-auto p-5 border rounded'>
        <h2 className='mb-5'>Авторизация</h2>
        <div
          className='py-3 mb-4'
          style={{
            borderLeft: "4.5px solid rgb(222, 226, 230)",
            backgroundColor: "#ffffff0f"
          }}
        >
          <p className='mb-1'>
            Логин: admin
          </p>
          <p className='mb-1'>
            Пароль: admin
          </p>
        </div>
        <form onSubmit={handleLogin}>
          {
            error &&
            <div className='alert alert-danger' role='alert'>
              Ошибка авторизации. Проверьте введённые данные.
            </div>
          }
          <div className='form-floating mb-3'>
            <input
              className="form-control" id="username"
              type="text"
              placeholder="Логин"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="username">Логин</label>
          </div>
          <div className='form-floating mb-4'>
            <input
              className="form-control" id="password"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Пароль</label>
          </div>
          <button className='btn btn-outline-light px-5' type='submit'>Войти</button>
        </form>
      </div>
    </div>
  );
};
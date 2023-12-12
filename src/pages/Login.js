import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const apiUrl = process.env.REACT_APP_BACKEND;

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();

    axios.post(`${apiUrl}/api/login`, { username, password })
    .then(response => {
      onLogin(username, password);
      navigate("/dashboard");
    })
    .catch(error => {
      console.error(error);
    });
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Вход</h2>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};
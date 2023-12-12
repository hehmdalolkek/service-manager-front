import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ onLogout }) {
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    onLogout();
    navigate("/");
  }, [onLogout, navigate]);

  return (
    <div>
      Logout
    </div>
  );
}
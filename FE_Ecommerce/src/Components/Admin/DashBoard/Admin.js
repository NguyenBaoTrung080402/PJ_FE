import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import "./admin.css";
import Sidebar from '../SideBar/SideBar';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const currentAccount = JSON.parse(localStorage.getItem('current-account'));

    if (!token) {
      navigate('/login');
    } else if (currentAccount && currentAccount.authority.includes("ROLE_ADMIN")) {
      navigate('/admin-page');
    }
  }, [navigate]);

  return (
      <div className='admin'>
        <div className='adminGlass' style={{minHeight: "100vh"}}>
          <Sidebar/>
        </div>
      </div>
  );
}

export default Admin;

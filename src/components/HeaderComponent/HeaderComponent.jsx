import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../../assets/images/logo.png'

const HeaderComponent = () => {
  return (
    <header className="bg-dark text-white py-3 fixed-top">
      <div className="container d-flex align-items-center">
        <img src={logo} alt="Logo" className="me-3" style={{ width: '40px', height: '40px' }} />
        <h1 className="h4 mb-0">To-Do Rem</h1>
      </div>
    </header>
  );
};

export default HeaderComponent;

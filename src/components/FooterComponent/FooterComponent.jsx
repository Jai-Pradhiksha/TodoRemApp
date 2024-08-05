import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto text-center fixed-bottom">
      <div className="container">
        <p className="mb-0">&copy; 2024 My To-Do Rem App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default FooterComponent;

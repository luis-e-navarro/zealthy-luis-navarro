import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const AdminLogin = ({activePage, setActivePage, setAdminLoggedIn}) => {
  const navigate = useNavigate();
  const [ message, setMessage ] = useState('Log in here!');

  const handleSubmit = () => {
    axios.post('/v1/api/admin/login', {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value,
    })
    .then(result => {
      if (result.data.isLogged){
        setAdminLoggedIn(true);
        navigate('/admin/dashboard');
      } else { 
          return setMessage(result.data.message);
      };
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div id='admin-login-container'>
      <Header 
        activePage={activePage} 
        setActivePage={setActivePage}
      />
      <section className='form-tank'>
        <div className='form-container'>
          <h2 className='form-prompt'>{message}</h2>
          <form>
              USERNAME: <input type='text' id='username' name='username' />
              <div className='spacer'/>
              PASSWORD: <input type='password' id='password' name='password' />
              <div className='spacer'/>
            <div className='button' onClick={handleSubmit}>SUBMIT</div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;

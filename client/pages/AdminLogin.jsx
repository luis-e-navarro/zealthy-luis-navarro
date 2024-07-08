import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const AdminLogin = ({activePage, setAdminLoggedIn}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('Log in here!');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = () => {
    axios.post(`/v1/api/admin/login`, {
      username: credentials.username,
      password: credentials.password
    })
    .then(result => {
      if (result.data.isLogged){
        setAdminLoggedIn(true);
        window.localStorage.setItem('ZEALTHY_ADMIN_LOGGED_IN',JSON.stringify(true));
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
      <Header activePage={activePage}/>
      <section className='form-tank'>
        <div className='form-container'>
          <h2 className='form-prompt'>{message}</h2>
          <form>
              USERNAME: <input 
                          type='text' 
                          id='username' 
                          name='username' 
                          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                        />
              <div className='spacer'/>
              PASSWORD: <input 
                          type='password' 
                          id='password' 
                          name='password' 
                          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
              <div className='spacer'/>
            <div className='button' onClick={handleSubmit}>SUBMIT</div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdminLogin;

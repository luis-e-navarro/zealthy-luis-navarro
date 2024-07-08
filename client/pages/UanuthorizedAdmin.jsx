import React from "react";
import Header from '../components/Header';
import { ADMIN } from "../assets/utils";
import { useNavigate } from 'react-router-dom';

const UnauthorizedAdmin = () =>{
  const navigate = useNavigate();
  const handleReRoute = () => {
    navigate('/');
  }
  return (
    <div id='admin-login-container'>
    <Header activePage={ADMIN}/>
    <section className='form-tank'>
      <div className='form-container'>
        <h2 className='form-prompt'>UNAUTHORIZED ADMIN ACCESS</h2>
          <div className='spacer'/>
          <div className='button' onClick={handleReRoute}>RETURN</div>
      </div>
    </section>
  </div>
  );
}

export default UnauthorizedAdmin;
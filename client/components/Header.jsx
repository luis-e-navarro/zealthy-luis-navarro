import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/helpdesk_logo.png';
import { MAIN, ADMIN } from '../assets/utils';

const Header = ({activePage, adminLoggedIn}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if(activePage === MAIN){
      if(adminLoggedIn){
        navigate('/admin/dashboard');
      }else{
        navigate('/admin/login');
      };
    }else if (activePage === ADMIN){
      navigate('/');
    };
  };


  return (
    <div className='header-tank'>
      <div className='header-container-left'>
          <img
            className={
              activePage === ADMIN 
                ? 'logo-admin' 
                : 'logo-main'
            }
            src={logo}
            height='100'
            onClick={
              activePage === ADMIN
                ? handleClick 
                : null
            }
            alt='HelpDesk Logo'
          />
      </div>
      <div className='header-container-right'>
        {
          activePage === MAIN 
            ? <button onClick={handleClick} className='button'> ADMIN </button>
            : null
        }
      </div>
    </div>
  );
};

export default Header;

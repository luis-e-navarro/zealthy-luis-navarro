import React from 'react';
import { useNavigate } from 'react-router-dom';
import GraphIcon from '../assets/GraphIcon.jsx';
import logo from '../assets/helpdesk_logo.png';
import Logout from '../assets/Logout.jsx';
import { NEW, IN_PROGRESS, RESOLVED, MAIN } from '../assets/utils.js';

const Sidebar = ({activeMetric, setActiveMetric, setAdminLoggedIn, setClickedItem, setTicketItems}) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate('/');
  };

  const handleMetricClick = (metric) =>{
    if(activeMetric !== metric){
      window.localStorage.setItem('ZEALTHY_ACTIVE_METRIC', JSON.stringify(metric));
      setTicketItems([]);
      setActiveMetric(metric);
      setClickedItem(null);      
    }
  };
  
  const logout = () =>{
    window.localStorage.setItem('ZEALTHY_ADMIN_LOGGED_IN', JSON.stringify(false));
    setAdminLoggedIn(false);
    handleImageClick();
  }

  return (
    <div id='sidebar-tank'>
      <div id='top-sidebar'>
        <img
          className='logo-sidebar' 
          src={logo}
          height='70'
          onClick={handleImageClick}
          alt='HelpDesk Logo'
        />
        <div className='spacer' />
        <div id='sidebar-title'>DASHBOARD</div>
      </div>
      <div id='middle-sidebar'>
        <div
          className={
            activeMetric === NEW
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={() => {handleMetricClick(NEW)}}
        >
          <div className='sidebar-icon'>
            <GraphIcon />
          </div>
          <div className='sidebar-title'>
            NEW
          </div>
        </div>
        <div
          className={
            activeMetric === IN_PROGRESS
              ? 'sidebar-button active-button'
              : 'sidebar-button'
          }
          onClick={() => {handleMetricClick(IN_PROGRESS)}}
        >
          <div className='sidebar-icon'>
            <GraphIcon />
          </div>
          <div className='sidebar-title'>
            IN PROGRESS
          </div>
        </div>
        <div
          className={
            activeMetric === RESOLVED
            ? 'sidebar-button active-button'
            : 'sidebar-button'
          }
          onClick={() => {handleMetricClick(RESOLVED)}}
        >
          <div className='sidebar-icon'>
              <GraphIcon />
          </div>
          <div className='sidebar-title'>
            RESOLVED
          </div>
        </div>
    </div>
      <div id='bottom-sidebar'>
        <div onClick={logout} className='logout-button'>
          <div className='sidebar-icon'>
            <Logout/>
          </div>
          <div className='sidebar-title'>
            LOGOUT
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

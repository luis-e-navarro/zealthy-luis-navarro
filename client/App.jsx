import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Main from './pages/Main';
import './styles/app.scss';
import { MAIN } from './assets/utils';

const App = () => {
  const [activePage, setActivePage] = useState(MAIN);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Main 
            activePage={activePage} 
            setActivePage={setActivePage}
            adminLoggedIn={adminLoggedIn}
          />
        } 
        />
        <Route path="/admin/login" element={
          <AdminLogin 
            activePage={activePage} 
            setActivePage={setActivePage}
            setAdminLoggedIn={setAdminLoggedIn}
          />
        }
        />
        <Route path='/admin/dashboard' element={
          <AdminDashboard 
            activePage={activePage} 
            setActivePage={setActivePage}
            setAdminLoggedIn={setAdminLoggedIn}
          />
        }
        />
      </Routes>
    </Router>
  );
};

export default App;
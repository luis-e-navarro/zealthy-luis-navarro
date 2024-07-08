import React, { useState } from 'react';
import { HashRouter, Route, Routes, Navigate} from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Main from './pages/Main';
import './styles/app.scss';
import { MAIN, ADMIN } from './assets/utils';

const App = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={
            <Main 
              activePage={MAIN} 
              adminLoggedIn={adminLoggedIn}
            />
          } 
        />
        <Route 
          path="/admin/login" element={
            adminLoggedIn ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <AdminLogin 
                activePage={ADMIN} 
                setAdminLoggedIn={setAdminLoggedIn}
              />
            )
          } 
        />
        <Route path="/admin/dashboard" element={
            <AdminDashboard 
            activePage={ADMIN} 
            adminLoggedIn={adminLoggedIn}
            setAdminLoggedIn={setAdminLoggedIn}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
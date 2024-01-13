import React from 'react';
import { Route, Routes, Navigate, BrowserRouter as Router } from 'react-router-dom';
import './styles/App.style.css';

import { useSelector } from "react-redux";

import SideBar from './Components/SideNavBar/SideBar';
import Dashboard from './Screens/Dashboard/Dashboard';
import Pets from './Screens/Pets/Pets';
import Adoption from './Screens/Adoption/Adoption';
import Request from './Screens/Request/Request';
import Tracking from './Screens/Tracking/Tracking';
import ProfileSetting from './Screens/ProfileSetting/ProfileSetting';
import Surrender from './Screens/Surrender/Surrender';
import AdoptRequest from './Screens/AdoptResquest/AdoptRequest';
import Login from './Screens/Login/Login';
import Users from './Screens/Users/User'

function App() {
  // Assuming state.admin is structured like { admin: true/false }

  const { admin } = useSelector((state) => state.admin);

  return (
    <Router>
      {/* SideBar is outside Routes */}
      {admin && <SideBar />}

      {/* Main Routes */}
      <Routes>
        <Route
          path="/Login"
          element={
            <>
              {!admin && <Login />}
              {admin && <Navigate to="/" />}
            </>
          }
        />
        {/* Dashboard route */}
        <Route
          path="/"
          element={
            <>
              {!admin && <Navigate to="/Login" />}
              {admin && <Dashboard />}
            </>
          }
        />
        <Route
          path="/Users"
          element={
            <>
              {admin && <Users />}
              {!admin && <Navigate to="/Login" />}
            </>
          }
        />

        {/* Other routes */}
        <Route
          path="/Pets"
          element={
            <>
              {admin && <Pets />}
              {!admin && <Navigate to="/Login" />}
            </>
          }
        />
        <Route
          path="/Adoption"
          element={
            <>
              {admin && <Adoption />}
              {!admin && <Navigate to="/Login" />}
            </>
          }
        />
        <Route
          path="/Request"
          element={
            <>
              {admin && <Request />}
              {!admin && <Navigate to="/Login" />}
            </>
          }
        />
        <Route
          path="/Tracking"
          element={
            <>
              {admin && <Tracking />}
              {!admin && <Navigate to="/Login" />}
            </>
          }
        />
        <Route
          path="/ProfileSetting"
          element={
            <>
              {admin && <ProfileSetting />}
              {!admin && <Navigate to="/Login" />}
            </>
          }
        />
        <Route
          path="/Surrender"
          element={
            <>
              {admin && <Surrender />}
              {!admin && <Navigate to="/Login" />}
            </>
          }
        />
        <Route
          path="/AdoptRequest"
          element={
            <>
              {admin && <AdoptRequest />}
              {!admin && <Navigate to="/Login" />}
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

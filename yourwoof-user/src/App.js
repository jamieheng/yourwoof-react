import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import WelcomePage from './components/WelcomePage';
import LandingPage from './components/mainpage/LandingPage';
import Home from './components/mainpage/Home';
import AboutUs from './components/mainpage/AboutUs';
import ContactUs from './components/mainpage/ContactUs';
import { NavigateBar } from './components/mainpage/NavigateBar';
import { SurrenderForm } from './components/mainpage/SurrenderForm';
import { AdoptForm } from './components/mainpage/AdoptForm';
import PetList from './components/mainpage/PetList';
import Tracking from './components/mainpage/Tracking';
import Footer from './components/mainpage/Footer';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <Router>
      <Routes>
        <Route
          path='/Login'
          element={
            <>
              {!user && <Login />}
              {user && <Navigate to='/' />}
            </>
          }
        />
        <Route
          path='/WelcomePage'
          element={
            <>
              {!user && <WelcomePage />}
              {user && <Navigate to='/' />}
            </>
          }
        />
      </Routes>

      <NavigateBar />

      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              {!user && <Navigate to='/Login' />}
              {user && <Home />}
            </>
          }
        />
        <Route
          path='/LandingPage'
          element={
            <>
              {user && <LandingPage />}
              {!user && <Navigate to='/Login' />}
            </>
          }
        />
        <Route
          path='/AboutUs'
          element={
            <>
              {user && <AboutUs />}
              {!user && <Navigate to='/Login' />}
            </>
          }
        />
        <Route
          path='/ContactUs'
          element={
            <>
              {user && <ContactUs />}
              {!user && <Navigate to='/Login' />}
            </>
          }
        />
        <Route
          path='/SurrenderForm'
          element={
            <>
              {user && <SurrenderForm />}
              {!user && <Navigate to='/Login' />}
            </>
          }
        />
        <Route
          path='/AdoptForm'
          element={
            <>
              {user && <AdoptForm />}
              {!user && <Navigate to='/Login' />}
            </>
          }
        />
        <Route
          path='/PetList'
          element={
            <>
              {user && <PetList />}
              {!user && <Navigate to='/Login' />}
            </>
          }
        />
        <Route
          path='/Tracking'
          element={
            <>
              {user && <Tracking />}
              {!user && <Navigate to='/Login' />}
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

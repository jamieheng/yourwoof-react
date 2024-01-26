import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import { Link } from 'react-router-dom';
import './Login';

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { authentication } from '../features/auth/authSlice';

const WelcomePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    handleSubmitFunc();
  };

  const dispatch = useDispatch();
  const handleSubmitFunc = async () => {
    try {
      const response = await axios.post('https://yourwoof-server.onrender.com/userRequest', {
        firstName,
        lastName,
        userName,
        email,
        password,
        phoneNumber,
      });

      dispatch(authentication(response.data));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='bg-container flex flex-col justify-start lg:flex-row lg:justify-center h-screen w-screen font-raleway'>
      <div
        className='welcome-image bg-blue-dark w-full lg:w-1/2 h-64 lg:h-full'
        style={{
          backgroundImage: `url(../images/dogbg.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backdropFilter: 'blur(5px)',
        }}
      >
        <div className='logo-header flex flex-col justify-start items-center mt-4'>
          <div className='welcome-logo flex flex-row items-start'>
            <h1 className='hidden lg:block welcome-title font-raleway color-purple text-2xl md:text-4xl text-white lg:mt-24 lg:ml-24'>
              Welcome to
            </h1>
            <img src='../images/logo.svg' alt='logo' className='dog-logo w-40 h-30 md:w-60 md:h-45 lg:mt-12' />
          </div>
        </div>
      </div>

      <div className='register-form flex flex-col justify-center items-center w-full lg:w-1/2'>
        <div className='mb-6'>
          <p className='text-2xl font-bold m-4'>Sign Up</p>
          <p>Adopt a pet right now!</p>
        </div>

        <form onSubmit={onHandleSubmit}>
          <div className='flex flex-row justify-center items-center'>
            <div className='m-1'>
              <div className='form-group w-full'>
                <label>First Name</label>
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                  name='firstName'
                  type='text'
                  required
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  name='email'
                  type='text'
                  required
                  className='form-control'
                />
              </div>

              <div className='form-group'>
                <label>Username</label>

                <input
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  name='userName'
                  type='text'
                  value={userName}
                  required
                  className='form-control'
                />
              </div>
            </div>

            <div className='m-1'>
              <div className='form-group'>
                <label>Last Name</label>
                <input
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                  name='lastName'
                  type='text'
                  required
                  className='form-control'
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <div className='relative'>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    required
                    className='form-control'
                  />
                  <button
                    type='button'
                    className='absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-300 px-2 py-1 text-sm rounded'
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div className='form-group'>
                <label>Phone Number</label>
                <input
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  value={phoneNumber}
                  required
                  name='phoneNumber'
                  type='text'
                  className='form-control'
                />
              </div>
            </div>
          </div>

          <div className='form-group'>
            <button
              type='submit'
              className='btn btn-primary bg-lavender font-raleway hover:bg-darkpurple transform hover:-translate-y-2 transition-transform duration-300 px-8 py-3 text-lg rounded-lg'
            >
              Register
            </button>
          </div>
        </form>

        <div className='login-choice flex flex-col justify-center items-center w-full lg:w-1/2'>
          <p>Already have an account?</p>
          <Link to='/Login' className='flex items-center text-lavender hover:text-darkpurple font-bold'>
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;

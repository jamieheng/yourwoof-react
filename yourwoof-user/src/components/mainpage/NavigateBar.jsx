import React, { useState, useEffect } from 'react';
import { Navbar, MobileNav, Typography, Button, IconButton } from '@material-tailwind/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../features/auth/authSlice';
import axios from 'axios';

export function NavigateBar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isPetListPage = location.pathname === '/PetList';
  const isAboutUsPage = location.pathname === '/AboutUs';
  const isContactUsPage = location.pathname === '/ContactUs';
  const isTrackingPage = location.pathname === '/Tracking';

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 1280 && setOpenNav(false));
  }, []);

  const onLogOut = () => {
    dispatch(logOut());
  };

  

  const [tracking, setTracking] = useState([]);
  useEffect(() => {
    axios
      .get('https://yourwoof-server.onrender.com/tracking')
      .then((response) => {
        setTracking(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const isUserEmailExisted = (email) => {
    return tracking.some((tracking) => tracking.email.toLowerCase() === email.toLowerCase());
  };

  const [isVerified, setIsVerified] = useState(false);

  const checkIfUserEmailExists = () => {
    // Check if 'user' is not null before accessing its properties
    if (user && user.email) {
      const userEmail = user.email;
      const isExisted = isUserEmailExisted(userEmail);

      if (isExisted) {
        console.log('User email already exists.');
        setIsVerified(true);
      } else {
        console.log('User email does not exist.');
        setIsVerified(false);
      }
    } else {
      console.log('User is not logged in.');
      // Handle the case when the user is not logged in
    }
  };

  useEffect(() => {
    checkIfUserEmailExists();
  }, [tracking, user]);

  const navList = (
    <ul className='flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center'>
      <div className='flex p-4 flex-row items-center justify-center lg:hidden'>
        {user && (
          <p className='text-darkpurple mr-3 font-raleway'>
            <span className='font-bold'>Welcome,</span> {user.firstName} {user.lastName}
          </p>
        )}
        {user && (
          <Button
            className='hover:text-darkpurple hidden lg:block'
            variant='filled'
            size='sm'
            style={{ backgroundColor: '#BF94E4' }}
            onClick={onLogOut}
          >
            Log Out
          </Button>
        )}

        {!user && (
          <Button
            variant='filled'
            size='sm'
            className='hover:text-darkpurple hidden lg:block'
            style={{ backgroundColor: '#BF94E4' }}
          >
            <Link to='/' className='flex items-center '>
              Sign in
            </Link>
          </Button>
        )}
      </div>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isHomePage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
        </div>

        <Link to='/' className='flex items-center ml-2'>
          HOME
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isPetListPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
          <svg
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            viewBox='0 0 24 24'
            class='w-6 h-6'
          >
            <path d='M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75z' />
            <path d='M4.42 11.247A13.152 13.152 0 004 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0112 5c.78 0 1.5.108 2.161.306' />
          </svg>
        </div>

        <Link to='/PetList' className='flex items-center ml-2 '>
          ADOPT
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isAboutUsPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
            />
          </svg>
        </div>

        <Link to='/AboutUs' className='flex items-center ml-2 '>
          ABOUT US
        </Link>
      </Typography>

      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
          isContactUsPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
        }`}
      >
        <div className='hidden lg:block'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-6 h-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
            />
          </svg>
        </div>

        <Link to='/ContactUs' className='flex items-center ml-2 '>
          CONTACT US
        </Link>
      </Typography>

      <div className={`${isVerified ? 'block' : 'hidden'}`}>
        <Typography
          as='li'
          variant='small'
          color='blue-gray'
          className={`flex flex-row justify-between items-center p-4 font-medium hover:text-lavender lg:hover:text-white lg:hover:bg-lavender lg:hover:rounded-lg lg:mr-2 ${
            isTrackingPage ? 'lg:bg-lavender text-lavender lg:text-white rounded-lg' : ''
          }`}
        >
          <div className={`hidden lg:block `}>
            <svg viewBox='0 0 512 512' fill='none' stroke='currentColor' stroke-width='30' height='1.5em' width='1.5em'>
              <path d='M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5.3-86.2 32.6-96.8 70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3-14.4-70.1 10.1-84.1 59.7.9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5v1.6c0 25.8-20.9 46.7-46.7 46.7-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2-25.8 0-46.7-20.9-46.7-46.7v-1.6c0-10.4 1.6-20.8 5.2-30.5zm352.6-118.5c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3 29.1 51.7 10.2 84.1-54 47.3-78.5 33.3zm-111.7-93c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5 46.9 53.9 32.6 96.8-52.1 69.1-84.4 58.5z' />
            </svg>
          </div>

          <Link to='/Tracking' className='flex items-center ml-2 '>
            TRACKING
          </Link>
        </Typography>

        {/* mobile login */}
      </div>
      <div className='p-4  lg:hidden'>
        {user && (
          <Button
            className='hover:text-darkpurple '
            variant='filled'
            size='sm'
            style={{ backgroundColor: '#BF94E4' }}
            onClick={onLogOut}
          >
            Log Out
          </Button>
        )}

        {!user && (
          <Button variant='filled' size='sm' className='hover:text-darkpurple ' style={{ backgroundColor: '#BF94E4' }}>
            <Link to='/' className='flex items-center '>
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </ul>
  );

  return user ? (
    <Navbar className='fixed top-0 bg-white z-40 w-screen h-auto' style={{ maxWidth: '100%' }}>
      <div
        style={{ maxWidth: '100%' }}
        className='w-full container p-2 flex flex-row items-center justify-between text-blue-gray-900'
      >
        <div>
          <img src='../images/logo.svg' alt='logo' className='dog-logo w-40 h-30' />
        </div>

        <IconButton
          variant='text'
          className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              className='h-6 w-6'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          ) : (
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' stroke='currentColor' strokeWidth={2}>
              <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          )}
        </IconButton>

        <div className='hidden lg:block'>{navList}</div>

        <div className='flex flex-row items-center justify-center ml-auto hidden lg:block '>
          <div className='flex flex-row items-center justify-center'>
            {user && (
              <p className='text-darkpurple mr-3 font-raleway'>
                <span className='font-bold'>Welcome,</span> {user.firstName} {user.lastName}
              </p>
            )}
            {user && (
              <Button
                className='hover:text-darkpurple hidden lg:block'
                variant='filled'
                size='sm'
                style={{ backgroundColor: '#BF94E4' }}
                onClick={onLogOut}
              >
                Log Out
              </Button>
            )}

            {!user && (
              <Button
                variant='filled'
                size='sm'
                className='hover:text-darkpurple hidden lg:block'
                style={{ backgroundColor: '#BF94E4' }}
              >
                <Link to='/' className='flex items-center '>
                  Sign in
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <MobileNav open={openNav} className=''>
        <div className='container mx-auto'>{navList}</div>
      </MobileNav>
    </Navbar>
  ) : null;
}

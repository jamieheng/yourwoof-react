import React, { useState, useEffect } from 'react';
import { Typography } from '@material-tailwind/react';
import BarLoader from "react-spinners/BarLoader";
import Footer from './Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { storage } from '../../config/firebase';

export default function Tracking() {
  const { user } = useSelector((state) => state.user);

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


  const [adoptions, setAdoptions] = useState([]);
  useEffect(() => {
    axios
      .get('https://yourwoof-server.onrender.com/adoption')
      .then((response) => {
        setAdoptions(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const [isVerified, setIsVerified] = useState(false);

  const isUserEmailExisted = (email) => {
    return tracking.some((tracking) => tracking.email.toLowerCase() === email.toLowerCase());
  };

  const checkIfUserEmailExists = () => {
    // Check if 'user' is not null before accessing its properties
    if (user && user.email) {
      const userEmail = user.email;
      const isExisted = isUserEmailExisted(userEmail);

      if (isExisted) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    } else {
      setIsVerified(false);
      
    }
  };

  useEffect(() => {
    checkIfUserEmailExists();
  }, [tracking, user]);

  

  const [isPending1, setIsPending1] = useState(false);
  const [isPending2, setIsPending2] = useState(false);
  const [isPending3, setIsPending3] = useState(false);
  const [isPending4, setIsPending4] = useState(false);

  const updateWeek2Tracking = () => {
   
    const userTracking = tracking.find((tracking) => tracking.email.toLowerCase() === user.email.toLowerCase());

    if (userTracking) {
      const updatedWeek2Tracking = {
        userImage: 'https://via.placeholder.com/150',
        username: user.firstName,
        email: user.email,
        petImage: userTracking.petImage,
        petName: userTracking.petName,
        phoneNumber: user.phoneNumber,
        week1: userTracking.week1,
        week2: week2Image,
        week3: '',
        week4: '',
      };

      axios
        .put(`https://yourwoof-server.onrender.com/tracking/${userTracking.email}`, updatedWeek2Tracking)
        .then((response) => {
          setTracking((prevTracking) => {
            const updatedTracking = prevTracking.map((item) => (item.email === userTracking.email ? response.data : item));
            return updatedTracking;
          });
          console.log('Week 2 tracking updated successfully');
          console.log(updatedWeek2Tracking);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.error('User adoption data not found.');
    }
  };

  const onSubmitWeek2 = (e) => {
    e.preventDefault();
    updateWeek2Tracking();
    setWeek2Clicked(true);
  };

  const [week2Image, setWeek2Image] = useState('');

  const onHandleWeek2 = async (e) => {
    const file = e.target.files[0];

    try {
      const date = new Date();
      const imagePath = storage.ref(`/images/${file.name}-${date.getTime().toString()}-${Math.random()}`);
      setIsPending2(true); 
      await imagePath.put(file);
      const getUrl = await imagePath.getDownloadURL();
      setWeek2Image(getUrl);
      setIsPending2(false)
      console.log(getUrl);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
  };

  const updateWeek3Tracking = () => {
    const userTracking = tracking.find((tracking) => tracking.email.toLowerCase() === user.email.toLowerCase());

    if (userTracking) {
      const updatedWeek2Tracking = {
        userImage: 'https://via.placeholder.com/150',
        userUsername: user.firstName,
        email: user.email,
        petImage: userTracking.petImage,
        petName: userTracking.petName,
        phoneNumber: user.phoneNumber,
        week1: userTracking.week1,
        week2: userTracking.week2,
        week3: week3Image,
        week4: '',
      };

      axios
        .put(`https://yourwoof-server.onrender.com/tracking/${userTracking.email}`, updatedWeek2Tracking)
        .then((response) => {
          setTracking((prevTracking) => {
            const updatedTracking = prevTracking.map((item) => (item.email === userTracking.email ? response.data : item));
            return updatedTracking;
          });
          console.log('Week 2 tracking updated successfully');
        })
        .catch((error) => {
          console.log(userTracking.email);
          console.error(error);
        });
    } else {
      console.error('User adoption data not found.');
    }
  };

  const onSubmitWeek3 = (e) => {
    e.preventDefault();
    updateWeek3Tracking();
    setWeek3Clicked(true);
  };

  const [week3Image, setWeek3Image] = useState('');

  const onHandleWeek3 = async (e) => {
    const file = e.target.files[0];

    try {
      const date = new Date();
      const imagePath = storage.ref(`/images/${file.name}-${date.getTime().toString()}-${Math.random()}`);
      setIsPending3(true); 
      await imagePath.put(file);
      const getUrl = await imagePath.getDownloadURL();
      setWeek3Image(getUrl);
      setIsPending3(false); 
      console.log(getUrl);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
  };

  const updateWeek4Tracking = () => {
    const userTracking = tracking.find((tracking) => tracking.email.toLowerCase() === user.email.toLowerCase());

    if (userTracking) {
      const updatedWeek2Tracking = {
        userImage: 'https://via.placeholder.com/150',
        username: user.firstName,
        email: user.email,
        petImage: userTracking.petImage,
        petName: userTracking.petName,
        phoneNumber: user.phoneNumber,
        week1: userTracking.week1,
        week2: userTracking.week2,
        week3: userTracking.week3,
        week4: week4Image,
      };

      axios
        .put(`https://yourwoof-server.onrender.com/tracking/${userTracking.email}`, updatedWeek2Tracking)
        .then((response) => {
          setTracking((prevTracking) => {
            const updatedTracking = prevTracking.map((item) => (item.email === userTracking.email ? response.data : item));
            return updatedTracking;
          });
          console.log('Week 2 tracking updated successfully');
        })
        .catch((error) => {
          console.log(userTracking.email);
          console.error(error);
        });
    } else {
      console.error('User adoption data not found.');
    }
  };

  const onSubmitWeek4 = (e) => {
    e.preventDefault();
    updateWeek4Tracking();
    setWeek4Clicked(true);
  };

  const [week4Image, setWeek4Image] = useState('');

  const onHandleWeek4 = async (e) => {
    const file = e.target.files[0];

    try {
      const date = new Date();
      const imagePath = storage.ref(`/images/${file.name}-${date.getTime().toString()}-${Math.random()}`);
      setIsPending4(true); 
      await imagePath.put(file);
      const getUrl = await imagePath.getDownloadURL();
      setWeek4Image(getUrl);
      setIsPending4(false); 
      console.log(getUrl);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
  };



  const onSubmitWeek1 = (e) => {
    e.preventDefault();
    addTracking();
   
  };
  const addTracking = () => {
    
    const userTracking = tracking.find((tracking) => tracking.email.toLowerCase() === user.email.toLowerCase());

    if (userTracking) {
      const updatedWeek1Tracking = {
        userImage: 'https://via.placeholder.com/150',
        username: user.firstName,
        email: user.email,
        petImage: userTracking.petImage,
        petName: userTracking.petName,
        phoneNumber: user.phoneNumber,
        week1: week1Image,
        week2: '',
        week3: '',
        week4: '',
      };

      
      axios
        .put(`https://yourwoof-server.onrender.com/tracking/${userTracking.email}`, updatedWeek1Tracking)
        .then((response) => {
          setTracking((prevTracking) => {
            const updatedTracking = prevTracking.map((item) => (item.email === userTracking.email ? response.data : item));
            return updatedTracking;
          });

          console.log('Week 1 tracking updated successfully');
        })
        .catch((error) => {
          console.log(userTracking.email);
          console.error(error);
        });
    } else {
      console.error('User adoption data not found.');
    }
  };



  const [week1Image, setWeek1Image] = useState('');
  const onHandleWeek1 = async (e) => {
    const file = e.target.files[0];

    try {
      const date = new Date();
      const imagePath = storage.ref(`/images/${file.name}-${date.getTime().toString()}-${Math.random()}`);
      setIsPending1(true);
      await imagePath.put(file);
      const getUrl = await imagePath.getDownloadURL();
      setWeek1Image(getUrl);

      setIsPending1(false);
      console.log(getUrl);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
    
  };

  
  const [week1Clicked, setWeek1Clicked] = useState(false);
  const [week2Clicked, setWeek2Clicked] = useState(false);
  const [week3Clicked, setWeek3Clicked] = useState(false);
  const [week4Clicked, setWeek4Clicked] = useState(false);

  

  const globalUserTracking = tracking.find((tracking) => tracking.email.toLowerCase() === user.email.toLowerCase());
  

  // useEffect(() => {
   
  
  // }, [globalUserTracking]);


  

  return (
    <div className='font-raleway'>
      <div className='relative mt-24'>
        <div className='absolute h-full w-full bg-black opacity-75'></div>
        <img
          className='h-full w-full object-cover object-center bg-black opacity-50'
          src='../images/trackingdog.jpg'
          alt='Tracking dog'
        />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center p-4'>
          <h1 className='text-4xl sm:text-6xl font-bold max-w-screen-md'>KEEP TRACK OF YOUR PET</h1>
          <p className='text-xl'>inform the well-being your pets</p>
        </div>
      </div>

      <p className='p-6 mt-4 text-3xl font-bold text-center'>WHY IS IT NECESSARY?</p>
      <Typography
        variant='lead'
        className=' w-3/4 text-center mx-auto justify-center pb-8 font-raleway'
        style={{ letterSpacing: '1.5px' }}
      >
        By periodically submitting images of your adopted pet, you contribute significantly to our efforts in monitoring and
        ensuring the well-being of your pet subsequent to its adoption from our shelter. This practice is instrumental in
        guaranteeing the safety and security of the animals, ensuring they find themselves in suitable and caring homes.
      </Typography>

      <div className='form-wrapper flex flex-col lg:flex-row justify-center items-center p-4'>

        <form action='' className='w-96 font-raleway p-4 flex flex-col justify-center items-center'>
        {globalUserTracking && globalUserTracking.week1 && (
          <>
            <img src={globalUserTracking.week1 ?? ""} alt="" className='w-64 h-64'/>
            <div className=' text-blue-dark p-2 w-full text-center text-bold'> Week 1 Image Uploaded</div>
          </>
            
          )}
          {globalUserTracking && !globalUserTracking.week1 && (
            <div className='text-blue-dark p-2 w-full text-center'>
              <p className='mb-2 font-bold'>Week 1</p>

              <div className='w-full flex flex-row justify-center items-center'>
                <input
                  type='file'
                  onChange={(e) => onHandleWeek1(e)}
                  className='w-full p-2 items-center border-sm outline-none border border-lavender rounded-lg focus:bg-lavender focus:text-white hover:bg-blue-dark hover:text-white'
                />
                <button
                  onClick={onSubmitWeek1}
                  className='w-16 border border-lavender hover:bg-lavender p-2 rounded-lg hover:text-grey ml-2'
                >
                  <CloudUploadIcon />
                </button>
              </div>
              {isPending1 && <div className='m-2 text-center'><BarLoader color="#232b38" /></div>  } 
            </div>
          )}
        </form>

        <form action='' className='w-96 font-raleway p-4 flex flex-col justify-center items-center'>

        {globalUserTracking && globalUserTracking.week2 && (
           <>
            <img src={globalUserTracking.week2 ?? ""} alt="" className='w-64 h-64' />
            <div className=' text-blue-dark p-2 w-full text-center text-bold'> Week 2 Image Uploaded</div>
          </>)}
           
          {globalUserTracking && globalUserTracking.week1 && !globalUserTracking?.week2 && (
            <div className='text-blue-dark p-2 w-full text-center'>
            <p className='mb-2 font-bold'>Week 2</p>
            <div className='w-full flex flex-row justify-center items-center'>
              <input
                type='file'
                onChange={(e) => onHandleWeek2(e)}
                className='w-full p-2 items-center border-sm outline-none border border-lavender rounded-lg focus:bg-lavender focus:text-white hover:bg-blue-dark hover:text-white'
              />
              <button
                onClick={onSubmitWeek2}
                className='w-16 border border-lavender hover:bg-lavender p-2 rounded-lg hover:text-grey ml-2'
              >
                <CloudUploadIcon />
              </button>
              
            </div>
            {isPending2 && <div className='m-2 text-center'><BarLoader color="#232b38" /></div>  } 
          </div>
          )}

        
            
          
        </form>

        <form action='' className='w-96 font-raleway p-4 flex flex-col justify-center items-center'>
          {globalUserTracking && globalUserTracking.week3 && (
            <>
            <img src={globalUserTracking.week3 ?? ""} alt="" className='w-64 h-64'/>
            <div className=' text-blue-dark p-2 w-full text-center text-bold'> Week 3 Image Uploaded</div>
          </>
          ) }

          {globalUserTracking && globalUserTracking.week1 && globalUserTracking.week2 && !globalUserTracking?.week3 && (
            <div className='text-blue-dark p-2 w-full text-center'>
              <p className='mb-2 font-bold'>Week 3</p>
              <div className='w-full flex flex-row justify-center items-center'>
                <input
                  type='file'
                  onChange={(e) => onHandleWeek3(e)}
                  className='w-full p-2 items-center border-sm outline-none border border-lavender rounded-lg focus:bg-lavender focus:text-white hover:bg-blue-dark hover:text-white'
                />
                <button
                  onClick={onSubmitWeek3}
                  className='w-16 border border-lavender hover:bg-lavender p-2 rounded-lg hover:text-grey ml-2'
                >
                  <CloudUploadIcon />
                </button>
                
              </div>
              {isPending3 && <div className='m-2 text-center'><BarLoader color="#232b38" /></div>  } 
            </div>
          )}
        </form>

        <form action='' className='w-96 font-raleway p-4 flex flex-col justify-center items-center'>
        {globalUserTracking && globalUserTracking.week4 && (
            <>
            <img src={globalUserTracking.week4 ?? ""} alt="" className='w-64 h-64'/>
            <div className=' text-blue-dark p-2 w-full text-center text-bold'> Week 4 Image Uploaded</div>
          </>
          ) }
          {globalUserTracking && globalUserTracking.week1 && globalUserTracking.week2 && globalUserTracking.week3 && !globalUserTracking.week4 && (
            <div className='text-blue-dark p-2 w-full text-center'>
              <p className='mb-2 font-bold'>Week 4</p>
              <div className='w-full flex flex-row justify-center items-center'>
                <input
                  type='file'
                  onChange={(e) => onHandleWeek4(e)}
                  className='w-full p-2 items-center border-sm outline-none border border-lavender rounded-lg focus:bg-lavender focus:text-white hover:bg-blue-dark hover:text-white'
                />
                <button
                  onClick={onSubmitWeek4}
                  className='w-16 border border-lavender hover:bg-lavender p-2 rounded-lg hover:text-grey ml-2'
                >
                  <CloudUploadIcon />
                </button>
                
              </div>
              {isPending4 && <div className='m-2 text-center'><BarLoader color="#232b38" /></div>  } 
            </div>
          )}
        </form>

      </div>

      <div className='relative m-4 w-full h-full'>
        <img
          className='h-full w-full object-cover object-center overflow-x-hidden'
          src='../images/catbg.jpg'
          alt='Tracking Cat BG'
        />

        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center  w-full p-4'>
          <h1 className='text-6xl font-bold'>CARE FOR YOUR PETS LIKE FAMILY</h1>
        </div>
      </div>

      {/* footer */}

      <Footer />
    </div>
  );
}

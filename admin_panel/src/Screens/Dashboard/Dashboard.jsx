import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Styles/Dashboard.style.css'
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import { useSelector } from 'react-redux';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';


import { NavLink } from 'react-router-dom';


const Dashboard = () => {

   const [pets, setPets] = useState([]);
      useEffect(() => {
      axios.get('http://localhost:3001/pet')
         .then(response => {
            setPets(response.data);
         })
         .catch(error => {
            console.error(error);
         });
      }, []);

   const countMalePets = pets.filter(pet => pet.gender === 'Male').length;
   const countFemalePets = pets.filter(pet => pet.gender === 'Female').length;

   const [adoptions, setAdoptions] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:3001/adoption')
        .then(response => {
          setAdoptions(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

   const adoptCount = adoptions.length;


   const [users, setUsers] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:3001/user')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

   const userCount = users.length;

   const [userRequest, setUserRequest] = useState([]);
      useEffect(() => {
         axios.get('http://localhost:3001/userRequest')
            .then(response => {
            setUserRequest(response.data);
            })
            .catch(error => {
            console.error(error);
            });
      }, []);

   const userRequestCount = userRequest.length;

   const [admins, setAdmins] = useState([]);
      useEffect(() => {
         axios.get('http://localhost:3001/admin')
            .then(response => {
               setAdmins(response.data);
            })
            .catch(error => {
            console.error(error);
            });
      }, []);

      const [adoptionRequest, setAdoptionRequest] = useState([]);
      useEffect(() => {
        axios.get('http://localhost:3001/adoptionRequest')
          .then(response => {
            setAdoptionRequest(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

      const adoptionRequestCount = adoptionRequest.length;

      // Chart data
      const data = {
            labels: ['Male', 'Female'],
            datasets: [
            {
               label: 'Pet Genders',
               data: [countMalePets, countFemalePets],
               backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
               ],
               borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 99, 132, 1)',
               ],
               borderWidth: 1,
            },
            ],
         };

      const options = {
            scales: {
            y: {
               beginAtZero: true,
            },
            },
         };



      const datapie = {
            labels: ['Adoption', 'Adoption Request'],
            datasets: [
              {
                data: [adoptCount, adoptionRequestCount,], // Data values for each category
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Background color for each category
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Hover background color
              },
            ],
          };

      const dataline = {
            labels: ['User', 'Recently requested'],
            datasets: [
              {
                label: 'User Data',
                data: [userCount, userRequestCount],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
              },
            ],
          };

   
          const { admin } = useSelector((state) => state.admin);





    return (
      <div className="pl-10 md:pl-16 lg:pl-16 min-h-screen w-screen bg-white flex flex-col overflow-hidden ">
        
         <h1 className="title font-raleway-bold text-4xl color-blue-dark pt-4">Dashboard</h1>

         <div className="main-content flex flex-col lg:flex-row justify-center mt-4 ml-1">

            <div className="content bg-white rounded-lg w-full ">

               <div className="header-box-wrapper h-32 lg:h-64 flex flex-row justify-around items-center bg-blue-dark rounded-lg p-4 drop-shadow-2xl">
                  <div className="text-wrapper font-raleway text-white">
                     <h1 className='text-lg lg:text-3xl'>Hello! {admin.adminUsername}</h1>
                     <p className='text-sm lg:text-lg'>It's good to see you again</p>
                  </div>
                  <img
                     src={require('../../assets/images/admin.png')}
                     alt="Logo"
                     className="w-32 lg:w-64"
                  />

               </div>

               {/* pets section */}
               <div className="pets-section">

                  <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>Pet Overview</h1>

                  <div className="card-wrapper flex flex-col justify-between items-center">

                     <div className=" flex flex-col lg:flex-row justify-center items-center w-full py-2 ">

                        <div className="card-box bg-purple w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark ">
                           <div className="w-full flex flex-row justify-around mt-6">
                              <p className='text-3xl font-bold'>Total pets</p>
                              <PetsIcon/>
                           </div>
                           
                           <p className='text-8xl font-bold'>{pets.length}</p>

                           <NavLink to={'/Pets'}>
                              <p className='text-xl mt-6'>View table</p>

                           </NavLink>
                     
                        </div>
                        
                        <div className="card-box flex flex-col w-full h-64  ">
                           <div className="card-box bg-white w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg font-raleway text-center text-blue-dark">
                              <Bar data={data} options={options} />
                           </div>
                        </div>
                        
                     </div>

                    
                  </div>

                  <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>User Overview</h1>

                  <div className="card-wrapper flex flex-col justify-start items-center">
                     <div className=" flex flex-col lg:flex-row justify-center items-center w-full py-2 ">

                        <div className="card-box bg-purple w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark ">
                              <div className="w-full flex flex-row justify-around mt-6">
                                 <p className='text-3xl font-bold'>Total users</p>
                                 <PersonIcon/>
                              </div>
                              
                              <p className='text-8xl font-bold'>{users.length}</p>

                              <NavLink to={'/User'}>
                                 <p className='text-xl mt-6'>View table</p>

                              </NavLink>
                        
                           </div>

                     <div className="card-box flex flex-col w-full h-64  ">

                           <div className="card-box bg-white w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg font-raleway text-center text-blue-dark">
                              <Line data={dataline} />
                           </div>
                     </div>

                     </div>

                  </div>

               </div>
            </div>


            <div className="content min-h-screen rounded-lg w-full mx-1 ">
               
               <div className="header-box-wrapper bg-white justify-center items-center rounded-lg drop-shadow-lg ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DateCalendar />
                  </LocalizationProvider>
                 
               </div>      

               <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>Adoption Overview</h1>

               <div className=" flex flex-col lg:flex-row justify-center items-center w-full py-2 ">

                     <div className="card-box bg-purple w-full h-64 p-2 mb-1 rounded-lg drop-shadow-lg mr-1 font-raleway text-center text-blue-dark ">
                                 <div className="w-full flex flex-row justify-around mt-6">
                                    <p className='text-3xl font-bold'>Total adoptions</p>
                                    <BookIcon/>
                                 </div>
                                 
                           <p className='text-8xl font-bold'>{adoptions.length}</p>

                           <NavLink to={'/Adoption'}>
                              <p className='text-xl mt-6'>View table</p>

                           </NavLink>
                     
                        </div>
                  <div className="card-box flex flex-col w-full h-64  ">
                  <div className="card-box bg-white w-full h-full p-2 mb-1 rounded-lg drop-shadow-lg font-raleway text-center text-blue-dark items-center">
                     <div className="h-48"> {/* Adjust the height of the chart container */}
                        
                        <Pie data={datapie} options={{ maintainAspectRatio: false }} />
                     </div>
                     </div>

                   </div>
                        
               </div>

               <h1 className='font-raleway-bold text-xl color-blue-dark pt-4'>Admin</h1>

               <div className="header-box-wrapper bg-white justify-center items-center rounded-lg drop-shadow-lg ">
                  <div className="table-wrapper p-4 w-full overflow-x-auto">
                  <table className='font-raleway w-full p-2 rounded-lg'>
                     <thead className='text-start font-bold'>
                        <tr>
                        
                        <td className='p-2'>Username</td>
                        <td className='p-2'>Email</td>
                        <td className='p-2'>Phone number</td>
                        <td className='p-2'>Role</td>
                        <td className='p-2'>Address</td>

                        </tr>
                     </thead>

                     <tbody className='text-start'>
                        {admins.map((user) => (
                        <tr key={user.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                           
                           <td className='p-2'>
                              <div className="pf flex flex-row items-center">
                              <img
                                 src={user.adminImage}
                                 alt="Profile"
                                 className="w-6 h-6 rounded-full mr-2 object-cover"
                              />
                              <p>{user.adminUsername}</p>
                              </div>
                           </td>

                           
                           <td className='p-2'>{user.adminEmail}</td>
                           <td className='p-2'>{user.phoneNumber}</td>
                           <td className='p-2'>{user.role}</td>
                           <td className="p-2">{user.address}</td>
                           
                        </tr>

                        ))}
                     </tbody>
                  </table>

                  </div>

               </div>

            </div>

         </div>

      </div>
    
    )
}

export default Dashboard;
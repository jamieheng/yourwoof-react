import React, { useState, useEffect } from 'react';
import './Styles/Tracking.style.css';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import VerifiedIcon from '@mui/icons-material/Verified';


import SearchBar from '../SearchBar/SearchBar';

import axios from 'axios';

const TrackingtrackingTable= () => {
    const handleSearch = (searchTerm) => {
        // Handle the search logic here
        console.log('Searching for:', searchTerm);
    };


    const [tracking, setTracking] = useState([]);
    useEffect(() => {
    axios.get('http://localhost:3001/tracking')
        .then(response => {
        setTracking(response.data);
        })
        .catch(error => {
        console.error(error);
        });
    }, []);


    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tracking.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(tracking.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>

            <div className="sidebar m-4 w-full text-right flex flex-col md:flex-row lg:flex-row justify-between items-center overflow-x-auto">
        
                <SearchBar onSearch={handleSearch} className="w-full"/>

                <div>
                    <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-lg'>
            Total trackings {tracking.length}
                    </div>
                </div>

        

            </div>
        
        <div className="table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto">
            <table className='font-raleway w-full p-2 rounded-lg'>
            <thead className='text-start font-bold'>
                <tr>
                <td className='p-2'>ID</td>
                <td className='p-2'>Adopter</td>
                <td className='p-2'>Pet info</td>
                <td className='p-2'>Email</td>
                <td className='p-2'>Phone number</td>
                <td className='p-2'>Week 1</td>
                <td className='p-2'>Week 2</td>
                <td className='p-2'>Week 3</td>
                <td className='p-2'>Week 4</td>
                <td className='p-2 text-center'>Action</td>
                </tr>
            </thead>

            <tbody className='text-start'>
                {currentItems.map((tracking) => (
                <tr key={tracking.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                    <td className='p-2'>{tracking.id}</td>
                    <td className='p-2'>
                    <div className="pf flex flex-row items-center">
                        <img
                        src={tracking.userImage}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2"
                        />
                        <p>{tracking.username}</p>
                    </div>
                    </td>
                    <td className='p-2'>
                    <div className="pf flex flex-row items-center">
                        <img
                        src={tracking.petImage}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2"
                        />
                        <p>{tracking.petName}</p>
                    </div>
                    </td>
                    <td className='p-2'>{tracking.email}</td>
                    <td className='p-2'>{tracking.phoneNumber}</td>
                    <td className='p-2'> 
                        <img
                        src={tracking.week1}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2"
                        />
                    </td>
                    <td className='p-2'>
                        <img
                        src={tracking.week2}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2"
                        />
                    </td>
                    <td className='p-2'>
                        <img
                        src={tracking.week3}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2"
                        />
                    </td>
                    <td className='p-2'>
                        <img
                        src={tracking.week4}
                        alt="Profile"
                        className="w-6 h-6 rounded-full mr-2"
                        />
                        
                    </td>
                    
                    <td className='p-2 text-center'>
                        <div className='flex flex-row justify-center items-center'>
                            <button className=' mr-2 p-1 rounded-full hover:bg-blue' >
                                <VerifiedIcon/>
                            </button>
                            <button className='p-1 rounded-full hover:bg-red'>
                                <ReportProblemIcon/>
                            </button>

                        </div>
                    
                    </td>
                </tr>
                ))}
            </tbody>
            </table>

        </div>
        <div className="sidebar m-4 w-full text-right flex flex-row justify-left items-center">


            <div className="pagination w-64 flex flex-row items-center font-raleway rounded-lg text-blue-dark ">
            <button
            className="bg-white text-blue-dark hover:bg-blue-dark hover:text-white p-1 border rounded-full "
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <KeyboardArrowLeftIcon />
            </button>
            <div className="title flex flex-row justify-around p-2  w-16">
                <span>{currentPage}</span> of <span>{totalPages}</span>

            </div>
            

            <button
                className="bg-white text-blue-dark hover:bg-blue-dark hover:text-white p-1 border rounded-full "
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
            
                <KeyboardArrowRightIcon/>
            </button>
            </div>
            

        </div>
        

        

        </div>
    );
};

export default TrackingtrackingTable;

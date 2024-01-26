import React, { useState, useEffect } from 'react';
import './Styles/Table.style.css';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from '../SearchBar/SearchBar';

import axios from 'axios';

import Modal from 'react-modal';
Modal.setAppElement('#root'); // Replace '#root' with your root element ID or selector

const AdoptRequestTable = () => {
  const modalStyle = {
    content: {
      position: 'absolute',
      top: '50%', // Center vertically
      left: '50%', // Center horizontally
      transform: 'translate(-50%, -50%)', // Center both vertically and horizontally
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(1px)',
    },
  };

  const handleSearch = (searchTerm) => {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
  };

  // DeleteModal
  const [deleteModalAdoptionId, setDeleteModalAdoptionId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalAdoptionId(id);
    console.log(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // add modal
  const [addModalAdoptionId, setAddModalAdoptionId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = (id) => {
    setIsAddModalOpen(true);
    setAddModalAdoptionId(id);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // CRUD Controller
  const [pets, setPets] = useState([]);
  useEffect(() => {
    axios
      .get('https://yourwoof-server.onrender.com/pet')
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [adoptionRequest, setAdoptionRequest] = useState([]);

useEffect(() => {
  axios
    .get('https://yourwoof-server.onrender.com/adoptionRequest')
    .then((response) => {
      setAdoptionRequest(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

// Function to set new user data
const setNewAdoptionData = (adoption) => {
  setSelectedAdoption(adoption);
};

const addAdoptionRequest = (id) => {
  if (selectedAdoption) {
    const { petId, ...newAdoptionWithoutId } = selectedAdoption;
    const selectedTracking = {
      ...newAdoptionWithoutId,
      week1: '',
      week2: '',
      week3: '',
      week4: '',
    };

    axios
      .post('https://yourwoof-server.onrender.com/adoption', newAdoptionWithoutId)
      .then((response) => {
        axios
          .post('https://yourwoof-server.onrender.com/tracking', selectedTracking)
          .then(() => {
            axios
              .delete(`https://yourwoof-server.onrender.com/pet/${petId}`)
              .then(() => {
                const updatedPets = pets.filter((pet) => pet.id !== petId);
                setPets(updatedPets);
              })
              .catch((error) => {
                console.error('Error deleting pet:', error);
              });

            console.log('User added successfully:', response.data);
            deleteAdoptionRequest(id);
          })
          .catch((error) => {
            console.error('Error adding tracking data:', error);
          });
      })
      .then(() => {
        axios
          .get('https://yourwoof-server.onrender.com/adoptionRequest')
          .then((response) => {
            setAdoptionRequest(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
          });
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  }
};


  const deleteAdoptionRequest = (id) => {
    axios
      .delete(`https://yourwoof-server.onrender.com/adoptionRequest/${id}`)
      .then((response) => {
        const updatedAdoptions = adoptionRequest.filter((adoption) => adoption.id !== id);
        setAdoptionRequest(updatedAdoptions);
        console.log(id);
      })
      .catch((error) => {
        console.error('Error deleting pet:', error.message);
      });
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adoptionRequest.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(adoptionRequest.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total adoptors {adoptionRequest.length}
          </div>
        </div>
      </div>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Adopter</td>
              <td className='p-2'>Pet info</td>
              <td className='p-2'>Email</td>
              <td className='p-2'>Phone number</td>
              <td className='p-2'>Address</td>
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((user) => (
              <tr key={user.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{user.id}</td>

                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={user.userImage} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                    <p>{user.userUsername}</p>
                  </div>
                </td>

                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={user.petImage} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                    <p>{user.petName}</p>
                  </div>
                </td>

                <td className='p-2'>{user.email}</td>
                <td className='p-2'>{user.phoneNumber}</td>
                <td className='p-2'>{user.address}</td>

                <td className='p-2 text-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <button
                      className=' mr-2 p-1 rounded-full hover:bg-blue'
                      onClick={() => {
                        openAddModal(user.id);
                        setNewAdoptionData(user);
                      }}
                    >
                      <DoneIcon />
                    </button>
                    <button
                      className='p-1 rounded-full hover:bg-red'
                      onClick={() => {
                        openDeleteModal(user.id);
                      }}
                    >
                      <DeleteIcon />
                    </button>

                    {/* check modal */}
                    <Modal
                      isOpen={isAddModalOpen}
                      onRequestClose={closeAddModal}
                      contentLabel='Profile Modal'
                      className='p-2 bg-white text-center text-white rounded-lg w-1/2 font-raleway '
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to confirm this request?</h1>
                          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeAddModal}>
                            <CloseIcon />
                          </button>
                        </div>
                        <hr className='border-1 border-purple ' />

                        <div className='w-full flex flex-row justify-end items-center p-4'>
                          <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeAddModal}>
                            <p>Cancel</p>
                          </button>
                          <button
                            className='p-2 px-4 rounded-md bg-blue-dark rounded-full hover:bg-blue'
                            onClick={() => {
                              addAdoptionRequest(addModalAdoptionId);
                              closeAddModal();
                            }}
                          >
                            <p>Yes</p>
                          </button>
                        </div>
                      </form>
                    </Modal>

                    {/* delete modal */}
                    <Modal
                      isOpen={isDeleteModalOpen}
                      onRequestClose={closeDeleteModal}
                      contentLabel='Profile Modal'
                      className='p-2 bg-white text-center text-white rounded-lg w-1/2 font-raleway '
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to remove this request?</h1>
                          <button className='p-1 text-blue-dark rounded-full hover:bg-red' onClick={closeDeleteModal}>
                            <CloseIcon />
                          </button>
                        </div>
                        <hr className='border-1 border-purple ' />

                        <div className='w-full flex flex-row justify-end items-center p-4'>
                          <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeDeleteModal}>
                            <p>Cancel</p>
                          </button>
                          <button
                            className='p-2 px-4 rounded-md bg-blue-dark rounded-full hover:bg-blue'
                            onClick={() => {
                              deleteAdoptionRequest(deleteModalAdoptionId);
                              closeDeleteModal();
                            }}
                          >
                            <p>Yes</p>
                          </button>
                        </div>
                      </form>
                    </Modal>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='sidebar m-4 w-full text-right flex flex-row justify-left items-center'>
        <div className='pagination w-64 flex flex-row items-center font-raleway rounded-lg text-blue-dark '>
          <button
            className='bg-white text-blue-dark hover:bg-blue-dark hover:text-white p-1 border rounded-full '
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <KeyboardArrowLeftIcon />
          </button>
          <div className='title flex flex-row justify-around p-2  w-16'>
            <span>{currentPage}</span> of <span>{totalPages}</span>
          </div>

          <button
            className='bg-white text-blue-dark hover:bg-blue-dark hover:text-white p-1 border rounded-full '
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <KeyboardArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdoptRequestTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DeleteIcon from '@mui/icons-material/Delete';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import './Styles/SurrenderTable.style.css';
import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root'); // Replace '#root' with your root element ID or selector

const SurrenderTable = () => {
  const handleSearch = (searchTerm) => {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
  };

  const modalStyle = {
    content: {
      position: 'absolute',
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(1px)',
    },
  };

  

  // Function to set new user data
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

  

  const deleteSurrender = (id) => {
    axios
      .delete(`https://yourwoof-server.onrender.com/surrender/${id}`)
      .then((response) => {
        const updatedSurrenders = surrenderRequest.filter((surrender) => surrender.id !== id);
        setSurrenderRequest(updatedSurrenders);
        console.log(id);
      })
      .catch((error) => {
        console.error('Error deleting pet:', error.message);
      });
  };
  // delete Modal
  const [deleteModalSurrenderId, setDeleteModalSurrenderId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalSurrenderId(id);
    console.log(id);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };



  // add modal
  const [surrenderRequest, setSurrenderRequest] = useState([]);
  useEffect(() => {
    axios
      .get('https://yourwoof-server.onrender.com/surrender')
      .then((response) => {
        setSurrenderRequest(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [addModalSurrenderId, setAddModalSurrenderId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = (id) => {
    setIsAddModalOpen(true);
    setAddModalSurrenderId(id);
    console.log(addModalSurrenderId);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const addSurrender = () => {
  if (addModalSurrenderId !== null) {
    const surrenderRequestById = surrenderRequest.find((surrender) => surrender.id === addModalSurrenderId);

    if (surrenderRequestById) {
      const newPet = {
        name: surrenderRequestById.petName,
        image: surrenderRequestById.petImage,
        gender: surrenderRequestById.petGender,
        breed: surrenderRequestById.petBreed,
        age: surrenderRequestById.petAge,
        description: surrenderRequestById.petDesc,
        medicalStatus: surrenderRequestById.petMedi,
      };

      axios
        .post(`https://yourwoof-server.onrender.com/pet`, newPet)
        .then((response) => {
          setPets((prevPets) => [...prevPets, response.data]);
          
          setSurrenderRequest((prevSurrenderRequest) =>
            prevSurrenderRequest.filter((surrender) => surrender.id !== addModalSurrenderId)
          );
          closeAddModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
};


  
  
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = surrenderRequest.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(surrenderRequest.length / itemsPerPage);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full text-right flex flex-col md:flex-row lg:flex-row justify-between items-center overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />

        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-lg'>
            Total surrenders {surrenderRequest.length}
          </div>
        </div>
      </div>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg overflow-x-auto'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Surrenderer</td>
              <td className='p-2'>Pet Name</td>
              <td className='p-2'>Pet Gender</td>
              <td className='p-2'>Pet Breed</td>
              <td className='p-2'>Pet Age</td>
              <td className='p-2'>Pet Description</td>
              <td className='p-2'>Pet Medical Status</td>
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((surrender) => (
              <tr key={surrender.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{surrender.id}</td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={surrender.userImage} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                    <p>{surrender.username}</p>
                  </div>
                </td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={surrender.petImage} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                    <p>{surrender.petName}</p>
                  </div>
                </td>
                <td className='p-2'>{surrender.petGender}</td>
                <td className='p-2'>{surrender.petBreed}</td>
                <td className='p-2'>{surrender.petAge} month(s)</td>
                <td className='p-2'>{surrender.petDesc}</td>
                <td className='p-2'>{surrender.petMedi}</td>
                <td className='p-2 text-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <button
                      className=' mr-2 p-1 rounded-full hover:bg-blue'
                      onClick={() => {
                        openAddModal(surrender.id);
                      }}
                    >
                      <DoneIcon />
                    </button>
                    <button
                      className='p-1 rounded-full hover:bg-red'
                      onClick={() => {
                        openDeleteModal(surrender.id);
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
                          <h1 className='text-blue-dark font-bold'>Do you want to confirm this surrender?</h1>
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
                              addSurrender();
                              closeAddModal();
                              deleteSurrender(addModalSurrenderId);
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
                      className='w-96 md:w-1/2 lg:w-1/2 p-2 bg-white text-center text-white rounded-lg font-raleway '
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to remove this surrender?</h1>
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
                              deleteSurrender(deleteModalSurrenderId);
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
      <div className='sidebar m-4 w-full text-right flex flex-row justify-between items-center'>
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

export default SurrenderTable;

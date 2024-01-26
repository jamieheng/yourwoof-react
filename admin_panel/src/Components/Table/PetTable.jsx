import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { storage } from '../../config/firebase';
import BarLoader from "react-spinners/BarLoader";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';

import EditIcon from '@mui/icons-material/Edit';
import './Styles/PetTable.style.css';
import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const PetTable = () => {
  const handleSearch = (searchTerm) => {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
  };

  const [message, setMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  

  const onHandleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage('Please input the file');

      return;
    }

    try {
      const date = new Date();
      const imagePath = storage.ref(`/images/${file.name}-${date.getTime().toString()}-${Math.random()}`);
      setIsPending(true);
      await imagePath.put(file);
      const getUrl = await imagePath.getDownloadURL();
      setPathImage(getUrl);
      setIsPending(false);
      console.log(imagePath);

      console.log(getUrl);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
  };

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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // edit
  const [editModalPetId, setEditModalPetId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = (id) => {
    const selectedPet = pets.find((pet) => pet.id === id);
    if (selectedPet) {
      setPetName(selectedPet.name);
      setPetGender(selectedPet.gender);
      setPetAge(selectedPet.age);
      setPetBreed(selectedPet.breed);
      setPathImage(selectedPet.image);
      setPetDesc(selectedPet.description);
      setPetMedi(selectedPet.medicalStatus);
      // Set other state values as needed
      setEditModalPetId(id);
      setIsEditModalOpen(true);
      console.log(selectedPet);
    } else {
      console.error(`Pet with ID ${id} not found`);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // delete modal
  const [deleteModalPetId, setDeleteModalPetId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalPetId(id); // Save the current id in state
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  // validation
  const [isInvalid, setIsInvalid] = useState(false);
  const [isInvalidName, setIsInvalidName] = useState(false);
  const [isInvalidGender, setIsInvalidGender] = useState(false);
  const [isInvalidAge, setIsInvalidAge] = useState(false);
  const [isInvalidBreed, setIsInvalidBreed] = useState(false);
  const [isInvalidDesc, setIsInvalidDesc] = useState(false);
  const [isInvalidMedi, setIsInvalidMedi] = useState(false);

  const [petName, setPetName] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petDesc, setPetDesc] = useState('');
  const [petMedi, setPetMedi] = useState('');
  const [pathImage, setPathImage] = useState('');

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Update the state based on the input name
    if (name === 'petName') {
      setPetName(value);
      setIsInvalidName(value.trim() === '');
    } else if (name === 'petGender') {
      setPetGender(value);
      setIsInvalidGender(value.trim() === '');
    } else if (name === 'petAge') {
      setPetAge(value);
      setIsInvalidAge(value.trim() === '');
    } else if (name === 'petBreed') {
      setPetBreed(value);
      setIsInvalidBreed(value.trim() === '');
    } else if (name === 'petDesc') {
      setPetDesc(value);
      setIsInvalidDesc(value.trim() === '');
    } else if (name === 'petMedi') {
      setPetMedi(value);
      setIsInvalidMedi(value.trim() === '');
    }
  };

  const handleButtonAdd = (e) => {
    e.preventDefault(); // Prevent form submission

    // Validate each input and set the corresponding state
    setIsInvalidName(petName.trim() === '');
    setIsInvalidAge(petAge.trim() === '');
    setIsInvalidGender(petGender.trim() === '');
    setIsInvalidBreed(petBreed.trim() === '');
    setIsInvalidDesc(petDesc.trim() === '');
    setIsInvalidMedi(petMedi.trim() === '');

    // Check if any input is invalid
    if (
      petName.trim() === '' ||
      petAge.trim() === '' ||
      petGender.trim() === '' ||
      petBreed.trim() === '' ||
      petDesc.trim() === '' ||
      petMedi.trim() === ''
    ) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
      addPet();
      closeAddModal();
    }
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

  const addPet = () => {
    const newPet = {
      name: petName,
      image: pathImage,
      gender: petGender,
      breed: petBreed,
      age: petAge,
      description: petDesc,
      medicalStatus: petMedi,
    };

    axios
      .post('https://yourwoof-server.onrender.com/pet', newPet)
      .then((response) => {
        setPets((prevPets) => [...prevPets, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editPet = (id) => {
    const updatedPet = {
      name: petName,
      image: pathImage,
      gender: petGender,
      age: petAge,
      breed: petBreed,
      description: petDesc,
      medicalStatus: petMedi,
    };

    axios
      .put(`https://yourwoof-server.onrender.com/pet/${id}`, updatedPet) // Use editModalPetId here
      .then((response) => {
        setPets((prevPets) => prevPets.map((pets) => (pets.id === id ? response.data : pets)));
        closeEditModal();
        console.log(updatedPet);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePet = (id) => {
    axios
      .delete(`https://yourwoof-server.onrender.com/pet/${id}`)
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet.id !== id);
        setPets(updatedPets);
      })
      .catch((error) => {
        console.error('Error deleting pet:', error.message);
      });
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pets.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total users {pets.length}
          </div>
        </div>
      </div>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg overflow-x-auto'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Name</td>
              <td className='p-2'>Gender</td>
              <td className='p-2'>Breed</td>
              <td className='p-2'>Age</td>
              <td className='p-2'>Description</td>
              <td className='p-2'>Medical Status</td>
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((pets) => (
              <tr key={pets.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{pets.id}</td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={pets.image} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                    <p>{pets.name}</p>
                  </div>
                </td>
                <td className='p-2'>{pets.gender}</td>
                <td className='p-2'>{pets.breed}</td>
                <td className='p-2'>{pets.age} month(s)</td>
                <td className='p-2'>{pets.description}</td>
                <td className='p-2'>{pets.medicalStatus}</td>

                <td className='p-2 text-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <button className='mr-2 p-1 rounded-full hover:bg-blue' onClick={() => openEditModal(pets.id)}>
                      <EditIcon />
                    </button>
                    <button
                      className='p-1 rounded-full hover:bg-red'
                      onClick={() => {
                        openDeleteModal(pets.id); //1
                      }}
                    >
                      <DeleteIcon />
                    </button>

                    {/* edit modal */}
                    <Modal
                      isOpen={isEditModalOpen}
                      onRequestClose={closeEditModal}
                      contentLabel='Profile Modal'
                      className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-center items-center p-4'>
                          <h1 className='text-blue-dark text-4xl font-bold'>Update Pet</h1>
                        </div>

                        <hr className='border-1 border-blue-dark w-full mb-4' />

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Name</p>
                          <input
                            type='text'
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Pet Gender</p>
                          <select
                            name='petGender'
                            value={petGender} // Add this line to bind the selected value
                            onChange={handleInputChange} // Assuming you have an onChange handler for updating the state
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          >
                            <option value='' disabled>
                              Select Gender
                            </option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                          </select>
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Age ( month* )</p>

                          <input
                            type='text'
                            value={petAge}
                            onChange={(e) => setPetAge(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Breed</p>
                          <input
                            type='text'
                            value={petBreed}
                            onChange={(e) => setPetBreed(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Description</p>
                          <textarea
                            type='text'
                            value={petDesc}
                            onChange={(e) => setPetDesc(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Medical Status</p>
                          <input
                            type='text'
                            value={petMedi}
                            onChange={(e) => setPetMedi(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <hr className='border-1 border-blue-dark w-full mt-4 mb-4' />
                        <div className='w-full flex flex-row justify-end items-center p-4'>
                          <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeEditModal}>
                            <p>Cancel</p>
                          </button>
                          <button
                            className='p-2 px-4 rounded-md bg-blue-dark rounded-full hover:bg-blue'
                            onClick={() => {
                              editPet(editModalPetId);
                              closeEditModal();
                            }}
                          >
                            <p>Save Changes</p>
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
                          <h1 className='text-blue-dark font-bold'>Do you want to remove this pet?</h1>
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
                              deletePet(deleteModalPetId);
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

        <button
          className='bg-purple text-white hover:bg-blue-dark p-2 px-4 rounded-lg flex flex-row items-center text-right'
          onClick={openAddModal}
        >
          <AddIcon />
          <p className='hidden md:block lg:block'>Add New Pet</p>
        </button>

        {/* add modal */}
        <Modal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          contentLabel='Profile Modal'
          className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway '
          style={modalStyle}
        >
          <form action='' className='flex flex-col justify-center items-start w-full'>
            <div className='w-full flex flex-row justify-center items-center p-4'>
              <h1 className='text-blue-dark text-4xl font-bold '>Add New Pet</h1>
            </div>

            <hr className='border-1 border-blue-dark w-full mb-4' />

            <div className='flex flex-row justify-center items-start w-full'>
              <div className='w-1/2'>
                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet ID</p>
                  <div
                    type='text'
                    placeholder='Name'
                    className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg bg-blue-dark text-white '
                  >
                    <p>Auto Generate</p>
                  </div>
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Name</p>
                  <input
                    type='text'
                    placeholder='Name'
                    name='petName'
                    onChange={handleInputChange}
                    value={petName}
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidName ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />

                  {isInvalidName && <p className='text-red text-left mt-2'>Please enter a pet name *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Gender</p>
                  <select
                    name='petGender'
                    onChange={handleInputChange}
                    value={petGender}
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidGender ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  >
                    <option value='' disabled>
                      Select Gender
                    </option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                  {isInvalidGender && <p className='text-red text-left mt-2'>Please select a pet gender *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Age ( month* )</p>
                  <input
                    keyboardType='numeric'
                    placeholder='Age'
                    name='petAge'
                    onChange={handleInputChange}
                    value={petAge}
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidAge ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                  {isInvalidAge && <p className='text-red text-left mt-2'>Please enter a pet age *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Breed</p>
                  <input
                    type='text'
                    placeholder='Breed'
                    name='petBreed'
                    onChange={handleInputChange}
                    value={petBreed}
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidBreed ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                  {isInvalidBreed && <p className='text-red text-left mt-2'>Please enter a pet breed *</p>}
                </div>
              </div>

              <div className='w-1/2'>
                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Medical Status</p>
                  <input
                    type='text'
                    placeholder='Medical Status'
                    name='petMedi'
                    onChange={handleInputChange}
                    value={petMedi}
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidMedi ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                  {isInvalidMedi && <p className='text-red text-left mt-2'>Please enter a pet medical status *</p>}
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Image</p>
                 
                 
                  <input
                    type='file'
                    onChange={(e) => {
                      onHandleChange(e);
                    }}
                    name='pathImage'
                    className={`w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />

                   {isPending && <div className='m-2 text-center'><BarLoader color="#232b38" /></div>  } 
                  
                </div>

                <div className='text-blue-dark p-2 w-full text-start'>
                  <p className='mb-2 font-bold'>Pet Description</p>
                  <textarea
                    type='text'
                    placeholder='Description'
                    name='petDesc'
                    onChange={handleInputChange}
                    value={petDesc}
                    className={`w-full p-4 items-center border-sm outline-none border ${
                      isInvalidDesc ? 'border-red' : 'border-blue-dark'
                    } rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white`}
                  />
                  {isInvalidDesc && <p className='text-red text-left mt-2'>Please enter a pet description *</p>}
                </div>
              </div>
            </div>

            <hr className='border-1 border-blue-dark w-full mb-4 mt-4' />

            <div className='w-full flex flex-row justify-end items-center p-4'>
              <button className=' mr-2 p-2 px-4 rounded-md bg-gray hover:bg-red' onClick={closeAddModal}>
                <p>Cancel</p>
              </button>
              <button className='p-2 px-4 rounded-md bg-blue-dark rounded-full hover:bg-blue' onClick={handleButtonAdd}>
                <p>Upload</p>
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default PetTable;

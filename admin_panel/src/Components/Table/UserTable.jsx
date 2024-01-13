import React, { useState, useEffect } from 'react';
import './Styles/User.style.css';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const UserTable = () => {
  const handleSearch = (searchTerm) => {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
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

  // EditModal
  const [editModalUserId, setEditModalUserId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = (id) => {
    const selectedUser = users.find((user) => user.id === id);

    if (selectedUser) {
      setUserFirstName(selectedUser.firstName);
      setUserLastName(selectedUser.lastName);
      setUserUserName(selectedUser.userName);
      setUserEmail(selectedUser.email);
      setUserPhoneNumber(selectedUser.phoneNumber);
      setUserRegisterDate(selectedUser.registerDate);
      setUserImageFile(selectedUser.image);
      // Set other state values as needed
      setIsEditModalOpen(true);

      setEditModalUserId(id);
    } else {
      console.error(`user with ID ${id} not found`);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // DeleteModal
  const [deleteModalUserId, setDeleteModalUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteModalUserId(id);
    console.log(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userUserName, setUserUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userRegisterDate, setUserRegisterDate] = useState('');
  const [userImageFile, setUserImageFile] = useState(null);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Update the state based on the input name
    if (name === 'firstName') {
      setUserFirstName(value);
    } else if (name === 'lastName') {
      setUserLastName(value);
    } else if (name === 'username') {
      setUserUserName(value);
    } else if (name === 'email') {
      setUserEmail(value);
    } else if (name === 'phoneNumber') {
      setUserPhoneNumber(value);
    } else if (name === 'registerDate') {
      setUserRegisterDate(value);
    } else if (name === 'userImageFile') {
      const file = e.target.files[0];

      // Check if the file is not null
      if (file) {
        // Get the file extension
        const fileExtension = file.name.split('.').pop().toLowerCase();

        // Check if the extension is valid (png or jpeg)
        if (fileExtension !== 'png' && fileExtension !== 'jpeg' && fileExtension !== 'jpg') {
          return;
        }

        // Set the user image file and reset the invalid state
        setUserImageFile(file);
      } else {
        // If the file is null, set invalid
        setUserImageFile(null);
      }
    }
  };

  // CRUD Controller
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('https://yourwoof-server.onrender.com/user')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const editUser = (id) => {
    const updatedUser = {
      image: userImageFile,
      firstName: userFirstName,
      lastName: userLastName,
      userName: userUserName,
      email: userEmail,
      phoneNumber: userPhoneNumber,
      registerDate: userRegisterDate,
    };

    axios
      .put(`https://yourwoof-server.onrender.com/user/${id}`, updatedUser)
      .then((response) => {
        setUsers((prevUsers) => prevUsers.map((user) => (user.id === id ? response.data : user)));
        closeEditModal();
        console.log(updatedUser);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`https://yourwoof-server.onrender.com/user/${id}`)
      .then((response) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
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
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='w-full h-full flex flex-col justify-between items-center overflow-x-auto'>
      <div className='sidebar m-4 w-full flex flex-col md:flex-row lg:flex-row justify-start lg:justify-between items-start overflow-x-auto'>
        <SearchBar onSearch={handleSearch} className='w-full' />
        <div>
          <div className='p-2 font-raleway px-4 bg-blue-dark text-white rounded-md mt-2 md:mt-0 lg:mt-0'>
            Total users {users.length}
          </div>
        </div>
      </div>

      <div className='table-wrapper p-4 w-full border border-blue-dark rounded-lg overflow-x-auto'>
        <table className='font-raleway w-full p-2 rounded-lg'>
          <thead className='text-start font-bold'>
            <tr>
              <td className='p-2'>ID</td>
              <td className='p-2'>Fullname</td>
              <td className='p-2'>Username</td>
              <td className='p-2'>Email</td>
              <td className='p-2'>Phone number</td>
              <td className='p-2'>Register date</td>
              <td className='p-2 text-center'>Action</td>
            </tr>
          </thead>

          <tbody className='text-start'>
            {currentItems.map((user) => (
              <tr key={user.id} className='border-t hover:bg-blue-dark hover:text-white rounded-lg'>
                <td className='p-2'>{user.id}</td>
                <td className='p-2'>
                  <div className='pf flex flex-row items-center'>
                    <img src={user.image} alt='Profile' className='w-6 h-6 rounded-full mr-2' />
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </td>

                <td className='p-2'> {user.userName} </td>
                <td className='p-2'>{user.email}</td>
                <td className='p-2'>{user.phoneNumber}</td>
                <td className='p-2'>{user.registerDate}</td>
                <td className='p-2 text-center'>
                  <div className='flex flex-row justify-center items-center'>
                    <button className=' mr-2 p-1 rounded-full hover:bg-blue' onClick={() => openEditModal(user.id)}>
                      <EditIcon />
                    </button>
                    <button
                      className='p-1 rounded-full hover:bg-red'
                      onClick={() => {
                        openDeleteModal(user.id);
                      }}
                    >
                      <DeleteIcon />
                    </button>

                    {/* edit modal */}
                    <Modal
                      isOpen={isEditModalOpen}
                      onRequestClose={closeEditModal}
                      contentLabel='Profile Modal'
                      className='p-2 bg-white text-center text-white rounded-lg w-96 md:w-1/2 lg:w-1/2 font-raleway'
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-center items-center p-4'>
                          <h1 className='text-blue-dark text-4xl font-bold'>Update User</h1>
                        </div>

                        <hr className='border-1 border-blue-dark w-full mb-4' />

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Firstname</p>
                          <input
                            type='text'
                            value={userFirstName}
                            onChange={(e) => setUserFirstName(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Lastname</p>
                          <input
                            type='text'
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Username</p>
                          <input
                            type='text'
                            value={userUserName}
                            onChange={(e) => setUserUserName(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Email</p>
                          <input
                            type='text'
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Phone Number</p>
                          <input
                            type='text'
                            value={userPhoneNumber}
                            onChange={(e) => setUserPhoneNumber(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Register Date</p>
                          <input
                            type='text'
                            value={userRegisterDate}
                            onChange={(e) => setUserRegisterDate(e.target.value)}
                            className='w-full p-4 items-center border-sm outline-none border border-blue-dark rounded-lg focus:bg-blue-dark focus:text-white hover:bg-blue-dark hover:text-white'
                          />
                        </div>

                        <div className='text-blue-dark p-2 w-1/2 text-start'>
                          <p className='mb-2 font-bold'>Update Image</p>
                          <input
                            type='file'
                            onChange={(e) => setUserImageFile(e.target.files[0])}
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
                              editUser(editModalUserId);
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
                      className='p-2 bg-white text-center text-white rounded-lg w-1/2 font-raleway '
                      style={modalStyle}
                    >
                      <form action='' className='flex flex-col justify-center items-center w-full'>
                        <div className='w-full flex flex-row justify-between items-center p-4'>
                          <h1 className='text-blue-dark font-bold'>Do you want to remove this user?</h1>
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
                              deleteUser(deleteModalUserId);
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

export default UserTable;

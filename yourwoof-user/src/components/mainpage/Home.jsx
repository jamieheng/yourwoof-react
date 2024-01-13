import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Textarea } from '@material-tailwind/react';
import CheckIcon from '@mui/icons-material/Check';

import { Card, CardHeader, CardBody, Typography, Button, Input } from '@material-tailwind/react';

import Footer from './Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Modal from 'react-modal';
import { storage } from '../../config/firebase';
Modal.setAppElement('#root');

export default function Home() {
  const { user } = useSelector((state) => state.user);

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

  const handleSurrenderSubmit = () => {
    addSurrender();
  };

  const addSurrender = () => {
    const newRequest = {
      userImage: 'https://via.placeholder.com/150',
      userUsername: user.firstName,
      email: user.email,
      petImage: pathImage,
      petName: petname,
      petGender: petgender,
      petBreed: petbreed,
      petAge: petage,
      petDesc: petdesc,
      petMedi: petmedi,
    };

    axios
      .post('https://yourwoof-server.onrender.com/surrender', newRequest)
      .then((response) => {
        setSurrenderRequest((prevSurrenderRequest) => [...prevSurrenderRequest, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const modalStyle = {
    content: {
      position: 'absolute',
      top: '55%', // Center vertically
      left: '50%', // Center horizontally
      transform: 'translate(-50%, -50%)', // Center both vertically and horizontally
      overflowY: 'auto',
      margin: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(1px)',
    },
  };

  const mssModalStyle = {
    content: {
      position: 'absolute',
      top: '50%', // Center vertically
      left: '50%', // Center horizontally
      transform: 'translate(-50%, -50%)', // Center both vertically and horizontally
      overflowY: 'auto',
      margin: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(1px)',
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isMssModalOpen, setIsMssModalOpen] = useState(false);
  const openMssModal = () => {
    setIsMssModalOpen(true);
  };

  const closeMssModal = () => {
    setIsMssModalOpen(false);
  };

  useEffect(() => {
    // Use setTimeout to close the modal after 5 seconds
    const timeoutId = setTimeout(() => {
      closeMssModal();
    }, 5000);

    // Clear the timeout when the component is unmounted or when isMssModalOpen changes
    return () => clearTimeout(timeoutId);
  }, [isMssModalOpen]);

  const images = ['../images/sliderpic5.jpg', '../images/sliderpic2.jpg', '../images/8930891.jpg', '../images/sliderpic8.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [petname, setPetName] = useState('');
  const [petgender, setPetGender] = useState('');
  const [petage, setPetAge] = useState('');
  const [petbreed, setPetBreed] = useState('');
  const [petdesc, setPetDesc] = useState('');
  const [petmedi, setPetMedi] = useState('');

  const [message, setMessage] = useState('');
  const [pathImage, setPathImage] = useState('');
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

      console.log(getUrl);
    } catch (err) {
      console.log(err);
    }
    console.log(file);
  };

  return (
    <div className='flex flex-col items-center justify-center w-screen p-4 mt-36 font-raleway'>
      <div className='flex flex-row justify-center items-center w-full m-8 lg:m-16'>
        <h1 className='text-xl md:text-4xl lg:text-4xl font-bold text-center'>
          Welcome to, <span className='text-lavender font-bold'>Yourwoof</span>{' '}
        </h1>
      </div>

      {/* Carousel */}

      <Carousel className='rounded-xl h-32 lg:h-96' autoplay autoplayDelay={3000} infinite>
        <img src='../images/sliderpic8.jpg' alt='image 1' className='w-full h-auto max-h-full object-cover' />
        <img src='../images/sliderpic9.jpg' alt='image 2' className='w-full h-auto max-h-full object-cover' />
        <img src='../images/sliderpic7.jpg' alt='image 3' className='w-full h-auto max-h-full object-cover' />
      </Carousel>

      {/* <p className="p-6 mt-4 text-3xl font-bold text-center">
				RESCUE DOG NEEDED
			</p> */}

      <div className='w-full md:h-80 lg:h-80 flex flex-col md:flex-row lg:flex-row justify-center items-center bg-grey p-4'>
        <img src={require('./../assets/images/model.jpg')} alt='logo' className='w-full md:w-1/2 lg:w-1/2 h-64 object-cover' />
        <div className=' w-full md:w-1/2 lg:w-1/2 h-full flex flex-col justify-start p-4'>
          <h1 className='text-xl font-bold mb-2 text-lavender'>Loving Forever Home Needed</h1>
          <p>
            YOURWOOF – the heartwarming platform dedicated to connecting compassionate individuals with loving pets in need of
            forever homes. We believe in the transformative power of adoption, not just for pet lovers seeking furry companions
            but also for the countless animals yearning for a second chance. Join us in creating a world where every pet has a
            loving home.
          </p>
        </div>
      </div>

      {/* <div className="flex items-center justify-center text-center mx-auto my-auto w-40 h-40 sm:w-48 sm:h-48">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="Line">
					<path
						style={{
							textIndent: 0,
							textAlign: "start",
							lineHeight: "normal",
							textTransform: "none",
							blockProgression: "tb",
							marker: "none",
							fontFamily: "Sans",
							fontWeight: 400,
							overflow: "visible",
							transform: "translate(0 -988.362)",
						}}
						d="M27.219 1012.29c-.63 0-1.19.276-1.657.688-.466.413-.859.957-1.218 1.594-.72 1.274-1.317 2.917-1.969 4.531-.652 1.615-1.348 3.227-2.188 4.375-.84 1.148-1.77 1.813-2.968 1.813H2.78a.5.5 0 1 0 0 1H17.22c1.587 0 2.808-.964 3.75-2.25.941-1.287 1.653-2.931 2.312-4.563.66-1.631 1.282-3.245 1.938-4.406.327-.58.663-1.046 1-1.344.337-.298.644-.437 1-.437.774 0 1.399.5 2.031 1.375.632.874 1.204 2.098 1.75 3.344.546 1.245 1.086 2.505 1.719 3.5.632.994 1.424 1.78 2.5 1.78.949 0 1.69-.386 2.187-.937.497-.55.769-1.21 1.032-1.843.262-.635.505-1.237.78-1.625.276-.39.521-.594 1-.594.192 0 .306.066.47.219.163.153.363.404.53.75.336.69.638 1.695 1.032 2.718s.878 2.076 1.656 2.907c.779.83 1.868 1.406 3.313 1.406h14a.5.5 0 1 0 0-1h-14c-1.192 0-1.967-.425-2.594-1.094-.627-.67-1.093-1.585-1.469-2.562-.376-.978-.668-2.003-1.062-2.813-.197-.405-.416-.747-.719-1.031-.303-.285-.706-.5-1.156-.5-.804 0-1.424.451-1.813 1-.388.548-.62 1.197-.875 1.812-.255.616-.526 1.207-.875 1.594-.348.387-.742.594-1.437.594-.569 0-1.097-.432-1.657-1.313-.56-.88-1.106-2.12-1.656-3.375-.55-1.254-1.12-2.53-1.843-3.531-.724-1-1.647-1.781-2.844-1.781z"
						color="#000"
						enable-background="accumulate"
						font-family="Sans"
						font-weight="400"
						overflow="visible"
						transform="translate(0 -988.362)"
						fill="#e1affd"
						class="color000000 svgShape"
					></path>
				</svg>
			</div> */}

      {/*  Pet list */}
      <p className='p-6 mt-4 text-3xl font-bold text-center'>ADOPT OR FOSTER A RESCUED ANIMAL</p>

      <div className='w-full flex flex-col items-center justify-center mb-4 lg:h-96'>
        <img
          src={require('./../assets/images/rescue.jpeg')}
          alt='logo'
          className='w-full md:w-full lg:w-full h-full object-cover object-center'
        />
      </div>

      <div className='mb-10'>
        <Button
          ripple={false}
          fullWidth={true}
          className='bg-lavender shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
        >
          <Link
            to='/PetList'
            className='font-large text-white font-raleway transform hover:-translate-y-1 transition-transform duration-300'
          >
            Help Us Now
          </Link>
        </Button>
      </div>

      <div className='surrender-pet relative h-96 w-full'>
        <img src={require('./../assets/images/beach.jpg')} alt='logo' className='w-full h-full object-cover object-center' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black text-center'>
          <p className='w-full lg:w-3/4 text-center mx-auto text-black justify-center pb-12 lg:text-xl'>
            Surrendering a pet can be an incredibly difficult decision. However, it's better to find a new owner for your pet than
            abandon it on the street.
          </p>
          <div className=''>
            <Button
              onClick={openModal}
              ripple={false}
              fullWidth={true}
              style={{ backgroundColor: '#e1affd' }}
              className='w-48 bg-blue-gray-900/10 text-grey shadow-none transform transition-transform duration-300 hover:scale-105 focus:scale-105 active:scale-100 hover:shadow-md focus:shadow-md active:shadow-none hover:rounded-lg focus:rounded-lg active:rounded-lg mx-auto'
            >
              Fill out the form
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Profile Modal'
        className='w-96 md:w-1/2 lg:w-1/2 p-2 h-3/4 bg-white text-center text-white rounded-lg font-raleway'
        style={modalStyle}
      >
        <Card color='transparent' shadow={false} className=' items-center mt-4 font-raleway'>
          <Typography variant='h4' color='blue-gray' className='font-raleway'>
            Form for surrender you pet
          </Typography>

          <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 '>
            <div className='mb-1 flex flex-col gap-6'>
              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Fullname
              </Typography>
              <Input
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                type='text'
                size='lg'
                placeholder='Veiy Sokheng'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Email
              </Typography>
              <Input
                required
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size='lg'
                placeholder='name@mail.com'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet name
              </Typography>
              <Input
                required
                type='text'
                value={petname}
                onChange={(e) => setPetName(e.target.value)}
                size='lg'
                placeholder='Bobo'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Age (months)
              </Typography>
              <Input
                required
                type='text'
                value={petage}
                onChange={(e) => setPetAge(e.target.value)}
                size='lg'
                placeholder='12'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Breed
              </Typography>
              <Input
                required
                type='text'
                value={petbreed}
                onChange={(e) => setPetBreed(e.target.value)}
                size='lg'
                placeholder='Dog / German Shepard'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Gender
              </Typography>

              <select
                required
                value={petgender}
                onChange={(e) => setPetGender(e.target.value)}
                size='lg'
                className='p-3 text-black font-raleway border border-darkpurple focus:!border-lavender rounded-lg'
              >
                <option value='' disabled className=''>
                  Select Gender
                </option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Medical Status
              </Typography>
              <Input
                required
                type='text'
                value={petmedi}
                onChange={(e) => setPetMedi(e.target.value)}
                size='lg'
                placeholder='Vaccinated'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Description
              </Typography>
              <Textarea
                required
                value={petdesc}
                onChange={(e) => setPetDesc(e.target.value)}
                size='lg'
                placeholder='Dog / German Shepard'
                className=' !border-darkpurple focus:!border-lavender font-raleway'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />

              <Typography variant='h6' color='blue-gray' className='-mb-3 font-raleway'>
                Pet Image
              </Typography>
              <input
                required
                onChange={(e) => onHandleChange(e)}
                type='file'
                size='lg'
                className='p-3 text-black font-raleway border border-darkpurple focus:!border-lavender rounded-lg'
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
            </div>

            <Button
              type='submit'
              className='mt-6 bg-lavender font-raleway hover:bg-darkpurple transform hover:-translate-y-2 transition-transform duration-300 '
              fullWidth
              onClick={() => {
                closeModal();
                handleSurrenderSubmit();
                openMssModal();
              }}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Modal>

      <Modal
        isOpen={isMssModalOpen}
        onRequestClose={closeMssModal}
        contentLabel='Profile Modal'
        className='w-96 md:w-1/2 lg:w-1/2 p-2 h-1/2 bg-white text-center text-black rounded-lg font-raleway flex flex-col justify-center items-center'
        style={mssModalStyle}
      >
        <p className='text-xl'>Your pet surrender has been sent.</p>
        <p className='text-xl mt-2'>Please bring your pet to our shelter.</p>

        <div className='mt-2 w-16 h-16 rounded-full border-2 border-lavender bg-transparent grid place-items-center'>
          <CheckIcon className='text-9xl text-lavender' />
        </div>
        <p className='text-3xl mt-2'>Thank you.</p>
      </Modal>

      {/* Total categorized */}
      <p className='p-6 mt-4 text-3xl font-bold text-center'>TOTAL PETS IN CATEGORIES</p>

      <div className='flex flex-col lg:flex-row justify-center items-center'>
        <Card
          shadow={false}
          className='relative grid h-[28rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center m-4 font-raleway'
        >
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            className='absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center'
            style={{ backgroundImage: "url('../images/vaccinateddog.jpg')" }}
          >
            <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50' />
          </CardHeader>
          <CardBody className='relative py-14 px-6 md:px-12'>
            <Typography variant='h2' color='white' className='mb-6 font-medium leading-[1.5] font-raleway'>
              VACCINATED
            </Typography>
            <Typography variant='h1' className='mb-4 text-white font-raleway'>
              10
            </Typography>
          </CardBody>
        </Card>
        <Card
          shadow={false}
          className='relative grid h-[28rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center m-4 font-raleway'
        >
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            className='absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center'
            style={{ backgroundImage: "url('../images/puppies.jpg')" }}
          >
            <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50' />
          </CardHeader>
          <CardBody className='relative py-14 px-6 md:px-12'>
            <Typography variant='h2' color='white' className='mb-6 font-medium leading-[1.5] font-raleway'>
              UNDER 1 YEAR OLD
            </Typography>
            <Typography variant='h1' className='mb-4 text-white font-raleway'>
              7
            </Typography>
          </CardBody>
        </Card>
        <Card
          shadow={false}
          className='relative grid h-[28rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center m-4 font-raleway'
        >
          <CardHeader
            floated={false}
            shadow={false}
            color='transparent'
            className='absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center'
            style={{ backgroundImage: "url('../images/disableddog.webp')" }}
          >
            <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50' />
          </CardHeader>
          <CardBody className='relative py-14 px-6 md:px-12'>
            <Typography variant='h2' color='white' className='mb-6 font-medium leading-[1.5] font-raleway'>
              DISABLED
            </Typography>
            <Typography variant='h1' className='mb-4 text-white font-raleway'>
              2
            </Typography>
          </CardBody>
        </Card>
      </div>

      <div className='flex justify-center items-center mx-auto'></div>
      {/* footer */}
      <Footer />
    </div>
  );
}

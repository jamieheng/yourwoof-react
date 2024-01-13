import React from 'react';
import GridViewIcon from '@mui/icons-material/GridView';
import PetsIcon from '@mui/icons-material/Pets';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpatialTrackingIcon from '@mui/icons-material/SpatialTracking';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import PostAddIcon from '@mui/icons-material/PostAdd';


export const NavData = [
    {
      title: 'Dashboard',
      icon: <GridViewIcon />,
      link: '/',
    },
    {
      title: 'Pets',
      icon: <PetsIcon />,
      link: '/Pets',
    },
    {
      title: 'Pet Adoption',
      icon: <BookIcon />,
      link: '/Adoption',
    },
    
    {
      title: 'Pet Surrender',
      icon: <PostAddIcon/>,
      link: '/Surrender',
    },
    {
      title: 'Adoption Request',
      icon: <ControlPointIcon/>,
      link: '/AdoptRequest',
    },
    {
      title: 'User',
      icon: <PersonIcon />,
      link: '/Users',
      
    },
    
    {
        title: 'Request',
        icon: <PersonAddAlt1Icon/>,
        link: '/Request',
        
    },
    {
        title: 'Tracking',
        icon: <SpatialTrackingIcon/>,
        link: '/Tracking',
    },
  ];
  

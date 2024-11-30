import React from 'react';
import { Logo } from '../../assests';
import { NavLink } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from 'axios';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const logoutHandler = async () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    try {
      const response = await axios.get(`${SERVER_URL}/api/logout`, { withCredentials: true });
      if (response.data.success) {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='bg-[#201f44] flex items-center justify-between p-3 h-[4.2rem] fixed top-0 w-full z-50'>
      <NavLink to={'/'} className={'flex items-center gap-2'}>
        <img src={Logo} alt="Logo" className='w-32' />
      </NavLink>

      {isLoggedIn ?
        <button className='button' onClick={logoutHandler}>Logout</button>
        :
        <div className='text-white items-center gap-4 hidden sm:flex'>
          <NavLink to={'/login'} className='button'>Login</NavLink>
          <NavLink to={'/signup'} className='button'>Signup</NavLink>
        </div>
      }
    </div>
  );
};


export default Navbar;
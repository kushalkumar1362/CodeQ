import React from 'react';
import { Logo } from '../../assests';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from 'axios';
import { BsCart4 } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from "../../redux/Auth/authSlice";
import { MdOutlineAddBusiness } from "react-icons/md";
import { LightTooltip } from '../../utils/toltip';


const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const role = useSelector(state => state.auth.role);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;

    try {
      const response = await axios.get(`${SERVER_URL}/api/logout`, { withCredentials: true });
      if (response.data.success) {
        dispatch(logoutSuccess());
        toast.success(response.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <nav className='bg-[#201f44] flex items-center justify-between p-5 fixed z-50 w-full h-16 max-h-20 text-white top-0 left-0'>
      <NavLink to={'/'} className={'flex items-center gap-2'}>
        <img src={Logo} alt="Logo" className='w-32 h-12' />
      </NavLink>

      {(isLoggedIn) ?
        <div className='items-center gap-4 hidden sm:flex'>
          {role === "seller" && <Link to={'/add-new-product'}>
            <LightTooltip arrow title="Add New Product">
              <div className='cursor-pointer'>
                <MdOutlineAddBusiness size={30} />
              </div>
            </LightTooltip>
          </Link>}

          {role === "buyer" && <Link to={"/cart"}>
            <div className="relative">
              <LightTooltip arrow title="View Cart">
                <div className='cursor-pointer'>
                  <BsCart4 size={30} />
                </div>
              </LightTooltip>

              {cart.length > 0 ? (
                <div
                  className="absolute -top-1 -right-2 bg-[#009087] text-xs w-5 h-5 flex 
                justify-center items-center animate-bounce rounded-full text-white">
                  {cart.length}
                </div>
              ) : null}
            </div>
          </Link>}
          <div>
          </div>
          <button className='button' onClick={logoutHandler}>Logout</button>
        </div>
        :
        <div className='items-center gap-4 hidden sm:flex'>
          <NavLink to={'/login'} className='button'>Login</NavLink>
          <NavLink to={'/signup'} className='button'>Signup</NavLink>
        </div>
      }
    </nav>
  );
};

export default Navbar;

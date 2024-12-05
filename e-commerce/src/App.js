import axios from 'axios';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { add } from './redux/Product/cartSlice';
import { loginSuccess } from './redux/Auth/authSlice';
import PrivateRoute from './utils/PrivateRoute';

import {
  Home,
  Login,
  Signup,
  Navbar,
  VerifyUser,
  Cart,
  AddProduct,
  ForgotPassword,
  UpdatePassword,
} from './components';

const App = () => {
  const dispatch = useDispatch();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/get-user`, { withCredentials: true });
        if (response.data.success) {
          dispatch(loginSuccess({ name: response.data.name, email: response.data.email, userId: response.data._id, role: response.data.role }));
          response.data.carts.forEach((cart) => {
            dispatch(add({
              id: cart.product_id,
              quantity: cart.quantity
            }));
          })
        }
      } catch (error) {
        if (error.response.status !== 401) {
          console.error(error);
        }
      }
    };
    fetchUser();
  }, [SERVER_URL, dispatch]);

  const publicRoutes = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/verify/:token", element: <VerifyUser /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: '/update-password/:id', element: <UpdatePassword /> },
  ]

  const privateRoutes = [
    { path: "/cart", element: <Cart /> },
    { path: "/add-new-product", element: <AddProduct /> },
  ]

  return (
    <div className="scrollbar-thumb-[#009087] scrollbar-track-[#201F44]">
      <div className="scrollbar-thin h-screen overflow-y-scroll">
        <div className='container mx-auto '>
          <Navbar />
        </div>
        <Routes>
          {publicRoutes.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={element} />
          ))}

          {privateRoutes.map(({ path, element }, index) => (
            <Route
              key={index}
              path={path}
              element={<PrivateRoute >{element}</PrivateRoute>}
            />
          ))}
        </Routes>


      </div >
    </div>
  );
};

export default App;
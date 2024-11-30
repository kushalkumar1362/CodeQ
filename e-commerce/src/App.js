import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  Signup,
  Navbar,
  VerifyUser
} from './components';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem("isLoggedIn")));

  const publicRoutes = [
    { path: "/", element: <Home isLoggedIn={isLoggedIn} /> },
    { path: "/login", element: <Login setIsLoggedIn={setIsLoggedIn} /> },
    { path: "/signup", element: <Signup /> },
    { path: "/verify/:token", element: <VerifyUser /> },
  ]
  return (
    <div className="scrollbar-thumb-[#009087] scrollbar-track-[#201F44]">
      <div className="scrollbar-thin h-screen overflow-y-scroll">
        <div>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
        <Routes>
          {publicRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </div >
    </div>

  );
};

export default App;
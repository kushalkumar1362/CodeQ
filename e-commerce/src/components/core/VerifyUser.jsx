import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyUser = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(5);
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const { token } = useParams();

  useEffect(() => {
    let timerId;
    const verifyUser = async () => {
      const SERVER_URL = process.env.REACT_APP_SERVER_URL;
      try {
        const response = await axios.post(`${SERVER_URL}/api/verify`, { token });
        if (response.data.success) {
          setIsVerified(true);
          setMessage(response.data.message);
          timerId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            if(timeLeft === 0) {
              clearInterval(timerId);
            }
          }, 1020);
          setTimeout(() => {
            clearInterval(timerId);
            navigate('/login');
          }, timeLeft * 1000);
        }
      } catch (error) {
        setMessage(error.response.data.message);
        console.error("error", error.response.data.message);
      }
    };
    verifyUser();
    return () => clearInterval(timerId);
  }, [navigate, timeLeft, token])

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white p-8 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold text-primary'>
          {message ? message : ""}
        </h2>

        {isVerified ? (
          <p className='mt-2'>
            You will be redirected to the login page in {timeLeft} seconds or
            <span
              className='ml-1 text-primary cursor-pointer'
              onClick={() => navigate('/login')}>click here
            </span>.
          </p>
        ) : (

            <p className='mt-2'>
              Click here to signup
              <span className='ml-1 text-primary cursor-pointer' onClick={() => navigate('/signup')}>
              Signup
            </span>
          </p>
        )}

      </div>
    </div >
  );
};

export default VerifyUser;


import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Spinner } from "../"

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastId, setToastId] = useState(null);

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      value: formData.email,
      label: "Email",
    },

    {
      name: "password",
      type: "password",
      placeholder: "Enter Your Password",
      value: formData.password,
      label: "Password",
    }
  ]

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      setIsLoading(true);
      const SERVER_URL = process.env.REACT_APP_SERVER_URL;
      if (toastId) toast.dismiss(toastId);
      const response = await axios.post(`${SERVER_URL}/api/login`, formData, { withCredentials: true });

      if (response.data.success) {
        console.log(response)
        setToastId(toast.success(response.data.message));
        setFormData({
          email: "",
          password: "",
        });
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", true);
        navigate("/");
      }
    } catch (error) {
      setToastId(toast.error(error.response.data.message));
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }

  return (
    <section className='w-full h-screen mt-9 flex items-center justify-center flex-col relative'>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
      {isLoading && <Spinner />}
      </div>
      <div className='md:w-1/2 max-w-[500px] w-[90%] shadow-[0px_0px_5px_3px_rgba(0,_0,_0,_0.25)] rounded-lg p-8 flex flex-col gap-4 bg-white mb-4'>
        <h2 className='text-3xl text-primary font-bold'>Login</h2>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          {inputs.map((input, index) => (
            <div key={index} className='flex flex-col gap-1'>
              <label className='text-primary font-medium'>{input.label}</label>
              <input
                name={input.name}
                value={input.value}
                onChange={changeHandler}
                type={input.type}
                placeholder={input.placeholder}
                className={`border-[3px] border-gray-400 rounded-md p-2 focus:outline-none  focus:border-[#009087]`}
                required />
            </div>
          ))}
          <button className='button'>Login</button>
          <p className='text-center '>Don't have an account?
            <span className='ml-2'>
              <Link to="/signup" className='text-primary font-medium hover:underline'>Sign Up</Link>
            </span>
          </p>
        </form>
      </div>

    </section>
  );
};

export default Login;

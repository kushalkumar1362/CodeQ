import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Spinner } from "../"

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const navigate = useNavigate();
  const [toastId, setToastId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      value: formData.email,
      label: "Email",
    },
    {
      name: "name",
      type: "text",
      placeholder: "Enter Your name",
      value: formData.name,
      label: "Name",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Your Password",
      value: formData.password,
      label: "Password",
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Re-Enter Your Password",
      value: formData.confirmPassword,
      label: "Confirm Password",
    },
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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    if (toastId) toast.dismiss(toastId);
    
    try {
      setIsSubmitting(true);
      setIsLoading(true);
      const response = await axios.post(`${SERVER_URL}/api/signup`, formData);
      if (response.data.success) {
        setToastId(toast.success(response.data.message));
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);

      console.error(error);
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }

  return (
    <section className='w-full h-full mt-9 flex items-center justify-center flex-col relative'>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
        {isLoading && <Spinner />}
      </div>
      <div className='md:w-1/2 max-w-[500px] w-[90%] shadow-[0px_0px_5px_3px_rgba(0,_0,_0,_0.25)] rounded-lg p-8 flex flex-col gap-4 bg-[#fff] mb-4 mt-10'>
        <h2 className='text-3xl text-primary font-bold'>Signup</h2>
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
                required
                className={`border-[3px] border-gray-400 rounded-md p-2 focus:outline-none focus:border-[#009087]`} />
            </div>
          ))}
          <button className='button' disabled={isSubmitting}>Signup</button>
          <p className='text-center '>Don't have an account?
            <span className='ml-2'>
              <Link to="/login" className='text-primary font-medium hover:underline'>Sign In</Link>
            </span>
          </p>
        </form>
      </div>

    </section>
  );
};

export default Signup;


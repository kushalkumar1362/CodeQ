import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { Spinner } from "../"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentTab, setCurrentTab] = useState("Buyer");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const validations = {
    hasLowercase: /[a-z]/.test(formData.password),
    hasUppercase: /[A-Z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasMinLength: formData.password.length >= 8,
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

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
      type: showPassword ? "text" : "password",
      placeholder: "Enter Your Password",
      value: formData.password,
      label: "Password",
    },
    {
      name: "confirmPassword",
      type: showConfirmPassword ? "text" : "password",
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
    const confirm = event.target.name === "confirmPassword";
    if (confirm && formData.password !== event.target.value) {
      setConfirmPasswordError(true);
    }
    else {
      setConfirmPasswordError(false);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (
      !validations.hasLowercase ||
      !validations.hasUppercase ||
      !validations.hasNumber ||
      !validations.hasMinLength
    ) {
      toast.error("Password is not strong enough");
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    if (toastId) toast.dismiss(toastId);

    const data = { ...formData, currentTab };
    try {
      setIsSubmitting(true);
      setIsLoading(true);
      const response = await axios.post(`${SERVER_URL}/api/signup`, data);
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
    <section className='w-full h-full flex items-center justify-center flex-col relative'>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
        {isLoading && <Spinner />}
      </div>
      <div className='md:w-1/2 max-w-[500px] w-[90%] shadow-[0px_0px_5px_3px_rgba(0,_0,_0,_0.25)] rounded-lg p-8 flex flex-col gap-4 bg-[#fff] absolute top-[16%]'>

        <div className="flex justify-center gap-1 mb-4 bg-[#93d8d3] p-1 rounded-full w-full border-[1.5px] border-[#009087]">
          <button className={`w-full px-5 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out ${currentTab === "Buyer" ? "bg-[#009087] text-white animate-fade-left animate-once" : "text-[#009087]"} $`} onClick={() => { setCurrentTab("Buyer") }}>Buyer</button>
          <button className={`w-full px-5 py-2 rounded-full font-semibold transition-all duration-300 ease-in-out ${currentTab === "Seller" ? "bg-[#009087] text-white animate-fade-right animate-once" : "text-[#009087]"} $`} onClick={() => { setCurrentTab("Seller") }}>Seller</button>
        </div>
        <h2 className='text-3xl text-primary font-bold text-center'>Signup</h2>

        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          {inputs.map((input, index) => (
            <div key={index} className='flex flex-col gap-1'>
              <label className='text-primary font-medium'>{input.label}</label>
              <div className='relative'>
                <input
                  name={input.name}
                  value={input.value}
                  onChange={changeHandler}
                  type={input.type}
                  placeholder={input.placeholder}
                  required
                  className={`border-[3px] border-gray-400 rounded-md p-2 focus:outline-none focus:border-[#009087] w-full`} />
                {input.name === "password" && (
                  <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                    {showPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#009087" onClick={togglePassword} />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#009087" onClick={togglePassword} />
                    )}
                  </div>
                )}

                {input.name === "confirmPassword" && (
                  <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'>
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#009087" onClick={toggleConfirmPassword} />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#009087" onClick={toggleConfirmPassword} />
                    )}
                  </div>
                )}
              </div>
              {input.name === "password" && (
                <ul className="list-none p-0">
                  <li className={`${validations.hasLowercase ? "text-green-600" : "text-red-500"}`}>
                    {validations.hasLowercase ? "✔" : "✖"} At least <span className='font-semibold'>one lowercase letter</span>
                  </li>
                  <li className={`${validations.hasUppercase ? "text-green-600" : "text-red-500"}`}>
                    {validations.hasUppercase ? "✔" : "✖"} At least <span className='font-semibold'>one uppercase letter</span>
                  </li>
                  <li className={`${validations.hasNumber ? "text-green-600" : "text-red-500"}`}>
                    {validations.hasNumber ? "✔" : "✖"} At least <span className='font-semibold'>one number</span>
                  </li>
                  <li className={`${validations.hasMinLength ? "text-green-600" : "text-red-500"}`}>
                    {validations.hasMinLength ? "✔" : "✖"} Minimum <span className='font-semibold'>8 characters</span>
                  </li>
                </ul>
              )}

              {input.name === "confirmPassword" && (
                <div className='p-0'>
                  {confirmPasswordError && (
                    <span className='text-red-500 text-sm'>Password and Confirm password is not matched</span>
                  )
                  }
                </div>
              )}
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


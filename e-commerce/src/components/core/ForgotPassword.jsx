import React, { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom"
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Spinner } from "../index"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const [loading, setLoading] = useState(false);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  async function handleOnSubmit(e) {
    e.preventDefault()
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/api/forgot-password`, { email }, { withCredentials: true });
      if (response.data.success) {
        setEmailSent(true);
        toast.success(response.data.message);
      }
    }
    catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center relative">
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
        {loading && <Spinner />}
      </div>
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-primary">
          {!emailSent ? "Reset your password" : "Check email"}
        </h1>
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-slate-700">
          {!emailSent
            ? "We’ll send a password reset link to this email if it matches an existing Talent Pool account."
            : `We have sent the reset email to ${email}`}
        </p>
        <form onSubmit={handleOnSubmit}>
          {!emailSent && (
            <label className="w-full">
              <p className="text-primary font-medium mb-1 text-[0.875rem] leading-[1.375rem]">
                Email Address
              </p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="border-[3px] border-gray-400 rounded-md p-2 focus:outline-none  focus:border-[#009087] w-full"
                required
              />
            </label>
          )}
          <button
            type="submit"
            className="mt-6 button"
          >
            {!emailSent ? "Sumbit" : "Resend Email"}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/login" className="no-underline">
            <p className="flex items-center gap-x-2 text-gray-500 hover:text-primary">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
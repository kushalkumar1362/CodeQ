import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Spinner } from "../index"

function UpdatePassword() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleOnSubmit(e) {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Password and Confirm password is not matched");
      return;
    }
    const token = location.pathname.split("/").at(-1);
    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/api/update-password`, { password, confirmPassword, token }, { withCredentials: true });
      console.log("RESET Password RESPONSE ... ", response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      }

    }
    catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center relative">
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
        {loading && <Spinner />}
      </div>
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-primary text-[1.875rem] font-semibold leading-[2.375rem]">
          Choose new password
        </h1>
        <p className="my-4 text-[1.125rem] leading-[1.625rem] text-gray-500">
          Almost done. Enter your new password and youre all set.
        </p>
        <form onSubmit={handleOnSubmit}>
          <label className="relative mt-3 block">
            <p className="text-primary font-medium mb-1 text-[0.875rem] leading-[1.375rem]">
              New Password
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="border-[3px] border-gray-400 rounded-md p-2 focus:outline-none  focus:border-[#009087] w-full"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[2.4rem] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#009087" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#009087" />
              )}
            </span>
          </label>
          <label className="relative mt-3 block">
            <p className="text-primary font-medium mb-1 text-[0.875rem] leading-[1.375rem]">
              Confirm New Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="border-[3px] border-gray-400 rounded-md p-2 focus:outline-none  focus:border-[#009087] w-full"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[2.4rem] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#009087" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#009087" />
              )}
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 button"
          >
            Reset Password
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
export default UpdatePassword;
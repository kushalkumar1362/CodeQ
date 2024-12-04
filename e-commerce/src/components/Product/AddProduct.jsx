import axios from 'axios';
import React, { useState } from 'react';
import { Spinner } from "../";
import { toast } from "react-hot-toast";
import {useNavigate} from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    product_images: [],
    product_quantity: '',
    product_category: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const inputs = [
    {
      name: "product_name",
      type: "text",
      placeholder: "Enter Product Name",
      value: formData.product_name,
      label: "Product Name",
    },
    {
      name: "product_description",
      type: "text",
      placeholder: "Enter Product Description",
      value: formData.product_description,
      label: "Product Description",
    },
    {
      name: "product_price",
      type: "number",
      placeholder: "Enter Product Price",
      value: formData.product_price,
      label: "Product Price",
      min: 0,
    },
    {
      name: "product_images",
      type: "file",
      placeholder: "Upload Product Images",
      label: "Product Images",
      multiple: true,
      accept: ".png, .jpg, .jpeg"
    },
    {
      name: "product_quantity",
      type: "number",
      placeholder: "Enter Product Quantity",
      value: formData.product_quantity,
      label: "Product Quantity",
    },
    {
      name: "product_category",
      type: "text",
      placeholder: "Enter Product Category",
      value: formData.product_category,
      label: "Product Category",
    }
  ];

  const changeHandler = (event) => {
    const { name, files, value } = event.target;
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
    if (name === 'product_images') {
      const selectedFiles = Array.from(files).filter((file) =>
        ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
      );
      if (files.length > selectedFiles.length) {
        setErrors((prev) => ({
          ...prev,
          product_images: "Please upload valid image file(s).",
        }))
        return;
      }
      if (files.length > 5) {
        setErrors((prev) => ({
          ...prev,
          product_images: "You can upload a maximum of 5 images.",
        }))
        return;
      }
      setFormData((prev) => ({
        ...prev,
        product_images: [...prev.product_images, ...selectedFiles],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === "product_images" && Array.isArray(value)) {
        value.forEach((file) => formDataToSend.append(key, file));
      } else {
        formDataToSend.append(key, value);
      }
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/add-new-product`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          product_name: '',
          product_description: '',
          product_price: '',
          product_images: [],
          product_quantity: '',
          product_category: '',
        });
        navigate('/');
        setErrors({});
      } else {
        setErrors(response.data.errors);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center flex-col justify-center relative top-[16%] p-4">
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
        {isSubmitting && <Spinner />}
      </div>
      <form
        onSubmit={submitHandler}
        className="container max-w-4xl shadow-[0px_0px_5px_3px_rgba(0,_0,_0,_0.25)] rounded-lg p-8 flex flex-col gap-4 bg-white mb-4 items-center justify-center"
      >
        <h1 className="text-3xl font-bold mb-4 text-primary">Add Product</h1>
        {inputs.map((input, index) => (
          <label className='flex flex-col w-full' key={index}>
            <span className='text-primary font-medium text-2xl'>{input.label}
              <span className='text-sm'>{input.name === 'product_images' && ' (Only PNG, JPEG, and JPG files are allowed, Max 5 files)'}</span>
            </span>
            {input.name === 'product_description' ? (
              <textarea
                name={input.name}
                value={formData[input.name]}
                onChange={changeHandler}
                className="border-[3px] border-gray-400 rounded-md p-2 focus:outline-none focus:border-[#009087]"
                placeholder={input.placeholder}
                rows={3}
                required
              />
            ) : (
              <input
                type={input.type}
                name={input.name}
                onChange={changeHandler}
                className="border-[3px] border-gray-400 rounded-md p-2 focus:outline-none focus:border-[#009087]"
                placeholder={input.placeholder}
                multiple={input.multiple || false}
                min={input.min || 0}
                accept={input.accept || ''}
                required
              />
            )}
            {errors?.[input.name] && (
              <div className="text-red-500 ml-1">{errors[input.name]}</div>
            )}
          </label>
        ))}
        <button type="submit" className="button w-fit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;


import React, { useEffect, useMemo, useState } from 'react';
import { BiSolidCartAdd } from "react-icons/bi";
import axios from 'axios';
import { add, remove } from '../../redux/Product/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RiSubtractFill, RiAddFill } from "react-icons/ri";

const ProductDetails = ({ product, setShowModal }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const images = useMemo(() => product.product_images, [product.product_images]);
  const [currIndex, setCurrIndex] = useState(0);
  const [currImage, setCurrImage] = useState(images[0]);
  const carts = useSelector(state => state.cart);
  // const userId = useSelector(state => state.auth.userId);
  const role = useSelector(state => state.auth.role);

  const dispatch = useDispatch();

  useEffect(() => {
    const index = carts.findIndex(cart => cart.id === product._id);
    setCurrIndex(index);
  }, [carts, product._id]);

  const increaseQuantity = async () => {
    try {
      const data = { productId: product._id, quantity: 1 };
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/update-cart-quantity`, data, { withCredentials: true });

      if (response.data.success) {
        dispatch(add({ id: carts[currIndex].id, quantity: 1 }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQuantity = async () => {
    try {
      const data = { productId: product._id, quantity: -1 };
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/update-cart-quantity`, data, { withCredentials: true });

      if (response.data.success) {
        dispatch(add({ id: carts[currIndex].id, quantity: -1 }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async () => {
    try {
      const data = { productId: product._id, quantity: 1 };
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/add-to-cart`, data, { withCredentials: true });

      if (response.data.success) {
        dispatch(add({ id: product._id, quantity: 1 }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  const removeFromCart = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/remove-from-cart`, { productId: product._id }, { withCredentials: true });

      if (response.data.success) {
        dispatch(remove({ id: product._id }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-screen container mx-auto px-6 flex h-full">
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className="relative w-[80%] my-6 mx-auto max-w-6xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-4 border-b border-solid border-blueGray-200 rounded-t">
              <h2 className="text-3xl font-bold text-primary">{product.product_name}</h2>
              <button
                className="ml-auto bg-transparent border-0 opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-red-500 opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none ">
                  ×
                </span>
              </button>
            </div>

            <div className="relative p-6 flex flex-col lg:flex-row text-lg leading-relaxed gap-4 max-h-[280px] overflow-y-scroll scrollbar-none">
              <div className='w-full lg:w-[28%] -mt-1'>
                <div className='flex flex-col items-start gap-4'>
                  <img
                    src={`${SERVER_URL}/uploads/${currImage?.split('\\').pop()}`}
                    alt={product.product_name}
                    className="w-full h-[180px] rounded-md object-contain"
                  />
                  <div className='flex gap-2 items-center justify-center flex-wrap'>
                    {images.map((image) => (
                      image !== currImage && (
                        <img
                          key={image}
                          src={`${SERVER_URL}/uploads/${image?.split('\\').pop()}`}
                          alt={product.product_name}
                          className="lg:w-[58px] w-[100px] object-contain p-[3px] hover:scale-125 hover:border-2 hover:border-[#009087] transition duration-300 ease-in-out cursor-pointer animate-fade-in animate-delay-1000"
                          onClick={() => setCurrImage(image)}
                        />
                      )
                    ))}
                  </div>
                </div>
              </div>

              <div className='w-full lg:w-[68%] lg:overflow-y-scroll lg:scrollbar-none'>
                <p className="mb-4 text-gray-700 ">{product.product_description}</p>
                <p className="my-4 text-2xl font-semibold text-primary">
                  <span className="text-gray-700">₹</span>
                  {Number(product.product_price).toLocaleString()}
                </p>
                <p className="font-semibold text-primary flex items-center gap-2 my-4">
                  <span className="text-gray-700">In Stock:</span>
                  {Number(product.product_quantity).toLocaleString()}
                </p>
              </div>
            </div>

            {(role === "buyer") && <div className="flex items-center justify-end p-4 border-t border-solid border-blueGray-200 rounded-b mt-4">
              {(currIndex !== -1) ? (
                <div className='flex flex-row gap-8'>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      className={`px-4 py-2 bg-gray-200 hover:bg-[#009087] hover:text-white transition duration-300 ease-in-out text-primary h-full ${carts[currIndex]?.quantity === 1 ? "" : "cursor-pointer"}`}
                      onClick={decreaseQuantity}
                      disabled={carts[currIndex]?.quantity === 1}
                    >
                      <RiSubtractFill />
                    </button>
                    <p className="text-primary px-4">{carts[currIndex]?.quantity}</p>
                    <button className={`px-4 py-2 bg-gray-200 hover:bg-[#009087] hover:text-white transition duration-300 ease-in-out text-primary h-full  ${carts[currIndex]?.quantity === product.product_quantity ? "" : "cursor-pointer"}`}
                      onClick={increaseQuantity}
                      disabled={carts[currIndex]?.quantity === product.product_quantity}

                    >
                      <RiAddFill />
                    </button>
                  </div>

                  <button
                    className="max-w-[11rem] border bg-[#009087] text-white hover:bg-transparent border-[#009087] hover:text-[#009087] transition duration-300 ease-in-out rounded-md font-medium px-4 py-2 flex items-center justify-center"
                    onClick={removeFromCart}>
                    <span>Remove From Cart</span>
                  </button>
                </div>)
                :
                <button
                  className="w-[11rem] max-w-[11rem] border bg-[#009087] text-white hover:bg-transparent border-[#009087] hover:text-[#009087] transition duration-300 ease-in-out rounded-md font-medium px-4 py-2 flex items-center justify-center"
                  onClick={addToCart}>
                  <BiSolidCartAdd className="mr-2" size={25} />
                  <span>Add to Cart</span>
                </button>
              }
            </div>}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductDetails;



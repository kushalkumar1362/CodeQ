import React, { useState } from 'react';
import { BiSolidCartAdd } from "react-icons/bi";
import { ProductDetails } from '../';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { add, remove } from '../../redux/Product/cartSlice';
import { LightTooltip } from '../../utils/toltip';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const ProductCard = ({ product }) => {

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const carts = useSelector(state => state.cart);
  // const userId = useSelector(state => state.auth.userId);
  const role = useSelector(state => state.auth.role);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleOpen = () => setShowModal((cur) => !cur);
  const addToCart = async () => {
    if (!isLoggedIn) {
      toast("Please Login to add a item in the cart")
      navigate('/login');
      return;
    }
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
    <>
      <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-auto h-auto p-6 mt-11">
        <LightTooltip title="View Details" placement="top-end" arrow>
          <div className='cursor-pointer lg:h-[280px]' onClick={handleOpen}>
            <h3 className="text-2xl font-semibold mb-3 text-primary">
              {product.product_name}
            </h3>
            <img
              src={`${SERVER_URL}/uploads/${product.product_images[0].split('\\').pop()}`}
              loading='lazy'
              alt={product.product_name}
              className="h-[70%] w-full rounded-md object-contain"
            />
            <div>
              {product.product_quantity <= 0 && (
                <div className="absolute inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center rounded-lg">
                  <p className="text-lg font-semibold text-white tracking-wide">Out of Stock</p>
                </div>
              )}
              <p className="text-sm text-gray-600 mt-4 line-clamp-2">
                {product.product_description.length > 50
                  ? product.product_description.slice(0, 100) + '...'
                  : product.product_description}
              </p>
            </div>
          </div>
        </LightTooltip>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center">

            <span className="text-xl font-bold text-primary">
              ₹{product.product_price.toLocaleString()}
            </span>

            {(role === "buyer" || !isLoggedIn) && <div className="flex">
              {
                carts.find(cart => cart.id === product._id) ?
                  <button className="button" onClick={removeFromCart}>
                    <p className='flex items-center justify-center'>
                      <span className='text-[16px]'>
                        Remove From Cart
                      </span>
                    </p>
                  </button>
                  :
                  <button className="button" onClick={addToCart}>
                    <p className='flex items-center justify-center'>
                      <BiSolidCartAdd className="mr-1" size={20} />
                      <span className='text-[16px] w-[110px]'>
                        Add To Cart
                      </span>
                    </p>
                  </button>}

            </div>}
          </div>
        </div>
      </div>

      {showModal &&
        <>
          <ProductDetails product={product} setShowModal={setShowModal} />
          <div className="opacity-100 fixed inset-0 z-40 backdrop-blur-sm"></div>
        </>
      }
    </>
  );
};

export default ProductCard;


import React, { useState } from 'react';
import { BiSolidCartAdd } from "react-icons/bi";
import { ProductDetails } from '../';
const ProductCard = ({ product }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal((cur) => !cur);

  return (
    <>
      <div className="relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-auto h-auto p-6 mt-10">
        <div className='cursor-pointer lg:h-[280px]' onClick={handleOpen}>
          <img
            src={`${SERVER_URL}/uploads/${product.product_images[0].split('\\').pop()}`}
            loading='lazy'
            alt={product.product_name}
            className="h-[60%] w-full rounded-md"
          />
          <div>
            {product.product_quantity <= 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <p className="text-xl font-bold text-white uppercase">Out of Stock</p>
              </div>
            )}
            <h3 className="text-lg font-semibold mt-6 text-primary">
              {product.product_name}
            </h3>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {product.product_description.length > 50
                ? product.product_description.slice(0, 100) + '...'
                : product.product_description}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center">

            <span className="text-xl font-bold text-primary">
              ₹{product.product_price.toLocaleString()}
            </span>

            <div className="flex">
              <button className="button">
                <p className='flex items-center justify-center'>

                  <BiSolidCartAdd className="mr-1" size={20} />
                  <span className='text-[16px]'>
                    Add to Cart
                  </span>
                </p>
              </button>
            </div>
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


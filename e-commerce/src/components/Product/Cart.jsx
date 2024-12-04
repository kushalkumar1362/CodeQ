/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ProductCard, Spinner } from '../';
import { useSelector } from 'react-redux';
import axios from 'axios';


const Cart = () => {
  const [products, setProducts] = useState([]);
  const carts = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/get-cart-product-by-ids`, {
          params: { carts: carts },
          withCredentials: true
        });
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error(error)
      }
      finally {
        setIsLoading(false);
      }

    }
    getProducts();

  }, [carts]);
  return (
    <div className='container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen relative'>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10'>
        {isLoading && <Spinner />}
      </div>
      {!isLoading && products?.length === 0 && <h1 className='text-4xl font-bold text-primary text-center'>Cart is Empty</h1>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} className="shadow-lg" />
        ))}
      </div>
    </div>
  );
};

export default Cart;
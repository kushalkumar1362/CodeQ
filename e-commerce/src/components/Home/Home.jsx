/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Spinner, ProductCard } from "../"

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;


  const getAllProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/get-all-product`, { withCredentials: true });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [SERVER_URL]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <div className='container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen relative scroll-smooth scrollbar-track-current'>
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} className="shadow-lg" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;


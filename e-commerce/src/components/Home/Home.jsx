/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Spinner, ProductCard } from "../"

const Home = ({ isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/get-all-product`,
        { withCredentials: true });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className='px-4 py-12 flex flex-col items-center justify-center min-h-screen relative'>
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} className="shadow-lg" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;


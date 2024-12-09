import React from 'react';
import { CommunityImg, Chevron } from '../../../assets/LeftSection';
import { Link } from 'react-router-dom';

const CommuntiesPage = () => {
  return (
    <div className='flex items-center justify-center flex-col animate-fade-down animate-duration-[600ms]'>
      <div className='flex items-center justify-center flex-col gap-5 my-[66px] px-2'>
        <div className='w-[350px] flex items-center justify-center'>
          <CommunityImg />
        </div>
        <h1 className='text-[24px] text-[#e9edef] leading-9 font-bold text-center'>Stay connected with a community</h1>
        <p className='text-[14px] text-[#d1d7db] leading-5 font-normal text-center w-[320px]'>Communities bring members together in topic-based groups, and make it easy to get admin announcements. Any community you're added to will appear here.</p>

        <Link to={'/'} className='text-[#00a884] text-[14px] font-normal hover:underline'>
          <div className='flex flex-row items-center justify-center mt-[-20px]'>
            <span > See example communities</span>
            <Chevron />
          </div>
        </Link>
      </div>
      <button className='mt-[-36px] bg-[#00A884] text-[#111b21] py-[6px] px-6 rounded-full hover:bg-[#06CF9C]'>
        <span className='text-[14px] font-medium'>Start your community</span>
      </button>
    </div>
  );
};

export default CommuntiesPage;
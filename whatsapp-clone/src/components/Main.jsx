import React from 'react';
import LeftSection from './LeftSection/LeftSection';
import Sidebar from './Sidebar/Sidebar';
import RightSection from './RightSection/RightSection';

const Main = () => {
  return (
    <div className='mx-auto max-w-[1368px] flex w-full h-full bg-[#222E35] font-sans text-[#fff]'>
      <Sidebar />
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default Main;


import React from 'react';
import LeftSection from './components/Home/LeftSection';
import Sidebar from './components/Home/Sidebar';
import RightSection from './components/Home/RightSection';

const App = () => {
  return (
    <div className='w-screen h-screen bg-[#222E35] font-sans text-[#fff]'>
      <Sidebar />
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default App;


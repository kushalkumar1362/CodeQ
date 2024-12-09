/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import LeftSection from './LeftSection/LeftSection';
import Sidebar from './Sidebar/Sidebar';
import RightSection from './RightSection/RightSection';

import chatListData from '../Dummy/chatlist';
import channelsData from '../Dummy/channelList';
import { setChannels, setChats } from '../redux';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setChats(chatListData));
    dispatch(setChannels(channelsData));
  }, [])

  return (
    <div className='mx-auto max-w-[1368px] flex w-full h-full bg-[#222E35] font-sans text-[#fff] overflow-x-auto'>
      <Sidebar />
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default Main;


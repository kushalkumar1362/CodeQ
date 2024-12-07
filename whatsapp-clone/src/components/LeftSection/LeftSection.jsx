import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowDown } from "react-icons/fa";
import { NewChatIcon, MenuIcon, SearchIcon, CrossIcon } from '../../assets/LeftSection'
import { HeaderTooltip } from '../../utils/tooltip';
import ChatList from './ChatList';

import chatListData from '../../Dummy/chatlist';
import channelsData from '../../Dummy/channelList';


const LeftSection = () => {
  const active = useSelector((state) => state.active.active);
  const [search, setSearch] = useState('');
  const [searchIcon, setSearchIcon] = useState(false);
  const [searchPlaceholder, setSearchPlaceholder] = useState('Search');
  const [filterTab, setFilterTab] = useState('All');

  const filter = [
    'All',
    'Unread',
    'Favorites',
    'Groups',
  ]

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchIconHandler = () => {
    setSearchIcon(!searchIcon);
  };
  return (
    <div className='w-[410px] min-w-[337px] max-w-[480px]  pt-4 bg-[#111B21] text-[#E9EDEF] overflow-y-hidden pb-8
    '>

      <div className='pl-4 pr-[10px]'>
        <header>
          <div className='flex items-center justify-between mb-1'>
            <h1 className='font-bold text-[22px] leading-8'>{active.charAt(0).toUpperCase() + active.slice(1)}</h1>
            <div className='flex items-center gap-5'>
              <HeaderTooltip title="New Chat" placement="bottom-start">
                <NewChatIcon color='#AEBAC1' />
              </HeaderTooltip>
              <HeaderTooltip title="Menu" placement="bottom-start">
                <MenuIcon color='#AEBAC1' />
              </HeaderTooltip>

            </div>
          </div>
        </header>

        <main className='mt-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 w-full bg-[#202C33] rounded-md pl-3'>
              <div className={`transition-transform duration-300 ${searchIcon ? 'rotate-45' : 'rotate-0'}`}>
                {searchIcon ? <FaArrowDown color='#01a683' className='rotate-45' /> : <SearchIcon color='#AEBAC1' />}
              </div>
              <input
                type="text"
                value={search}
                placeholder={searchPlaceholder}
                className='w-full bg-transparent border-none outline-none text-[#AEBAC1] placeholder:text-[#AEBAC1] p-[5px] text-[16px]'
                onChange={changeHandler}
                onClick={searchIconHandler}
              />
              {search && (
                <div>
                  <CrossIcon color='#AEBAC1' />
                </div>
              )}
            </div>
          </div>

          <div>
            <p className='flex items-center gap-2 mt-2 text-[#AEBAC1] text-[14px] cursor-pointer'>{filter.map((tab) =>
              <span key={tab}
                onClick={() => {
                  setSearchPlaceholder("Search " + tab + " chats");
                  setFilterTab(tab)
                }}
                className={` py-1 text-[#AEBAC1] text-[15px] px-3 rounded-full
                ${filterTab === tab ? 'bg-[#0A332C] text-[#01a683]' : 'bg-[#202C33] hover:bg-[#26353D]'}`
                }
              >
                {tab}
              </span>)}
            </p>
          </div>
        </main>
      </div>

      {active === 'chats' && <ChatList listData={chatListData} />}
      {active === 'status' && <div>status</div>}
      {active === 'channels' && <ChatList listData={channelsData} />}
      {active === 'communities' && <div>communities</div>}
    </div >
  );
};

export default LeftSection;


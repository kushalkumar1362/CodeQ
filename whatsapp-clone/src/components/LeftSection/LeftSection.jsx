/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaArrowDown } from "react-icons/fa";

import { NewChatIcon, MenuIcon, SearchIcon, CrossIcon, PlusIcon } from '../../assets/LeftSection'
import { HeaderTooltip } from '../../utils/tooltip';
import ChatList from './Chats/ChatList';

import StatusPage from './Status/StatusPage';
import CommuntiesPage from './Communties/CommuntiesPage';

import { CustomMenu } from '../../utils/customMenu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';

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

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchIconHandler = () => {
    setSearchIcon(!searchIcon);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchIcon && !event.target.closest('.search-icon')) {
        setSearchIcon(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [searchIcon]);

  return (
    <div className={`w-[337px] lg:w-[410px] min-w-[337px] max-w-[480px] pt-4 bg-[#111B21] text-[#E9EDEF] overflow-y-hidden pb-8`}>

      <div className='pl-4 pr-[10px]'>
        <header>
          <div className='flex items-center justify-between mb-1'>
            <h1 className='font-bold text-[22px] leading-8'>{active.charAt(0).toUpperCase() + active.slice(1)}</h1>
            <div className='flex items-center gap-5'>
              {active === 'chats' &&
                <HeaderTooltip title="New Chat" placement="bottom-start">
                  <NewChatIcon color='#AEBAC1' />
                </HeaderTooltip>
              }
              {(active === 'status' || active === 'channels') &&
                <HeaderTooltip title="Add Status" placement="bottom-start">
                  <PlusIcon color='#AEBAC1' />
                </HeaderTooltip>
              }
              {(active === 'chats') &&
                <div>
                  <HeaderTooltip title="Menu" placement="bottom-start">
                    <MenuIcon
                      color='#AEBAC1'
                      onClick={handleClick}
                      cursor={'pointer'}
                      className={`flex items-center justify-center p-2 w-10 h-10 rounded-full ${anchorEl ? 'bg-[#2A3942]' : ''}`}
                    />
                  </HeaderTooltip>
                  <CustomMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose}>New Group</MenuItem>
                    <MenuItem onClick={handleClose}>Starred messages</MenuItem>
                    <MenuItem onClick={handleClose}>Selected chats</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                    <Divider sx={{ my: 0.5, background: '#334048' }} />
                    <MenuItem onClick={handleClose}>Get WhatsApp for Windows</MenuItem>
                  </CustomMenu>
                </div>
              }

              {(active === 'status') &&
                <div>
                  <HeaderTooltip title="Menu" placement="bottom-start">
                    <MenuIcon
                      color='#AEBAC1'
                      onClick={handleClick}
                      cursor={'pointer'}
                      className={`flex items-center justify-center p-2 w-10 h-10 rounded-full ${anchorEl ? 'bg-[#2A3942]' : ''}`}
                    />
                  </HeaderTooltip>
                  <CustomMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleClose}>Status Privacy</MenuItem>
                  </CustomMenu>
                </div>
              }
            </div>
          </div>
        </header>

        <main className='mt-4'>
          <div className='flex items-center justify-between'>
            {(active === 'chats' || active === 'channels') && <div className='flex items-center gap-3 w-full bg-[#202C33] rounded-md pl-3'>
              <div className={`transition-transform duration-300 ${searchIcon ? 'rotate-45' : 'rotate-0'}`}>
                {searchIcon ? <FaArrowDown color='#01a683' className='rotate-45' /> : <SearchIcon color='#AEBAC1' />}
              </div>
              <input
                type="text"
                value={search}
                placeholder={active === 'chats' ? searchPlaceholder : 'Search'}
                className='w-full bg-transparent border-none outline-none text-[#AEBAC1] placeholder:text-[#AEBAC1] p-[5px] text-[16px] search-icon'
                onChange={changeHandler}
                onClick={searchIconHandler}
              />
              {search && (
                <div>
                  <CrossIcon color='#AEBAC1' onClick={() => setSearch('')} />
                </div>
              )}
            </div>}
          </div>

          {active === 'chats' && <div>
            <p className='flex items-center gap-2 mt-2 text-[#AEBAC1] text-[14px] cursor-pointer'>{filter.map((tab) =>
              <span key={tab}
                onClick={() => {
                  setSearchPlaceholder("Search " + tab + " chats");
                  setFilterTab(tab)
                }}
                className={`py-1 text-[#AEBAC1] text-[15px] px-3 rounded-full  ${filterTab === tab ? 'bg-[#0A332C] text-[#01a683]' : 'bg-[#202C33] hover:bg-[#26353D]'}`
                }
              >
                {tab}
              </span>)}
            </p>
          </div>}
        </main>
      </div >

      {active === 'chats' && <ChatList />}
      {active === 'status' && <StatusPage />}
      {active === 'channels' && <ChatList />}
      {active === 'communities' && <CommuntiesPage />}
    </div >
  );
};

export default LeftSection;



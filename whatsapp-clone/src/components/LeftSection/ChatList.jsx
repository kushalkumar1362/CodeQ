import React from 'react';
import { LockIcon } from '../../assets/RightSection';
import { HeaderTooltip } from '../../utils/tooltip';
import { useSelector } from 'react-redux';
import DiscoverChannels from './DiscoverChannels';

const ChatList = ({ listData }) => {
  const active = useSelector((state) => state.active.active);

  return (
    <div className='scrollbar-thumb-[#202C33] scrollbar-track-[#111B21]'>
      <div className='mt-2 overflow-y-auto h-[calc(100vh-150px)] scrollbar-thin'>
        {listData.map((data, index) => (
          <React.Fragment key={data.id}>
            <div className='hover:bg-[#2A3942]'>
              <div className='flex items-center gap-3 py-2 px-4  cursor-pointer w-full'>
                <img src={data.profilePicture} alt='' className='w-[48px] h-[48px] rounded-full' />
                <div className='w-full flex flex-col items-center justify-center py-1 pl-3'>

                  <div className='w-full flex flex-row justify-between items-center'>
                    <p className='text-[#e9e8ef] text-[16px]'>{data.name}</p>
                    <p className={`text-[#8696a0] text-[12px] font-normal leading-4 ${data.unreadCount > 0 ? 'text-[#00A884]' : ''}`}>{data.timestamp}</p>
                  </div>
                  <div className='flex w-full flex-row items-center justify-between'>
                    <HeaderTooltip title={data.lastMessage} placement="bottom-start">
                      <p className={`text-[14px] font-normal leading-5
                    ${data.unreadCount > 0 ? 'text-[#d1d7db]' : 'text-[#8696a0]'}`}>
                        {data.lastMessage}
                      </p>
                    </HeaderTooltip>
                    <div className='flex flex-row-reverse items-center justify-center gap-2'>
                      {data.unreadCount > 0 && <span className='text-[#202C33] bg-[#00A884] rounded-full w-[20px] h-[20px] flex items-center justify-center text-[12px] font-medium'>{data.unreadCount}</span>}
                    </div>
                  </div>
                </div>

              </div>

              {index < listData.length - 1 && <div className='w-[75%] mx-[22%] bg-[#2A3942] h-[1px]'>
              </div>}
              {active === 'chats' && <div className='w-[75%] mx-[22%] bg-[#2A3942] h-[1px]'></div>}
            </div>
          </React.Fragment>
        ))}
        {active === 'channels' && <DiscoverChannels />}
        {active === 'chats' &&
          <p className='text-[#d1d7db] text-[12px] font-normal text-center leading-4 py-4 flex items-center justify-center gap-1'>
            <LockIcon color='#d1d7db' width={14} height={14} />
            Your personal messages are <span className='text-blue'>end-to-end encrypted</span></p>
        }

      </div>
    </div>
  );
};

export default ChatList;
import React from 'react';
import { HeaderTooltip } from '../../../utils/tooltip';
import { useSelector } from 'react-redux';

const ChatCard = ({ data, index, chatsLength }) => {
  const active = useSelector((state) => state.active.active);

  return (
    <div className='hover:bg-[#2A3942]'>
      <div className='flex items-center gap-3 py-2 px-4  cursor-pointer w-full'>
        <img src={data.profilePicture} alt='' className='w-[48px] h-[48px] rounded-full' loading='lazy' />
        <div className='w-full flex flex-col items-center justify-center py-1 pl-3'>

          <div className='w-full flex flex-row justify-between items-center'>
            <p className='text-[#e9e8ef] text-[16px]'>{data.name}</p>
            <p className={`text-[12px] font-normal leading-4 ${data.unreadCount > 0 ? 'text-[#00A884]' : 'text-[#8696a0] '}`}>{data.timestamp}</p>
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

      {index < chatsLength - 1 && <div className='w-[75%] mx-[22%] bg-[#2A3942] h-[1px]'>
      </div>}
      {active === 'chats' && <div className='w-[75%] mx-[22%] bg-[#2A3942] h-[1px]'></div>}
    </div>
  );
};

export default ChatCard;
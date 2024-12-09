import React from 'react';
import groupImage from '../../assets/RightSection/rightGroupImage.png'
import { LockIcon } from '../../assets/RightSection';
import { useSelector } from 'react-redux';
import ChatDetailsPage from './ChatDetailsPage';


const RightSection = () => {
  const activeChat = useSelector((state) => state.chats.activeChat);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  return (
    <>
      {(!activeChat && !activeChannel)  && <div className={`flex flex-col mx-auto items-center justify-center py-8 mt-[88px]`}>
        <div className='w-[560px] flex items-center justify-center flex-col gap-7'>
          <img src={groupImage} alt="" className='w-[320px]' />
          <div className='flex flex-col items-center justify-center gap-7'>
            <p className='text-[#D1D6D8] text-[32px] leading-8 font-light'>Download WhatsApp for Windows</p>
            <p className='text-[#AEBAC1] text-center text-[14px]'>Make calls, share your screen and get a faster experience when you download the Windows app.</p>
            <button className='bg-[#00A884] text-[#111b21] py-2 px-6 rounded-full hover:bg-[#06CF9C]'>
              <span className='text-[14px] font-medium'>Get From Microsoft Store</span>
            </button>
          </div>
        </div>
        <p className='text-[#667781] text-[14px] font-normal mt-auto flex items-center justify-center gap-1'>
          <LockIcon color='#667781' width={12} height={12} />
          Your personal messages are end-to-end encrypted</p>
      </div>}

      {(activeChat || activeChannel)   && <ChatDetailsPage />}
    </>
  );
};

export default RightSection;

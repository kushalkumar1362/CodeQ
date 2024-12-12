import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { MenuIcon, SearchIcon, Chevron, PlusIcon } from '../../assets/LeftSection';
import { VideoIcon, ExpressionIcon, MicIcon } from '../../assets/RightSection';
// import { CustomMenu } from '../../utils/customMenu';
// import { MenuItem } from '@mui/material';

const ChatDetailsPage = () => {
  const activeChat = useSelector((state) => state.chats.activeChat);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const profilePicture = activeChat ? activeChat?.profilePicture : activeChannel?.profilePicture || '';
  const name = activeChat ? activeChat?.name : activeChannel?.name || '';
  const messages = activeChat ? activeChat?.messages : activeChannel?.messages || [];
  const unreadMessage = activeChat ? activeChat?.unreadCount : activeChannel?.unreadCount || 0;


  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      if (unreadMessage > 0) {
        const unreadElement = chatContainer.querySelector('.unread');
        if (unreadElement) {
          chatContainer.scrollTop = unreadElement.offsetTop - chatContainer.offsetTop - unreadElement.offsetHeight;
        }
      } else {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [unreadMessage, chatContainerRef]);

  return (
    <div className={`flex flex-col h-screen bg-[#0B141A] w-[calc(100vw-397px)]  lg:w-[calc(100vw-470px)] scrollbar-thumb-[#202C33] scrollbar-track-transparent`}>
      <div className="flex items-center justify-between bg-[#202C33] text-white px-4 py-3">
        <div className="flex items-center flex-row">
          <img
            src={profilePicture}
            alt={name}
            className="rounded-full w-10 h-10 mr-4"
          />
          <div>
            <h2 className="font-bold">{name}</h2>
            <p className="text-sm text-gray-300">Online</p>
          </div>
        </div>

        <div className="flex items-center justify-center flex-row gap-6 text-[16px] leading-4">
          <div className="flex items-center flex-row gap-1 cursor-pointer">
            <VideoIcon color="#4C5D66" height={24} width={24} />
            <Chevron color="#4C5D66" height={11} width={11} className="rotate-90" />
          </div>
          <SearchIcon color="#AEBAC1" height={32} width={32} cursor="pointer" />
          <MenuIcon color="#AEBAC1" height={25} width={25} cursor="pointer" />
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto h-[calc(100vh-150px)] scrollbar-thin p-4 px-[16px] md:px-[32px] lg:px-[72px]"
      >
        {messages.map((message, index) => (
          <div key={message.id}>
            {(unreadMessage > 0 && messages.length > 1 && index === messages.length - 1 - unreadMessage) &&
              <div className='bg-[#202C33] rounded-full w-fit flex items-center justify-center py-1 px-3 mx-auto font-medium text-[15px] text-[#E9EDEF] m-1'>
                <p className='text-center'>{unreadMessage} Unread message</p>
              </div>
            }
            <div
              id={`message-${message.id}`}
              className={`relative flex mb-2 ${message.sender === 'Me' ? 'justify-end' : 'justify-start'} ${(unreadMessage > 0 && index === messages.length - 1 - unreadMessage) ? 'unread' : ''}`}
            >

              <div
                className={`max-w-sm p-2 pb-1 rounded-r-[10px] rounded-bl-[10px] shadow text-[#E9E4C5] text-[14px] leading-[19px] font-normal ${message.sender === 'Me' ? 'bg-[#005C4B]' : 'bg-[#202C33]'
                  }`}
              >
                <p className="break-words">{message.message}</p>
                <p className="text-[11px] text-right leading-[15px] text-[#656D72]">{message.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between py-1 px-2 bg-[#202C33] shadow-inner">
        <div className="px-4">
          <PlusIcon
            color="#E9E4C5"
            cursor={'pointer'}
            width={30}
            height={30}
            // onClick={handleClick}
            // className={`flex items-center justify-center p-2 w-12 h-12 rounded-full transform transition-transform ${anchorEl ? 'bg-[#2A3942] rotate-90' : 'rotate-0' }`
            // }
          />

          {/* <CustomMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem onClick={handleClose}>New Group</MenuItem>
            <MenuItem onClick={handleClose}>Starred messages</MenuItem>
            <MenuItem onClick={handleClose}>Selected chats</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
            <MenuItem onClick={handleClose}>Get WhatsApp for Windows</MenuItem>
          </CustomMenu> */}
        </div>


        <div className="flex items-center justify-center w-full flex-row py-2 px-3 bg-[#2A3942] rounded-md gap-3">
          <ExpressionIcon color="#8696A0" height={26} width={26} cursor="pointer" />
          <input
            type="text"
            placeholder="Type a message"
            className=" text-[15px] bg-transparent leading-[22px] text-[#d1d7db] font-normal placeholder-gray-400  focus:outline-none w-full"
          />
        </div>
        <button className="p-3 bg-transparent text-gray-400 hover:text-white">
          <MicIcon color="#8696A0" height={24} width={24} cursor="pointer" />
        </button>
      </div>
    </div>
  );
};

export default ChatDetailsPage;


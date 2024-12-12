import React, { useEffect } from 'react';
import { LockIcon } from '../../../assets/RightSection';
import { useDispatch, useSelector } from 'react-redux';
import DiscoverChannels from './Channel/DiscoverChannels';
import ChatCard from './ChatCard';
import { setActiveChat, setActiveChannel, setChannels, setChats } from '../../../redux';

const ChatList = () => {
  const active = useSelector((state) => state.active.active);
  const chats = useSelector((state) => state.chats.chats);
  const channels = useSelector((state) => state.channels.channels);

  const dispatch = useDispatch();

  const handleActive = (data) => {
    if (active === 'chats') {
      dispatch(setActiveChannel(null));
      dispatch(
        setChats(
          chats.map((chat) =>
          (
            chat.id === data.id
              ? { ...chat, unreadCount: 0 }
              : chat
          ))
        )
      )
      dispatch(setActiveChat(data));
    }

    if (active === 'channels') {
      dispatch(setActiveChat(null));
      dispatch(
        setChannels(
          channels.map((channel) =>
          (
            channel.id === data.id
              ? { ...channel, unreadCount: 0 }
              : channel
          ))
        )
      );
      dispatch(setActiveChannel(data));
    }
  };


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        dispatch(setActiveChat(null));
        dispatch(setActiveChannel(null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="scrollbar-thumb-[#202C33] scrollbar-track-[#111B21] shadow-lg">
      <div className={`mt-2 overflow-y-auto scrollbar-thin ${active === 'chats' ? 'h-[calc(100vh-150px)]' : 'h-[calc(100vh-100px)]'}`}>
        {(active === "chats" ? chats : channels).map((data, index) => (
          <div key={data.id} onClick={() => handleActive(data)}>
            <ChatCard data={data} index={index} chatsLength={(active === "chats" ? chats : channels).length} />
          </div>
        ))}
        {active === 'channels' && <DiscoverChannels />}
        {active === 'chats' && (
          <p className="text-[#d1d7db] text-[12px] font-normal text-center leading-4 py-4 flex items-center justify-center gap-1">
            <LockIcon color="#d1d7db" width={14} height={14} />
            Your personal messages are{' '}
            <span className="text-[#00A884] cursor-pointer">end-to-end encrypted</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatList;


import { activeSlice } from "./reducers/activeSlice";
import { setActive } from "./reducers/activeSlice";
import { setChats, setActiveChat } from "./reducers/ChatsSlice";
import { setChannels, setActiveChannel } from "./reducers/ChannelSlice";

import { chatsSlice } from "./reducers/ChatsSlice";
import { channelsSlice } from "./reducers/ChannelSlice";

export {
  channelsSlice,
  chatsSlice,
  activeSlice,
  setActive,
  setChats,
  setActiveChat,
  setActiveChannel,
  setChannels
};
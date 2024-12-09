import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannel: null,
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
  },
});

export const { setChannels, setActiveChannel } = channelsSlice.actions;
export default channelsSlice.reducer;

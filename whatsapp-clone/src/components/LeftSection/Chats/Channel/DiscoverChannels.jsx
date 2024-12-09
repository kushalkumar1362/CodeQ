import React from 'react';
import discoverChannelsData from '../../../../Dummy/discoverChannelData'

const DiscoverChannels = () => {
  return (
    <div className=' py-2 pb-6 px-5 pt-5' >
      <h1 className='text-[17px] leading-6 font-normal text-[#e9e8ef]'>Find Channels to Follow</h1>
      {discoverChannelsData.map((data, index) => (
        <div key={data.id}>
          <div className='hover:bg-[#2A3942]'>
            <div className='flex items-center gap-3 py-2 cursor-pointer w-full'>
              <img src={data.profilePicture} alt='' className='w-[48px] h-[48px] rounded-full' />

              <div className='w-full flex flex-row items-center justify-center py-1 pl-3'>
                <div className='w-full flex flex-col justify-between items-start'>
                  <p className='text-[#e9e8ef] text-[16px]'>{data.name}</p>
                  <p className='text-[#8696a0] text-[12px] font-normal leading-4'>{data.followersCount}</p>
                </div>
                <div>
                  <button className='border border-[#8696A0] text-[#00A884] py-2 px-4 rounded-full text-[14px] leading-4'>Follow</button>
                </div>
              </div>
            </div>
          </div>
          {index < discoverChannelsData.length - 1 && <div className='w-[75%] mx-[22%] bg-[#2A3942] h-[1px]'></div>}
        </div>
      ))}

      <div className='flex items-center justify-center flex-col gap-7 pt-4'>
        <button className='bg-[#00A884] text-[#111b21] py-2 px-6 rounded-full hover:bg-[#06CF9C]'>
          <span className='text-[14px] font-medium'>Discover more</span>
        </button>
      </div>
    </div >

  );
};

export default DiscoverChannels;
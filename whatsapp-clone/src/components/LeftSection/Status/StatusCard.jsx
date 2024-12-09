import React from 'react';
import { localTime } from '../../../utils/timeFormat'

const StatusCard = ({ data, isRecent }) => {
  return (
    <div className={`flex items-center gap-3 py-2 px-4 cursor-pointer hover:bg-[#2A3942] rounded-md`}>
      <img
        src={data.profilePicture}
        alt={data.name}
        className={`w-12 h-12 rounded-full ${isRecent ? 'border-2 border-[#00A884] p-[2px]' : ''}`}
      />
      <div>
        <h3 className="text-[#d1d7db]">{data.name}</h3>
        <p className="text-[#8696a0] text-sm">{localTime(data.lastUpdated)}</p>
      </div>
    </div>
  );
};

export default StatusCard;



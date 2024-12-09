import React, { useEffect, useState } from 'react';
import DP from '../../../assets/Sidebar/DP.jpeg';
import { StatusPlusIcon } from '../../../assets/LeftSection';
import StatusCard from './StatusCard';
import statusData from '../../../Dummy/statusList';

const StatusPage = () => {
  const [statusDataList, setStatusDataList] = useState({ recent: [], viewed: [] });

  useEffect(() => {
    const recentStatuses = statusData.filter(({ allView }) => !allView);
    const viewedStatuses = statusData.filter(({ allView }) => allView);
    setStatusDataList({ recent: recentStatuses, viewed: viewedStatuses });
  }, []);

  return (
    <div className="scrollbar-thumb-[#202C33] scrollbar-track-[#111B21]">
      <div className="overflow-y-auto h-[calc(100vh-150px)] scrollbar-thin">
        <div
          className="pl-4 pr-[10px] py-3 flex items-center gap-3
        border-b-[10px] border-[#0C1317]"
        >
          <div className="relative">
            <img
              src={DP}
              alt="DP"
              className="w-11 h-11 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-[-4px] w-[21px] h-[21px] bg-[#00A884] rounded-full flex items-center justify-center border-2 border-[#202C33]">
              <StatusPlusIcon />
            </div>
          </div>

          <div className="flex items-start flex-col gap-1">
            <p className="text-[#d1d7db] text-[16px] font-normal leading-4">
              My Status
            </p>
            <p className="text-[#8696a0] text-[13px] font-normal leading-[13px]">
              Click to add status update
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-[#d1d7db] px-4 pt-4 pb-2 text-sm">Recent Updates</h2>
          {statusDataList.recent.map((status) => (
            <StatusCard key={status.id} data={status} isRecent={true} />
          ))}
        </div>

        <div>
          <h2 className="text-[#d1d7db] px-4 pt-4 pb-2 text-sm">Viewed Updates</h2>
          {statusDataList.viewed.map((status) => (
            <StatusCard key={status.id} data={status} isRecent={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusPage;

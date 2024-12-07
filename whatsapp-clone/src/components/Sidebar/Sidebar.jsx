import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../../redux/activeSlice';
import {
  ChatsIcon,
  ChatsIconActive,
  StatusIcon,
  StatusIconActive,
  ChannelIcon,
  ChannelIconActive,
  CommunitiesIcon,
  CommunitiesIconActive,
  SettingIcon,
  SettingIconActive
} from '../../assets/Sidebar';
import DP from '../../assets/Sidebar/DP.jpeg';
import MetaAi from '../../assets/Sidebar/metaAI.png';
import { LightTooltip } from '../../utils/tooltip';

const Sidebar = () => {
  const active = useSelector((state) => state.active.active);
  const dispatch = useDispatch();
  const icons = useMemo(() => [
    { name: 'chats', Icon: ChatsIcon, ActiveIcon: ChatsIconActive },
    { name: 'status', Icon: StatusIcon, ActiveIcon: StatusIconActive },
    { name: 'channels', Icon: ChannelIcon, ActiveIcon: ChannelIconActive },
    { name: 'communities', Icon: CommunitiesIcon, ActiveIcon: CommunitiesIconActive }
  ], []);

  const handleActive = (iconName) => {
    dispatch(setActive(iconName));
  };

  return (
    <div className="w-[65px] h-full bg-[#202C33] flex flex-col items-center justify-between py-3 gap-8 shadow-sm">
      <div className="flex flex-col items-center gap-3">
        {icons.map(({ name, Icon, ActiveIcon }) => (
          <div key={name}
            className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${active === name ? 'bg-[#2A3942]' : ''
              }`}
            onClick={() => handleActive(name)}
          >
            <LightTooltip title={name.charAt(0).toUpperCase() + name.slice(1)} placement="right">
              {active === name ? (
                <ActiveIcon color='#AEBAC1' />
              ) : (
                <Icon color='#AEBAC1' />
              )}
            </LightTooltip>
          </div>
        ))}
        <LightTooltip title='Meta AI' placement="right">
          <img src={MetaAi} alt="Meta AI" className='w-5 h-5 object-cover' />
        </LightTooltip>

      </div>

      <div className='flex flex-col items-center gap-3'>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer ${active === 'setting' ? 'bg-[#2A3942]' : ''
            }`}
          onClick={() => handleActive('setting')}
        >
          <LightTooltip title='Setting' placement="right">
            {active === 'setting' ? (
              <SettingIconActive color='#AEBAC1' />
            ) : (
              <SettingIcon color='#AEBAC1' />
            )}
          </LightTooltip>

        </div>
        <LightTooltip title='Profile' placement="right">
          <img src={DP} alt="DP" className='w-9 h-9 rounded-full object-cover' />
        </LightTooltip>

      </div>
    </div>
  );
};

export default Sidebar;


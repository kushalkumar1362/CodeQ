import { styled } from '@mui/material/styles';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  zIndex: 10000,
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 144, 135, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    padding: '8px 10px',
    borderRadius: '5px',
    border: '1px solid #009087',
    '& .MuiTooltip-arrow': {
      color: 'rgba(0, 144, 135, 0.87)',
    },
  },
}));

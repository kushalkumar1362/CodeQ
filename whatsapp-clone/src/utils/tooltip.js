import { styled } from '@mui/material/styles';

import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

export const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  zIndex: 10000,
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 13,
    padding: '4px 16px',
    borderRadius: '50px',
  },
}));

export const HeaderTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  zIndex: 10000,
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#313131',
    color: '#fff',
    fontSize: 12,
    padding: '8px 12px',
    border: '1px solid #fff',
    borderRadius: '0px',
    FontFace: 'Poppins',
  },
}));


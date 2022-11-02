import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const HeaderItem = styled(Box)(({ theme }) => ({
  backgroundColor: '#2c2c2c',
  borderRadius: theme.spacing(1)
}));

export const DataItem = styled(Box)(({ theme }) => ({
  backgroundColor: '#1c1c1c',
  borderRadius: theme.spacing(1)
}));

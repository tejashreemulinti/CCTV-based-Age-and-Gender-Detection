import React from 'react';
import { Box, Chip } from '@mui/material';
import { 
  CheckCircle, 
  Error, 
  Warning, 
  HourglassEmpty 
} from '@mui/icons-material';

const ConnectionStatus = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'connected':
        return {
          label: 'Connected',
          color: 'success',
          icon: <CheckCircle />,
          variant: 'filled'
        };
      case 'disconnected':
        return {
          label: 'Disconnected',
          color: 'default',
          icon: <HourglassEmpty />,
          variant: 'outlined'
        };
      case 'error':
        return {
          label: 'Error',
          color: 'error',
          icon: <Error />,
          variant: 'filled'
        };
      case 'connecting':
        return {
          label: 'Connecting',
          color: 'warning',
          icon: <Warning />,
          variant: 'outlined'
        };
      default:
        return {
          label: 'Unknown',
          color: 'default',
          icon: <HourglassEmpty />,
          variant: 'outlined'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Box display="flex" alignItems="center">
      <Chip
        icon={config.icon}
        label={config.label}
        color={config.color}
        variant={config.variant}
        size="small"
        sx={{
          '& .MuiChip-icon': {
            fontSize: '16px'
          }
        }}
      />
    </Box>
  );
};

export default ConnectionStatus;
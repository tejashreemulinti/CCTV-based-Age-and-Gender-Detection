import React from 'react';
import { Box } from '@mui/material';

const DetectionOverlay = ({ detections }) => {
  if (!detections || detections.length === 0) {
    return null;
  }

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      pointerEvents="none"
      sx={{ zIndex: 10 }}
    >
      {detections.map((detection, index) => {
        const { bbox, age, gender, confidence } = detection;
        
        return (
          <Box
            key={index}
            position="absolute"
            sx={{
              left: `${(bbox.x / 640) * 100}%`,
              top: `${(bbox.y / 480) * 100}%`,
              width: `${(bbox.width / 640) * 100}%`,
              height: `${(bbox.height / 480) * 100}%`,
              border: '2px solid #00ff00',
              borderRadius: '4px',
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
            }}
          >
            {/* Label */}
            <Box
              position="absolute"
              top={-25}
              left={0}
              sx={{
                backgroundColor: 'rgba(0, 255, 0, 0.9)',
                color: 'black',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                minWidth: 'max-content'
              }}
            >
              {gender}, {age} ({Math.round(confidence * 100)}%)
            </Box>
            
            {/* Corner indicators */}
            <Box
              position="absolute"
              top={-2}
              left={-2}
              sx={{
                width: 8,
                height: 8,
                backgroundColor: '#00ff00',
                borderRadius: '50%'
              }}
            />
            <Box
              position="absolute"
              top={-2}
              right={-2}
              sx={{
                width: 8,
                height: 8,
                backgroundColor: '#00ff00',
                borderRadius: '50%'
              }}
            />
            <Box
              position="absolute"
              bottom={-2}
              left={-2}
              sx={{
                width: 8,
                height: 8,
                backgroundColor: '#00ff00',
                borderRadius: '50%'
              }}
            />
            <Box
              position="absolute"
              bottom={-2}
              right={-2}
              sx={{
                width: 8,
                height: 8,
                backgroundColor: '#00ff00',
                borderRadius: '50%'
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default DetectionOverlay;
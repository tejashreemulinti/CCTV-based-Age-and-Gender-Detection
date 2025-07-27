import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import Webcam from 'react-webcam';
import io from 'socket.io-client';

const VideoStream = ({ isStreaming, onDetectionResult, onConnectionChange, processedFrame }) => {
  const webcamRef = useRef(null);
  const socketRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fps, setFps] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  // WebRTC configuration for optimal performance
  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
    frameRate: { ideal: 15, max: 30 }
  };

  // Initialize socket connection
  useEffect(() => {
    if (isStreaming) {
      try {
        socketRef.current = io('http://localhost:5000', {
          transports: ['websocket', 'polling']
        });

        socketRef.current.on('connect', () => {
          console.log('Connected to server');
          onConnectionChange('connected');
          setError(null);
        });

        socketRef.current.on('disconnect', () => {
          console.log('Disconnected from server');
          onConnectionChange('disconnected');
        });

        socketRef.current.on('detection_result', (result) => {
          onDetectionResult(result);
          updateFPS();
        });

        socketRef.current.on('connect_error', (error) => {
          console.error('Connection error:', error);
          setError('Failed to connect to detection server');
          onConnectionChange('error');
        });

      } catch (err) {
        setError('Failed to initialize connection');
        onConnectionChange('error');
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isStreaming, onConnectionChange, onDetectionResult]);

  // Update FPS counter
  const updateFPS = useCallback(() => {
    frameCountRef.current += 1;
    const now = Date.now();
    const elapsed = now - lastTimeRef.current;
    
    if (elapsed >= 1000) { // Update every second
      const currentFps = Math.round((frameCountRef.current * 1000) / elapsed);
      setFps(currentFps);
      frameCountRef.current = 0;
      lastTimeRef.current = now;
    }
  }, []);

  // Capture and send frames
  const captureFrame = useCallback(() => {
    if (
      isStreaming &&
      webcamRef.current &&
      socketRef.current &&
      socketRef.current.connected
    ) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          socketRef.current.emit('video_frame', { frame: imageSrc });
        }
      } catch (err) {
        console.error('Error capturing frame:', err);
      }
    }
  }, [isStreaming]);

  // Frame capture loop
  useEffect(() => {
    let intervalId;
    
    if (isStreaming) {
      setIsLoading(true);
      // Capture frames at ~10 FPS for optimal performance
      intervalId = setInterval(captureFrame, 100);
      
      // Stop loading after connection is established
      setTimeout(() => setIsLoading(false), 2000);
    } else {
      setFps(0);
      frameCountRef.current = 0;
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isStreaming, captureFrame]);

  const handleUserMediaError = (error) => {
    console.error('Webcam error:', error);
    setError('Failed to access webcam. Please check permissions.');
    onConnectionChange('error');
  };

  return (
    <Box position="relative" width="100%" height="100%">
      {isStreaming ? (
        <Box position="relative">
          {/* Original webcam feed (hidden when showing processed frame) */}
          <Webcam
            ref={webcamRef}
            audio={false}
            videoConstraints={videoConstraints}
            screenshotFormat="image/jpeg"
            screenshotQuality={0.8}
            onUserMediaError={handleUserMediaError}
            style={{
              width: '100%',
              height: 'auto',
              display: processedFrame ? 'none' : 'block'
            }}
          />
          
          {/* Processed frame with detections */}
          {processedFrame && (
            <img
              src={processedFrame}
              alt="Processed video feed"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          )}

          {/* Loading overlay */}
          {isLoading && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              sx={{
                background: 'rgba(0, 0, 0, 0.7)',
                padding: 3,
                borderRadius: 2,
                color: 'white'
              }}
            >
              <CircularProgress color="primary" />
              <Typography>Initializing detection...</Typography>
            </Box>
          )}

          {/* FPS Counter */}
          <Box
            position="absolute"
            top={10}
            right={10}
            sx={{
              background: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 1,
              fontSize: '0.8rem'
            }}
          >
            {fps} FPS
          </Box>

          {/* Live indicator */}
          <Box
            position="absolute"
            top={10}
            left={10}
            display="flex"
            alignItems="center"
            gap={1}
            sx={{
              background: 'rgba(255, 0, 0, 0.8)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 1,
              fontSize: '0.8rem'
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'white',
                animation: 'pulse 1s infinite'
              }}
            />
            LIVE
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height={300}
          sx={{
            background: 'linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            color: 'rgba(255, 255, 255, 0.5)'
          }}
        >
          <Typography variant="h6" gutterBottom>
            Camera Feed Inactive
          </Typography>
          <Typography variant="body2">
            Click "Start Stream" to begin detection
          </Typography>
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Box position="absolute" bottom={10} left={10} right={10}>
          <Alert severity="error" variant="filled">
            {error}
          </Alert>
        </Box>
      )}

      {/* CSS for pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default VideoStream;
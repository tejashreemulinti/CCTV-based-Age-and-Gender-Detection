import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  FormControlLabel,
  Alert,
  Chip,
  Divider
} from '@mui/material';
import {
  Videocam,
  VideocamOff,
  Analytics,
  People,
  Refresh,
  Settings
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import VideoStream from './components/VideoStream';
import StatsDashboard from './components/StatsDashboard';
import DetectionOverlay from './components/DetectionOverlay';
import ConnectionStatus from './components/ConnectionStatus';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.1)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [detections, setDetections] = useState([]);
  const [stats, setStats] = useState({
    total_faces: 0,
    current_faces: 0,
    avg_detections_per_minute: 0,
    age_distribution: {},
    gender_distribution: {},
    last_detection: null
  });
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [showStats, setShowStats] = useState(true);
  const [processedFrame, setProcessedFrame] = useState(null);
  const [faceCount, setFaceCount] = useState(0);

  const handleStartStream = () => {
    setIsStreaming(true);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    setDetections([]);
    setProcessedFrame(null);
    setFaceCount(0);
  };

  const handleDetectionResult = (result) => {
    if (result) {
      setDetections(result.detections || []);
      setProcessedFrame(result.processed_frame);
      setFaceCount(result.face_count || 0);
    }
  };

  const handleStatsUpdate = (newStats) => {
    setStats(newStats);
  };

  const handleConnectionChange = (status) => {
    setConnectionStatus(status);
  };

  const resetStats = async () => {
    try {
      const response = await fetch('/api/reset-stats', {
        method: 'POST',
      });
      if (response.ok) {
        setStats({
          total_faces: 0,
          current_faces: 0,
          avg_detections_per_minute: 0,
          age_distribution: {},
          gender_distribution: {},
          last_detection: null
        });
      }
    } catch (error) {
      console.error('Error resetting stats:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <AppBar position="static" sx={{ background: 'rgba(0, 0, 0, 0.3)' }}>
          <Toolbar>
            <Analytics sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CCTV Age & Gender Detection System
            </Typography>
            <ConnectionStatus status={connectionStatus} />
            <FormControlLabel
              control={
                <Switch
                  checked={showStats}
                  onChange={(e) => setShowStats(e.target.checked)}
                  color="primary"
                />
              }
              label="Show Stats"
              sx={{ ml: 2 }}
            />
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Grid container spacing={3}>
            {/* Video Stream Section */}
            <Grid item xs={12} lg={showStats ? 8 : 12}>
              <Paper elevation={3} sx={{ p: 2, height: 'fit-content' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h5" component="h2">
                    Live Video Feed
                  </Typography>
                  <Box display="flex" gap={2} alignItems="center">
                    <Chip
                      icon={<People />}
                      label={`${faceCount} face(s) detected`}
                      color={faceCount > 0 ? 'primary' : 'default'}
                      variant="outlined"
                    />
                    <Button
                      variant={isStreaming ? "outlined" : "contained"}
                      color={isStreaming ? "error" : "primary"}
                      startIcon={isStreaming ? <VideocamOff /> : <Videocam />}
                      onClick={isStreaming ? handleStopStream : handleStartStream}
                    >
                      {isStreaming ? 'Stop Stream' : 'Start Stream'}
                    </Button>
                  </Box>
                </Box>

                <Box position="relative" sx={{ backgroundColor: '#000', borderRadius: 1, overflow: 'hidden' }}>
                  <VideoStream
                    isStreaming={isStreaming}
                    onDetectionResult={handleDetectionResult}
                    onConnectionChange={handleConnectionChange}
                    processedFrame={processedFrame}
                  />
                  <DetectionOverlay detections={detections} />
                </Box>

                {/* Real-time Detection Info */}
                {detections.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="h6" gutterBottom>
                      Current Detections
                    </Typography>
                    <Grid container spacing={1}>
                      {detections.map((detection, index) => (
                        <Grid item key={index}>
                          <Chip
                            label={`${detection.gender}, ${detection.age} (${(detection.confidence * 100).toFixed(1)}%)`}
                            variant="outlined"
                            size="small"
                            color="primary"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Statistics Dashboard */}
            {showStats && (
              <Grid item xs={12} lg={4}>
                <Paper elevation={3} sx={{ p: 2, height: 'fit-content' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" component="h2">
                      Analytics Dashboard
                    </Typography>
                    <IconButton onClick={resetStats} size="small">
                      <Refresh />
                    </IconButton>
                  </Box>
                  
                  <StatsDashboard
                    stats={stats}
                    onStatsUpdate={handleStatsUpdate}
                    isStreaming={isStreaming}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>

          {/* System Status */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  System Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Connection Status
                        </Typography>
                        <Chip
                          label={connectionStatus}
                          color={connectionStatus === 'connected' ? 'success' : 'error'}
                          variant="filled"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Stream Status
                        </Typography>
                        <Chip
                          label={isStreaming ? 'Active' : 'Inactive'}
                          color={isStreaming ? 'success' : 'default'}
                          variant="filled"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                          Real-time Processing
                        </Typography>
                        <Chip
                          label={isStreaming && connectionStatus === 'connected' ? 'Enabled' : 'Disabled'}
                          color={isStreaming && connectionStatus === 'connected' ? 'success' : 'default'}
                          variant="filled"
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
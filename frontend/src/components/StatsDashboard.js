import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';

const StatsDashboard = ({ stats, onStatsUpdate, isStreaming }) => {
  const [realtimeStats, setRealtimeStats] = useState(stats);

  // Fetch stats periodically when streaming
  useEffect(() => {
    let interval;
    
    if (isStreaming) {
      interval = setInterval(async () => {
        try {
          const response = await fetch('/api/stats');
          if (response.ok) {
            const newStats = await response.json();
            setRealtimeStats(newStats);
            onStatsUpdate(newStats);
          }
        } catch (error) {
          console.error('Error fetching stats:', error);
        }
      }, 2000); // Update every 2 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isStreaming, onStatsUpdate]);

  // Update local stats when props change
  useEffect(() => {
    setRealtimeStats(stats);
  }, [stats]);

  // Prepare data for age distribution chart
  const ageChartData = Object.entries(realtimeStats.age_distribution || {}).map(([age, count]) => ({
    age,
    count,
    percentage: realtimeStats.total_faces > 0 ? ((count / realtimeStats.total_faces) * 100).toFixed(1) : 0
  }));

  // Prepare data for gender distribution pie chart
  const genderChartData = Object.entries(realtimeStats.gender_distribution || {}).map(([gender, count]) => ({
    name: gender,
    value: count,
    percentage: realtimeStats.total_faces > 0 ? ((count / realtimeStats.total_faces) * 100).toFixed(1) : 0
  }));

  // Colors for charts
  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  const formatLastDetection = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);

    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Box>
      {/* Key Metrics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 1 }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {realtimeStats.total_faces}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Faces
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 1 }}>
              <Typography variant="h4" color="secondary" fontWeight="bold">
                {realtimeStats.current_faces}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Current
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardContent sx={{ textAlign: 'center', py: 1 }}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                {realtimeStats.avg_detections_per_minute}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Avg. Detections/Min
              </Typography>
              {isStreaming && (
                <LinearProgress 
                  variant="indeterminate" 
                  sx={{ mt: 1, height: 3, borderRadius: 1 }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* Age Distribution Chart */}
      {ageChartData.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Age Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ageChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="age" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
              />
              <YAxis 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [`${value} people (${ageChartData.find(d => d.count === value)?.percentage}%)`, 'Count']}
              />
              <Bar dataKey="count" fill="#667eea" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}

      {/* Gender Distribution Chart */}
      {genderChartData.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Gender Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={genderChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {genderChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Legend */}
          <Box display="flex" justifyContent="center" gap={1} mt={1}>
            {genderChartData.map((entry, index) => (
              <Chip
                key={entry.name}
                label={`${entry.name}: ${entry.value}`}
                size="small"
                sx={{
                  backgroundColor: COLORS[index % COLORS.length],
                  color: 'white'
                }}
              />
            ))}
          </Box>
        </Box>
      )}

      <Divider sx={{ my: 2 }} />

      {/* System Info */}
      <Box>
        <Typography variant="h6" gutterBottom>
          System Info
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent sx={{ py: 1 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Last Detection
                </Typography>
                <Typography variant="body1">
                  {formatLastDetection(realtimeStats.last_detection)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent sx={{ py: 1 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Status
                </Typography>
                <Chip
                  label={isStreaming ? 'Processing' : 'Idle'}
                  color={isStreaming ? 'success' : 'default'}
                  size="small"
                  variant="filled"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* No Data Message */}
      {realtimeStats.total_faces === 0 && (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center"
          py={4}
          sx={{ 
            textAlign: 'center',
            opacity: 0.6 
          }}
        >
          <Typography variant="body1" gutterBottom>
            No data available
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Start streaming to see analytics
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default StatsDashboard;
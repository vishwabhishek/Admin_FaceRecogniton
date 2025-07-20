import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import AttendanceTable from './AttendanceTable';

const AttendanceRecords = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AssessmentIcon sx={{ fontSize: 32, color: '#1976d2' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
            Attendance Records
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Real-time view of today's attendance records and employee check-ins
        </Typography>
      </Box>

      {/* Live Attendance Table Section */}
      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <AttendanceTable searchTerm="" filters={{}} />
      </Paper>
    </Container>
  );
};

export default AttendanceRecords;

import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Chip,
  Alert,
  Fade
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Schedule as ClockIcon,
  Refresh as RefreshIcon,
  AccessTime as AccessTimeIcon,
  FiberManualRecord as LiveIcon
} from '@mui/icons-material';

// Dummy employee data for simulation
const DUMMY_EMPLOYEES = [
  'John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis', 'James Johnson',
  'Lisa Anderson', 'David Martinez', 'Jennifer Taylor', 'Robert Thomas', 'Maria Garcia',
  'William White', 'Elizabeth Lee', 'Joseph Harris', 'Margaret Martin', 'Charles Thompson',
  'Sandra Robinson', 'Daniel Lewis', 'Nancy Walker', 'Kevin Hall', 'Betty Young',
  'Christopher King', 'Susan Wright', 'Thomas Scott', 'Jessica Green', 'Brian Adams',
  'Ashley Miller', 'Ryan Wilson', 'Amanda Clark', 'Mark Rodriguez', 'Rachel Turner'
];

// Function to generate random time
const generateRandomTime = () => {
  const hour = Math.floor(Math.random() * 3) + 8; // 8-10 AM
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
};

// Function to determine status based on time
const determineStatus = (timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  const totalMinutes = hour * 60 + minute;
  
  if (totalMinutes <= 555) return 'On-time'; // Before 9:15 AM
  if (totalMinutes <= 600) return 'Late'; // Before 10:00 AM
  return 'Late';
};

// Function to get today's date
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Optimize the component with memo
const AttendanceTable = memo(({ searchTerm, filters }) => {
  const containerStyle = {
    maxHeight: 'none', // Remove max height to prevent scrolling
    overflow: 'visible', // Ensure all content is visible without scrolling
  };
  const [attendanceData, setAttendanceData] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const [nextEntryCountdown, setNextEntryCountdown] = useState(0);

  // Function to create a new attendance entry
  const createAttendanceEntry = useCallback(() => {
    const availableEmployees = DUMMY_EMPLOYEES.filter(
      name => !attendanceData.some(entry => entry.emp_name === name)
    );
    
    if (availableEmployees.length === 0) return null;
    
    const randomEmployee = availableEmployees[Math.floor(Math.random() * availableEmployees.length)];
    const time = generateRandomTime();
    const status = determineStatus(time);
    const now = new Date();
    
    return {
      _id: `${Date.now()}_${Math.random()}`,
      emp_name: randomEmployee,
      timestamp: `${getTodayDate()} ${time}`,
      status: status,
      isNew: true // Flag to show animation
    };
  }, [attendanceData]);

  // Function to add new entry
  const addNewEntry = useCallback(() => {
    const newEntry = createAttendanceEntry();
    if (newEntry) {
      setAttendanceData(prev => {
        // Remove the isNew flag from previous entries
        const updatedPrev = prev.map(entry => ({ ...entry, isNew: false }));
        // Add new entry at the beginning
        return [newEntry, ...updatedPrev];
      });
      
      // Remove the isNew flag after animation
      setTimeout(() => {
        setAttendanceData(prev => 
          prev.map(entry => 
            entry._id === newEntry._id 
              ? { ...entry, isNew: false }
              : entry
          )
        );
      }, 2000);
    }
  }, [createAttendanceEntry]);

  // Setup random interval for new entries
  useEffect(() => {
    const scheduleNextEntry = () => {
      // Random interval between 2-15 seconds
      const randomDelay = Math.floor(Math.random() * 13000) + 2000;
      setNextEntryCountdown(Math.ceil(randomDelay / 1000));
      
      const timeout = setTimeout(() => {
        if (attendanceData.length < DUMMY_EMPLOYEES.length) {
          addNewEntry();
          scheduleNextEntry(); // Schedule the next entry
        }
      }, randomDelay);
      
      return timeout;
    };
    
    // Start with initial entries
    if (attendanceData.length === 0) {
      const initialEntries = [];
      for (let i = 0; i < 3; i++) {
        const entry = createAttendanceEntry();
        if (entry) {
          entry.isNew = false; // Don't animate initial entries
          initialEntries.push(entry);
        }
      }
      setAttendanceData(initialEntries);
    }
    
    const timeout = scheduleNextEntry();
    
    return () => clearTimeout(timeout);
  }, [addNewEntry, attendanceData.length, createAttendanceEntry]);

  // Countdown timer
  useEffect(() => {
    if (nextEntryCountdown > 0 && isLive) {
      const timer = setTimeout(() => {
        setNextEntryCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [nextEntryCountdown, isLive]);

  // Memoize status mapping to prevent recreation on each render
  const statusMapping = useMemo(() => ({
    'On-time': { color: 'success', icon: <CheckCircleIcon /> },
    'Late': { color: 'warning', icon: <ClockIcon /> },
    'present': { color: 'success', icon: <CheckCircleIcon /> },
    'absent': { color: 'error', icon: <CancelIcon /> },
    'late': { color: 'warning', icon: <ClockIcon /> }
  }), []);

  // Optimize getStatusChip with useCallback
  const getStatusChip = useCallback((status) => {
    const statusProps = statusMapping[status] || { color: 'default', icon: null };

    return (
      <Chip
        icon={statusProps.icon}
        label={status}
        color={statusProps.color}
        size="small"
        sx={{ minWidth: 100 }}
      />
    );
  }, [statusMapping]);

  // Memoize filtered data based on searchTerm and filters
  const filteredAttendanceData = useMemo(() => {
    if (!searchTerm && Object.keys(filters).length === 0) {
      return attendanceData;
    }

    return attendanceData.filter(record => {
      // Search term filtering
      if (searchTerm && !record.emp_name?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Add more filtering logic here based on filters object
      
      return true;
    });
  }, [attendanceData, searchTerm, filters]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Add CSS keyframes for animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          @keyframes fadeInScale {
            0% { 
              opacity: 0; 
              transform: scale(0.95); 
              background-color: #fef3c7;
            }
            50% { 
              opacity: 1; 
              transform: scale(1.02); 
              background-color: #fef3c7;
            }
            100% { 
              opacity: 1; 
              transform: scale(1); 
              background-color: transparent;
            }
          }
        `}
      </style>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Live Attendance (Today)
          </Typography>
          <LiveIcon 
            sx={{ 
              color: '#22c55e', 
              fontSize: 12, 
              animation: 'pulse 2s infinite' 
            }} 
          />
          <Typography variant="caption" color="text.secondary">
            {attendanceData.length} checked in
          </Typography>
        </Box>
      </Box>

      <TableContainer 
        component={Paper} 
        elevation={2} 
        sx={{ 
          borderRadius: 2,
          maxHeight: 'none', // Remove max height constraint
          overflow: 'visible' // Ensure table content is fully visible
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendanceData.length > 0 ? (
              filteredAttendanceData.map((record) => (
                <TableRow
                  key={record._id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    ...(record.isNew && {
                      animation: 'fadeInScale 2s ease-out',
                      border: '2px solid #22c55e',
                      borderRadius: '4px',
                    })
                  }}
                >
                  <TableCell 
                    sx={{
                      ...(record.isNew && {
                        fontWeight: 'bold',
                        position: 'relative',
                        '&::before': {
                          content: '"🆕"',
                          position: 'absolute',
                          left: '-20px',
                          fontSize: '14px',
                        }
                      })
                    }}
                  >
                    {record.emp_name}
                  </TableCell>
                  <TableCell sx={record.isNew ? { fontWeight: 'bold' } : {}}>
                    {record.timestamp?.split(" ")[0]}
                  </TableCell>
                  <TableCell sx={record.isNew ? { fontWeight: 'bold' } : {}}>
                    {record.timestamp?.split(" ")[1] || "--"}
                  </TableCell>
                  <TableCell sx={record.isNew ? { fontWeight: 'bold' } : {}}>
                    {getStatusChip(record.status)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 48, color: '#94A3B8' }} />
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                      No attendance records for today
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ maxWidth: '300px', textAlign: 'center' }}>
                      Attendance records will appear here as employees check in
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
});

AttendanceTable.displayName = 'AttendanceTable';

export default AttendanceTable;

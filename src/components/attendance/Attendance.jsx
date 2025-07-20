import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Chip,
  Card,
  CardContent,
  Avatar,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Fade
} from '@mui/material';
import {
  Camera,
  Close,
  CheckCircle,
  Warning,
  Timer,
  Schedule,
  LocationOn,
  CheckCircleOutline,
  ExitToApp,
  WbSunny,
  Brightness3,
} from '@mui/icons-material';
import styles from './Attendance.module.css';
import { useAuth } from '../../context/AuthContext';
import CameraCapture from './CameraCapture.js';

const formatDate = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'short' });
  const year = d.getFullYear();
  
  // Add ordinal suffix to day
  const suffix = ['th', 'st', 'nd', 'rd'];
  const v = day % 100;
  const ordinal = suffix[(v - 20) % 10] || suffix[v] || suffix[0];
  
  return `${day}${ordinal} ${month} ${year}`;
};

const calculateWorkDuration = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return null;
  const diff = checkOut.getTime() - checkIn.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours} hours ${minutes} minutes`;
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'On-Time':
      return <CheckCircle fontSize="small" />;
    case 'Late':
      return <Warning fontSize="small" />;
    case 'Checked In':
      return <CheckCircle fontSize="small" />;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'On-Time':
      return 'success';
    case 'Late':
      return 'warning';
    case 'Checked In':
      return 'success';
    case 'Not Checked In':
      return 'default';
    case 'Checked Out':
      return 'info';
    default:
      return 'default';
  }
};

const Attendance = () => {
  const { user } = useAuth();
  const [openCamera, setOpenCamera] = useState(false);
  const handleCheckInOutCamera = useCallback(() => {
    setOpenCamera(!openCamera);
  }, [openCamera]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [workDuration, setWorkDuration] = useState(null);
  const [attendance, setAttendance] = useState({
    checkInTime: null,
    checkOutTime: null,
    date: new Date(),
    status: 'Not Checked In'
  });

  const determineStatus = useCallback((checkInTime) => {
    if (!checkInTime) return 'Not Checked In';
    
    const checkInHour = checkInTime.getHours();
    const checkInMinutes = checkInTime.getMinutes();
    const totalMinutes = checkInHour * 60 + checkInMinutes;
    
    if (totalMinutes <= 555) return 'On-Time'; // Before 9:15 AM
    if (totalMinutes <= 600) return 'Late'; // Before 10:00 AM
    return 'Checked In';
  }, []);

  const isCheckInDisabled = useCallback(() => {
    if (!attendance.checkOutTime) return false;
    const now = new Date();
    const checkOutDate = new Date(attendance.checkOutTime);
    return now.toDateString() === checkOutDate.toDateString();
  }, [attendance.checkOutTime]);

  const handleCheckInOut = useCallback(() => {
    if (isCheckedIn) {
      setOpenConfirmDialog(true);
    } else {
      setOpenCamera(true);
    }
  }, [isCheckedIn]);

  const handleConfirmCheckOut = useCallback(() => {
    setOpenConfirmDialog(false);
    setOpenCamera(true);
  }, []);

  const handleCapture = useCallback(async (dataUrl) => {
    try {
      // Simulate face detection API call
      const faceDetected = true; // This would be the result from your API

      if (faceDetected) {
        setOpenCamera(false);
        const now = new Date();
        
        if (!isCheckedIn) {
          // Check In
          const status = determineStatus(now);
          setAttendance(prev => ({
            ...prev,
            checkInTime: now,
            status: status
          }));
          setIsCheckedIn(true);
        } else {
          // Check Out
          const checkOutTime = now;
          setAttendance(prev => ({
            ...prev,
            checkOutTime: checkOutTime,
            status: 'Checked Out'
          }));
          setIsCheckedIn(false);
          const duration = calculateWorkDuration(attendance.checkInTime, checkOutTime);
          setWorkDuration(duration);
        }
        setShowSuccess(true);
      } else {
        alert('No face detected. Please try again.');
      }
    } catch (error) {
      console.error('Error during face detection:', error);
      alert('Error during face detection. Please try again.');
    }
  }, [isCheckedIn, determineStatus, attendance.checkInTime]);

  const handleCloseSuccess = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccess(false);
  }, []);

  // Reset check-in status at midnight
  useEffect(() => {
    const resetAttendance = () => {
      setIsCheckedIn(false);
      setAttendance(prev => ({
        ...prev,
        checkInTime: null,
        checkOutTime: null,
        status: 'Not Checked In',
        date: new Date()
      }));
      setWorkDuration(null);
    };

    // Calculate time until midnight
    const calculateMidnightTimeout = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight.getTime() - now.getTime();
    };

    // Set a timeout for midnight
    const timeoutId = setTimeout(resetAttendance, calculateMidnightTimeout());
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Get current time for greetings
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: <WbSunny /> };
    if (hour < 18) return { text: 'Good Afternoon', icon: <WbSunny /> };
    return { text: 'Good Evening', icon: <Brightness3 /> };
  };

  const greeting = getGreeting();

  return (
    <Box className={styles.attendanceContainer}>
      <Container maxWidth="xl" sx={{ py: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Compact Header with Greeting */}
        <Box className={styles.compactHeader}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {greeting.icon}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'white', mb: 0 }}>
                  {greeting.text}, {user?.name?.split(' ')[0] || 'User'}!
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
                  {formatDate(new Date())}
                </Typography>
              </Box>
            </Box>
            <Box className={styles.timeDisplay}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'white' }}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3} sx={{ flex: 1, py: 2, overflow: 'hidden' }}>
          {/* Left Panel - User Card & Status */}
          <Grid item xs={12} lg={4}>
            <Fade in={true} timeout={800}>
              <Card className={styles.userCard} elevation={0}>
                <CardContent sx={{ p: 3 }}>
                  {/* Compact User Profile Section */}
                  <Box className={styles.compactUserProfile}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Avatar
                        src={user?.avatar || '/default-avatar.jpg'}
                        alt={user?.name}
                        sx={{
                          width: 80,
                          height: 80,
                          border: '3px solid',
                          borderColor: attendance.status === 'On-Time' ? '#4ade80' : 
                                     attendance.status === 'Late' ? '#fb923c' : '#e5e7eb'
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {user?.name || 'ru230463'}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          {user?.role || 'user'} • {user?.department || 'Department'}
                        </Typography>
                        <Chip
                          label={attendance.status}
                          color={getStatusColor(attendance.status)}
                          variant="filled"
                          size="small"
                          icon={getStatusIcon(attendance.status)}
                          sx={{
                            borderRadius: '16px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Compact Quick Stats */}
                  <Box className={styles.compactStats}>
                    <Box className={styles.compactStatItem}>
                      <Schedule sx={{ color: '#6366f1', fontSize: 18 }} />
                      <Box sx={{ ml: 1.5 }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Check-in</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                          {attendance.checkInTime ? attendance.checkInTime.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          }) : '--:--'}
                        </Typography>
                      </Box>
                    </Box>

                    {attendance.checkOutTime && (
                      <Box className={styles.compactStatItem}>
                        <ExitToApp sx={{ color: '#ef4444', fontSize: 18 }} />
                        <Box sx={{ ml: 1.5 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Check-out</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                            {attendance.checkOutTime.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                    {workDuration && (
                      <Box className={styles.compactStatItem}>
                        <Timer sx={{ color: '#10b981', fontSize: 18 }} />
                        <Box sx={{ ml: 1.5 }}>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Duration</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                            {workDuration}
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>

                  {/* Action Button */}
                  <Box sx={{ mt: 4 }}>
                    <Tooltip title={isCheckInDisabled() ? "You have already checked out for today" : ""}>
                      <span style={{ display: 'block' }}>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          startIcon={isCheckedIn ? <ExitToApp /> : <CheckCircleOutline />}
                          onClick={handleCheckInOut}
                          disabled={isCheckInDisabled()}
                          className={styles.primaryActionButton}
                          sx={{
                            py: 2,
                            borderRadius: '16px',
                            textTransform: 'none',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                          }}
                        >
                          {isCheckInDisabled() 
                            ? 'Checked Out for Today'
                            : isCheckedIn 
                              ? 'Check-Out' 
                              : 'Check-In'
                          }
                        </Button>
                      </span>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* Right Panel - Camera Interface */}
          <Grid item xs={12} lg={8}>
            <Fade in={true} timeout={1000}>
              <Card className={styles.cameraCard} elevation={0}>
                <CardContent sx={{ p: 0, height: '100%' }}>
                  <Box className={styles.cameraInterface}>
                    {openCamera ? (
                      <Box className={styles.activeCameraContainer}>
                        {/* Camera Header */}
                        <Box className={styles.cameraHeader}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            Face Detection Active
                          </Typography>
                          <Button
                            startIcon={<Close />}
                            onClick={() => setOpenCamera(false)}
                            className={styles.closeCameraButton}
                            sx={{ color: 'white' }}
                          >
                            Close Camera
                          </Button>
                        </Box>
                        
                        {/* Camera Component */}
                        <Box className={styles.cameraWrapper}>
                          <CameraCapture onCapture={handleCapture} />
                        </Box>
                        
                        {/* Instructions */}
                        <Box className={styles.cameraInstructions}>
                          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>
                            Position your face in the center of the frame for automatic detection
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box className={styles.cameraPlaceholder}>
                        <Box className={styles.placeholderContent}>
                          <Box className={styles.cameraIconWrapper}>
                            <Camera sx={{ fontSize: 80, color: '#6366f1' }} />
                          </Box>
                          <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: '#1f2937' }}>
                            Ready for {isCheckedIn ? 'Check-Out' : 'Check-In'}
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary', maxWidth: 400, textAlign: 'center' }}>
                            {isCheckInDisabled() 
                              ? 'You have completed your attendance for today. See you tomorrow!'
                              : `Click the "${isCheckedIn ? 'Check-Out' : 'Check-In'}" button to activate face recognition`
                            }
                          </Typography>
                          
                          {/* Feature Highlights */}
                          <Box className={styles.featureHighlights}>
                            <Box className={styles.featureItem}>
                              <CheckCircle sx={{ color: '#10b981', mr: 1 }} />
                              <Typography variant="body2">Secure Face Recognition</Typography>
                            </Box>
                            <Box className={styles.featureItem}>
                              <Timer sx={{ color: '#6366f1', mr: 1 }} />
                              <Typography variant="body2">Instant Processing</Typography>
                            </Box>
                            <Box className={styles.featureItem}>
                              <LocationOn sx={{ color: '#f59e0b', mr: 1 }} />
                              <Typography variant="body2">Location Verified</Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>

        {/* Enhanced Confirmation Dialog */}
        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              p: 2
            }
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
            <ExitToApp sx={{ fontSize: 48, color: '#ef4444', mb: 1 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Confirm Check-Out
            </Typography>
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Are you sure you want to check out for today?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Current time: {new Date().toLocaleTimeString()}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', gap: 2, pt: 2 }}>
            <Button 
              onClick={() => setOpenConfirmDialog(false)}
              variant="outlined"
              sx={{ borderRadius: '12px', px: 3 }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmCheckOut} 
              variant="contained" 
              color="error"
              sx={{ borderRadius: '12px', px: 3 }}
            >
              Confirm Check-Out
            </Button>
          </DialogActions>
        </Dialog>

        {/* Enhanced Success Notification */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSuccess} 
            severity="success" 
            sx={{ 
              width: '100%',
              borderRadius: '12px',
              fontSize: '1rem'
            }}
          >
            {isCheckedIn 
              ? `✨ Welcome! Checked in successfully at ${attendance.checkInTime?.toLocaleTimeString()}`
              : `👋 Goodbye! Checked out successfully. Total work time: ${workDuration}`
            }
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Attendance;

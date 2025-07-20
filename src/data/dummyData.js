// Dummy Data for Admin Dashboard

// Employee Data with Attendance Status
export const dummyEmployees = [
  {
    id: 'EMP001',
    employeeId: 'EMP001',
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@company.com',
    companyEmail: 'john.doe@company.com',
    phone: '+1-555-0101',
    role: 'Software Engineer',
    department: 'Engineering',
    joinDate: '2023-01-15',
    status: 'Active',
    manager: 'Sarah Wilson',
    salary: 75000,
    attendance: {
      status: 'Present',
      checkInTime: '09:15 AM',
      checkOutTime: null,
      totalHours: '8.5h',
      date: '2025-01-20'
    },
    profileImage: null,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    }
  },
  {
    id: 'EMP002',
    employeeId: 'EMP002',
    firstName: 'Sarah',
    lastName: 'Wilson',
    fullName: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    companyEmail: 'sarah.wilson@company.com',
    phone: '+1-555-0102',
    role: 'Project Manager',
    department: 'Engineering',
    joinDate: '2022-08-20',
    status: 'Active',
    manager: 'Michael Brown',
    salary: 85000,
    attendance: {
      status: 'Present',
      checkInTime: '08:45 AM',
      checkOutTime: null,
      totalHours: '9h',
      date: '2025-01-20'
    },
    profileImage: null,
    address: {
      street: '456 Oak Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'USA'
    }
  },
  {
    id: 'EMP003',
    employeeId: 'EMP003',
    firstName: 'Michael',
    lastName: 'Brown',
    fullName: 'Michael Brown',
    email: 'michael.brown@company.com',
    companyEmail: 'michael.brown@company.com',
    phone: '+1-555-0103',
    role: 'Senior Developer',
    department: 'Engineering',
    joinDate: '2021-03-10',
    status: 'Active',
    manager: 'Sarah Wilson',
    salary: 95000,
    attendance: {
      status: 'Absent',
      checkInTime: null,
      checkOutTime: null,
      totalHours: '0h',
      date: '2025-01-20',
      reason: 'Sick Leave'
    },
    profileImage: null,
    address: {
      street: '789 Pine St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    }
  },
  {
    id: 'EMP004',
    employeeId: 'EMP004',
    firstName: 'Emily',
    lastName: 'Davis',
    fullName: 'Emily Davis',
    email: 'emily.davis@company.com',
    companyEmail: 'emily.davis@company.com',
    phone: '+1-555-0104',
    role: 'UI/UX Designer',
    department: 'Design',
    joinDate: '2023-06-01',
    status: 'Active',
    manager: 'David Miller',
    salary: 70000,
    attendance: {
      status: 'Present',
      checkInTime: '09:30 AM',
      checkOutTime: null,
      totalHours: '8h',
      date: '2025-01-20'
    },
    profileImage: null,
    address: {
      street: '321 Elm St',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'USA'
    }
  },
  {
    id: 'EMP005',
    employeeId: 'EMP005',
    firstName: 'David',
    lastName: 'Miller',
    fullName: 'David Miller',
    email: 'david.miller@company.com',
    companyEmail: 'david.miller@company.com',
    phone: '+1-555-0105',
    role: 'Design Lead',
    department: 'Design',
    joinDate: '2020-11-15',
    status: 'Active',
    manager: 'Sarah Wilson',
    salary: 90000,
    attendance: {
      status: 'Present',
      checkInTime: '08:30 AM',
      checkOutTime: null,
      totalHours: '9.5h',
      date: '2025-01-20'
    },
    profileImage: null,
    address: {
      street: '654 Maple Ave',
      city: 'Denver',
      state: 'CO',
      zipCode: '80201',
      country: 'USA'
    }
  },
  {
    id: 'EMP006',
    employeeId: 'EMP006',
    firstName: 'Lisa',
    lastName: 'Anderson',
    fullName: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    companyEmail: 'lisa.anderson@company.com',
    phone: '+1-555-0106',
    role: 'HR Manager',
    department: 'Human Resources',
    joinDate: '2022-02-28',
    status: 'Active',
    manager: 'Robert Taylor',
    salary: 80000,
    attendance: {
      status: 'Present',
      checkInTime: '09:00 AM',
      checkOutTime: null,
      totalHours: '8h',
      date: '2025-01-20'
    },
    profileImage: null,
    address: {
      street: '987 Cedar St',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA'
    }
  },
  {
    id: 'EMP007',
    employeeId: 'EMP007',
    firstName: 'Robert',
    lastName: 'Taylor',
    fullName: 'Robert Taylor',
    email: 'robert.taylor@company.com',
    companyEmail: 'robert.taylor@company.com',
    phone: '+1-555-0107',
    role: 'VP Human Resources',
    department: 'Human Resources',
    joinDate: '2019-09-01',
    status: 'Active',
    manager: 'CEO',
    salary: 120000,
    attendance: {
      status: 'Absent',
      checkInTime: null,
      checkOutTime: null,
      totalHours: '0h',
      date: '2025-01-20',
      reason: 'Business Trip'
    },
    profileImage: null,
    address: {
      street: '159 Birch Lane',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    }
  },
  {
    id: 'EMP008',
    employeeId: 'EMP008',
    firstName: 'Jennifer',
    lastName: 'Garcia',
    fullName: 'Jennifer Garcia',
    email: 'jennifer.garcia@company.com',
    companyEmail: 'jennifer.garcia@company.com',
    phone: '+1-555-0108',
    role: 'Marketing Specialist',
    department: 'Marketing',
    joinDate: '2023-04-12',
    status: 'Active',
    manager: 'Mark Johnson',
    salary: 65000,
    attendance: {
      status: 'Present',
      checkInTime: '09:45 AM',
      checkOutTime: null,
      totalHours: '7.5h',
      date: '2025-01-20'
    },
    profileImage: null,
    address: {
      street: '753 Willow Dr',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      country: 'USA'
    }
  }
];

// Live Attendance Summary Data
export const liveAttendanceData = {
  totalEmployees: dummyEmployees.length,
  presentToday: dummyEmployees.filter(emp => emp.attendance.status === 'Present').length,
  absentToday: dummyEmployees.filter(emp => emp.attendance.status === 'Absent').length,
  lateArrivals: dummyEmployees.filter(emp => 
    emp.attendance.status === 'Present' && 
    emp.attendance.checkInTime && 
    new Date(`2025-01-20 ${emp.attendance.checkInTime}`).getHours() >= 9
  ).length,
  onTime: dummyEmployees.filter(emp => 
    emp.attendance.status === 'Present' && 
    emp.attendance.checkInTime && 
    new Date(`2025-01-20 ${emp.attendance.checkInTime}`).getHours() < 9
  ).length
};

// System Settings Data
export const systemSettings = {
  general: {
    companyName: 'TechCorp Solutions',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    language: 'English',
    currency: 'USD'
  },
  attendance: {
    workStartTime: '09:00',
    workEndTime: '17:00',
    lunchBreakDuration: 60, // minutes
    gracePerionMinutes: 15,
    autoCheckOut: true,
    weekendTracking: false
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    lateArrivalAlerts: true,
    absenteeAlerts: true,
    reportReminders: true,
    systemMaintenance: true
  },
  security: {
    passwordExpiration: 90, // days
    maxLoginAttempts: 5,
    sessionTimeout: 480, // minutes
    twoFactorAuth: false,
    ipWhitelisting: false
  },
  appearance: {
    theme: 'light', // 'light' or 'dark'
    primaryColor: '#4F46E5',
    sidebarCollapsed: false,
    compactView: false
  },
  dataManagement: {
    backupFrequency: 'daily',
    dataRetention: 365, // days
    exportFormat: 'xlsx',
    autoArchive: true
  }
};

// User Profile Data
export const currentUser = {
  id: 'USER001',
  employeeId: 'EMP001',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  email: 'john.doe@company.com',
  phone: '+1-555-0101',
  role: 'Admin',
  department: 'IT Administration',
  joinDate: '2020-01-15',
  lastLogin: '2025-01-20T08:30:00Z',
  profileImage: null,
  preferences: {
    theme: 'light',
    notifications: true,
    language: 'English',
    timezone: 'America/New_York'
  },
  permissions: [
    'view_employees',
    'edit_employees',
    'delete_employees',
    'view_attendance',
    'edit_attendance',
    'view_reports',
    'generate_reports',
    'system_settings',
    'user_management'
  ],
  address: {
    street: '123 Admin St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA'
  },
  emergencyContact: {
    name: 'Jane Doe',
    relationship: 'Spouse',
    phone: '+1-555-0201',
    email: 'jane.doe@gmail.com'
  }
};

// Department Data
export const departments = [
  { id: 'DEPT001', name: 'Engineering', manager: 'Sarah Wilson', employeeCount: 3 },
  { id: 'DEPT002', name: 'Design', manager: 'David Miller', employeeCount: 2 },
  { id: 'DEPT003', name: 'Human Resources', manager: 'Robert Taylor', employeeCount: 2 },
  { id: 'DEPT004', name: 'Marketing', manager: 'Mark Johnson', employeeCount: 1 }
];

// Recent Activity Data
export const recentActivities = [
  {
    id: 1,
    type: 'check_in',
    employee: 'John Doe',
    timestamp: '2025-01-20T09:15:00Z',
    description: 'Checked in at 09:15 AM'
  },
  {
    id: 2,
    type: 'check_in',
    employee: 'Sarah Wilson',
    timestamp: '2025-01-20T08:45:00Z',
    description: 'Checked in at 08:45 AM'
  },
  {
    id: 3,
    type: 'absence',
    employee: 'Michael Brown',
    timestamp: '2025-01-20T08:00:00Z',
    description: 'Marked absent - Sick Leave'
  },
  {
    id: 4,
    type: 'check_in',
    employee: 'Emily Davis',
    timestamp: '2025-01-20T09:30:00Z',
    description: 'Checked in at 09:30 AM'
  }
];

export default {
  dummyEmployees,
  liveAttendanceData,
  systemSettings,
  currentUser,
  departments,
  recentActivities
};

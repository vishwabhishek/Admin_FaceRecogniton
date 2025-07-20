import React, { useState, useCallback, memo, useMemo } from 'react';
import { 
  FaSearch, 
  FaEye, 
  FaFilter, 
  FaSort, 
  FaSortUp, 
  FaSortDown,
  FaCheckCircle,
  FaTimesCircle,
  FaRegClock,
  FaExclamationTriangle
} from 'react-icons/fa';
import { dummyEmployees, departments } from '../../data/dummyData';
import styles from './EmployeeAttendanceList.module.css';

const EmployeeAttendanceList = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = dummyEmployees.filter(employee => {
      const matchesSearch = 
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment = 
        departmentFilter === 'all' || employee.department === departmentFilter;

      const matchesAttendance = 
        attendanceFilter === 'all' || 
        employee.attendance.status.toLowerCase() === attendanceFilter.toLowerCase();

      return matchesSearch && matchesDepartment && matchesAttendance;
    });

    // Sort employees
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        // Special handling for attendance status
        if (sortConfig.key === 'attendanceStatus') {
          aValue = a.attendance.status;
          bValue = b.attendance.status;
        }

        // Special handling for check-in time
        if (sortConfig.key === 'checkInTime') {
          aValue = a.attendance.checkInTime || 'ZZZ'; // Put null values at end
          bValue = b.attendance.checkInTime || 'ZZZ';
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, departmentFilter, attendanceFilter, sortConfig]);

  // Handle sorting
  const handleSort = useCallback((key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className={styles.sortIcon} />;
    }
    return sortConfig.direction === 'asc' 
      ? <FaSortUp className={styles.sortIcon} />
      : <FaSortDown className={styles.sortIcon} />;
  };

  // Get attendance status badge
  const getAttendanceStatusBadge = (attendance) => {
    if (attendance.status === 'Present') {
      return (
        <span className={`${styles.badge} ${styles.present}`}>
          <FaCheckCircle /> Present
        </span>
      );
    } else {
      return (
        <span className={`${styles.badge} ${styles.absent}`}>
          <FaTimesCircle /> Absent
        </span>
      );
    }
  };

  // Get late arrival indicator
  const getLateIndicator = (attendance) => {
    if (attendance.status === 'Present' && attendance.checkInTime) {
      const checkInHour = new Date(`2025-01-20 ${attendance.checkInTime}`).getHours();
      const checkInMinute = new Date(`2025-01-20 ${attendance.checkInTime}`).getMinutes();
      const isLate = checkInHour > 9 || (checkInHour === 9 && checkInMinute > 15);
      
      if (isLate) {
        return <FaExclamationTriangle className={styles.lateIcon} title="Late Arrival" />;
      }
    }
    return null;
  };

  const attendanceStats = useMemo(() => {
    return {
      total: filteredAndSortedEmployees.length,
      present: filteredAndSortedEmployees.filter(emp => emp.attendance.status === 'Present').length,
      absent: filteredAndSortedEmployees.filter(emp => emp.attendance.status === 'Absent').length,
      late: filteredAndSortedEmployees.filter(emp => {
        if (emp.attendance.status === 'Present' && emp.attendance.checkInTime) {
          const checkInHour = new Date(`2025-01-20 ${emp.attendance.checkInTime}`).getHours();
          const checkInMinute = new Date(`2025-01-20 ${emp.attendance.checkInTime}`).getMinutes();
          return checkInHour > 9 || (checkInHour === 9 && checkInMinute > 15);
        }
        return false;
      }).length
    };
  }, [filteredAndSortedEmployees]);

  return (
    <div className={styles.employeeAttendanceList}>
      <div className={styles.header}>
        <h2>Employee Attendance Management</h2>
        <div className={styles.date}>
          Today: {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Attendance Stats */}
      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{attendanceStats.total}</div>
          <div className={styles.statLabel}>Total Employees</div>
        </div>
        <div className={`${styles.statCard} ${styles.present}`}>
          <div className={styles.statValue}>{attendanceStats.present}</div>
          <div className={styles.statLabel}>Present Today</div>
        </div>
        <div className={`${styles.statCard} ${styles.absent}`}>
          <div className={styles.statValue}>{attendanceStats.absent}</div>
          <div className={styles.statLabel}>Absent Today</div>
        </div>
        <div className={`${styles.statCard} ${styles.late}`}>
          <div className={styles.statValue}>{attendanceStats.late}</div>
          <div className={styles.statLabel}>Late Arrivals</div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.name}>{dept.name}</option>
          ))}
        </select>

        <select
          value={attendanceFilter}
          onChange={(e) => setAttendanceFilter(e.target.value)}
          className={styles.filterSelect}
        >
          <option value="all">All Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      {/* Employee Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('employeeId')} className={styles.sortableHeader}>
                ID {getSortIcon('employeeId')}
              </th>
              <th onClick={() => handleSort('fullName')} className={styles.sortableHeader}>
                Name {getSortIcon('fullName')}
              </th>
              <th onClick={() => handleSort('role')} className={styles.sortableHeader}>
                Role {getSortIcon('role')}
              </th>
              <th onClick={() => handleSort('department')} className={styles.sortableHeader}>
                Department {getSortIcon('department')}
              </th>
              <th onClick={() => handleSort('attendanceStatus')} className={styles.sortableHeader}>
                Status {getSortIcon('attendanceStatus')}
              </th>
              <th onClick={() => handleSort('checkInTime')} className={styles.sortableHeader}>
                Check-in Time {getSortIcon('checkInTime')}
              </th>
              <th>Total Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.employeeId}</td>
                <td>
                  <div className={styles.employeeName}>
                    {employee.fullName}
                    {getLateIndicator(employee.attendance)}
                  </div>
                </td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td>{getAttendanceStatusBadge(employee.attendance)}</td>
                <td>
                  <div className={styles.timeCell}>
                    {employee.attendance.checkInTime ? (
                      <>
                        <FaRegClock className={styles.clockIcon} />
                        {employee.attendance.checkInTime}
                      </>
                    ) : (
                      <span className={styles.noTime}>--</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={styles.totalHours}>
                    {employee.attendance.totalHours}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={`${styles.actionButton} ${styles.view}`}
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedEmployees.length === 0 && (
          <div className={styles.noResults}>
            <p>No employees found matching your criteria.</p>
          </div>
        )}
      </div>

      <div className={styles.tableFooter}>
        <p>Showing {filteredAndSortedEmployees.length} of {dummyEmployees.length} employees</p>
      </div>
    </div>
  );
});

EmployeeAttendanceList.displayName = 'EmployeeAttendanceList';

export default EmployeeAttendanceList;

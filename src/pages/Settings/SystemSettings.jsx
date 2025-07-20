import React, { useState, useCallback } from 'react';
import { 
  FaSave, 
  FaUndo, 
  FaPalette, 
  FaBell, 
  FaClock, 
  FaShieldAlt,
  FaDatabase,
  FaGlobe,
  FaMoon,
  FaSun,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { systemSettings as initialSettings } from '../../data/dummyData';
import styles from './SystemSettings.module.css';

const SystemSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const sections = [
    { id: 'general', name: 'General', icon: FaGlobe },
    { id: 'appearance', name: 'Appearance', icon: FaPalette },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'attendance', name: 'Attendance', icon: FaClock },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'dataManagement', name: 'Data Management', icon: FaDatabase }
  ];

  const handleSettingChange = useCallback((section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, save to backend
      console.log('Saving settings:', settings);
      
      setHasChanges(false);
      setSaveMessage('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
      
    } catch (error) {
      setSaveMessage('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      setSettings(initialSettings);
      setHasChanges(false);
      setSaveMessage('Settings reset to default values.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const renderToggle = (section, key, label, description) => (
    <div className={styles.settingItem}>
      <div className={styles.settingInfo}>
        <label className={styles.settingLabel}>{label}</label>
        {description && <p className={styles.settingDescription}>{description}</p>}
      </div>
      <div 
        className={`${styles.toggle} ${settings[section][key] ? styles.active : ''}`}
        onClick={() => handleSettingChange(section, key, !settings[section][key])}
      >
        <div className={styles.toggleSlider}>
          {settings[section][key] ? <FaCheck /> : <FaTimes />}
        </div>
      </div>
    </div>
  );

  const renderSelect = (section, key, label, options, description) => (
    <div className={styles.settingItem}>
      <div className={styles.settingInfo}>
        <label className={styles.settingLabel}>{label}</label>
        {description && <p className={styles.settingDescription}>{description}</p>}
      </div>
      <select
        value={settings[section][key]}
        onChange={(e) => handleSettingChange(section, key, e.target.value)}
        className={styles.selectInput}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const renderInput = (section, key, label, type = 'text', description, suffix) => (
    <div className={styles.settingItem}>
      <div className={styles.settingInfo}>
        <label className={styles.settingLabel}>{label}</label>
        {description && <p className={styles.settingDescription}>{description}</p>}
      </div>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          value={settings[section][key]}
          onChange={(e) => handleSettingChange(section, key, type === 'number' ? parseInt(e.target.value) : e.target.value)}
          className={styles.textInput}
        />
        {suffix && <span className={styles.inputSuffix}>{suffix}</span>}
      </div>
    </div>
  );

  const renderThemeToggle = () => (
    <div className={styles.settingItem}>
      <div className={styles.settingInfo}>
        <label className={styles.settingLabel}>Theme Mode</label>
        <p className={styles.settingDescription}>Choose between light and dark theme</p>
      </div>
      <div className={styles.themeToggle}>
        <button
          className={`${styles.themeButton} ${settings.appearance.theme === 'light' ? styles.active : ''}`}
          onClick={() => handleSettingChange('appearance', 'theme', 'light')}
        >
          <FaSun /> Light
        </button>
        <button
          className={`${styles.themeButton} ${settings.appearance.theme === 'dark' ? styles.active : ''}`}
          onClick={() => handleSettingChange('appearance', 'theme', 'dark')}
        >
          <FaMoon /> Dark
        </button>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className={styles.sectionContent}>
            <h3>General Settings</h3>
            {renderInput('general', 'companyName', 'Company Name', 'text', 'Your organization name')}
            {renderSelect('general', 'timezone', 'Timezone', [
              { value: 'America/New_York', label: 'Eastern Time (ET)' },
              { value: 'America/Chicago', label: 'Central Time (CT)' },
              { value: 'America/Denver', label: 'Mountain Time (MT)' },
              { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
              { value: 'UTC', label: 'UTC' }
            ], 'Select your timezone')}
            {renderSelect('general', 'dateFormat', 'Date Format', [
              { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
              { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
              { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
            ])}
            {renderSelect('general', 'timeFormat', 'Time Format', [
              { value: '12-hour', label: '12-hour (AM/PM)' },
              { value: '24-hour', label: '24-hour' }
            ])}
            {renderSelect('general', 'language', 'Language', [
              { value: 'English', label: 'English' },
              { value: 'Spanish', label: 'Spanish' },
              { value: 'French', label: 'French' },
              { value: 'German', label: 'German' }
            ])}
            {renderSelect('general', 'currency', 'Currency', [
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' },
              { value: 'GBP', label: 'GBP (£)' },
              { value: 'JPY', label: 'JPY (¥)' }
            ])}
          </div>
        );

      case 'appearance':
        return (
          <div className={styles.sectionContent}>
            <h3>Appearance Settings</h3>
            {renderThemeToggle()}
            {renderInput('appearance', 'primaryColor', 'Primary Color', 'color', 'Main brand color for the interface')}
            {renderToggle('appearance', 'sidebarCollapsed', 'Collapse Sidebar', 'Start with sidebar minimized')}
            {renderToggle('appearance', 'compactView', 'Compact View', 'Use less spacing for a more compact interface')}
          </div>
        );

      case 'notifications':
        return (
          <div className={styles.sectionContent}>
            <h3>Notification Settings</h3>
            {renderToggle('notifications', 'emailNotifications', 'Email Notifications', 'Receive notifications via email')}
            {renderToggle('notifications', 'pushNotifications', 'Push Notifications', 'Receive browser push notifications')}
            {renderToggle('notifications', 'lateArrivalAlerts', 'Late Arrival Alerts', 'Get notified when employees arrive late')}
            {renderToggle('notifications', 'absenteeAlerts', 'Absentee Alerts', 'Get notified about employee absences')}
            {renderToggle('notifications', 'reportReminders', 'Report Reminders', 'Receive reminders for scheduled reports')}
            {renderToggle('notifications', 'systemMaintenance', 'System Maintenance', 'Get notified about system updates and maintenance')}
          </div>
        );

      case 'attendance':
        return (
          <div className={styles.sectionContent}>
            <h3>Attendance Settings</h3>
            {renderInput('attendance', 'workStartTime', 'Work Start Time', 'time', 'Default work start time')}
            {renderInput('attendance', 'workEndTime', 'Work End Time', 'time', 'Default work end time')}
            {renderInput('attendance', 'lunchBreakDuration', 'Lunch Break Duration', 'number', 'Duration in minutes', 'minutes')}
            {renderInput('attendance', 'gracePerionMinutes', 'Grace Period', 'number', 'Grace period for late arrivals', 'minutes')}
            {renderToggle('attendance', 'autoCheckOut', 'Auto Check-out', 'Automatically check out employees at end of day')}
            {renderToggle('attendance', 'weekendTracking', 'Weekend Tracking', 'Track attendance on weekends')}
          </div>
        );

      case 'security':
        return (
          <div className={styles.sectionContent}>
            <h3>Security Settings</h3>
            {renderInput('security', 'passwordExpiration', 'Password Expiration', 'number', 'Password expiration period', 'days')}
            {renderInput('security', 'maxLoginAttempts', 'Max Login Attempts', 'number', 'Maximum failed login attempts before lockout')}
            {renderInput('security', 'sessionTimeout', 'Session Timeout', 'number', 'Automatic logout after inactivity', 'minutes')}
            {renderToggle('security', 'twoFactorAuth', 'Two-Factor Authentication', 'Require 2FA for all users')}
            {renderToggle('security', 'ipWhitelisting', 'IP Whitelisting', 'Restrict access to specific IP addresses')}
          </div>
        );

      case 'dataManagement':
        return (
          <div className={styles.sectionContent}>
            <h3>Data Management Settings</h3>
            {renderSelect('dataManagement', 'backupFrequency', 'Backup Frequency', [
              { value: 'hourly', label: 'Hourly' },
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly' },
              { value: 'monthly', label: 'Monthly' }
            ], 'How often to backup system data')}
            {renderInput('dataManagement', 'dataRetention', 'Data Retention', 'number', 'How long to keep historical data', 'days')}
            {renderSelect('dataManagement', 'exportFormat', 'Default Export Format', [
              { value: 'xlsx', label: 'Excel (.xlsx)' },
              { value: 'csv', label: 'CSV (.csv)' },
              { value: 'pdf', label: 'PDF (.pdf)' },
              { value: 'json', label: 'JSON (.json)' }
            ])}
            {renderToggle('dataManagement', 'autoArchive', 'Auto Archive', 'Automatically archive old records')}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.systemSettings}>
      <div className={styles.header}>
        <h1>System Settings</h1>
        <div className={styles.headerActions}>
          {saveMessage && (
            <div className={`${styles.saveMessage} ${saveMessage.includes('Failed') ? styles.error : styles.success}`}>
              {saveMessage}
            </div>
          )}
          {hasChanges && (
            <>
              <button 
                onClick={handleReset}
                className={styles.resetButton}
                disabled={isSaving}
              >
                <FaUndo /> Reset
              </button>
              <button 
                onClick={handleSave}
                className={styles.saveButton}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className={styles.spinner}></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <div className={styles.settingsContainer}>
        <div className={styles.sidebar}>
          <nav className={styles.navigation}>
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  className={`${styles.navItem} ${activeSection === section.id ? styles.active : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className={styles.navIcon} />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className={styles.content}>
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;

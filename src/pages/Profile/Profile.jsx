import React, { useState, useCallback, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { currentUser } from '../../data/dummyData';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaRegClock,
  FaEdit,
  FaSave,
  FaTimes,
  FaCamera,
  FaShieldAlt,
  FaBriefcase,
  FaGlobe,
  FaCheckCircle
} from 'react-icons/fa';
import styles from './Profile.module.css';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [profileData, setProfileData] = useState(currentUser);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setSaveMessage('');
  }, []);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setProfileData(currentUser); // Reset to original data
    setSaveMessage('');
  }, []);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      setSaveMessage('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [profileData]);

  const handleChange = useCallback((field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleAddressChange = useCallback((field, value) => {
    setProfileData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  }, []);

  const handleEmergencyContactChange = useCallback((field, value) => {
    setProfileData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }));
  }, []);

  // Image upload handlers
  const handleImageUpload = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSaveMessage('Please select a valid image file.');
        setTimeout(() => setSaveMessage(''), 3000);
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSaveMessage('Image file size should be less than 5MB.');
        setTimeout(() => setSaveMessage(''), 3000);
        return;
      }
      
      setProfileImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h1>User Profile</h1>
        <div className={styles.headerActions}>
          {saveMessage && (
            <div className={`${styles.saveMessage} ${saveMessage.includes('Failed') ? styles.error : styles.success}`}>
              {saveMessage}
            </div>
          )}
          {!isEditing ? (
            <button onClick={handleEdit} className={styles.editButton}>
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <div className={styles.editActions}>
              <button onClick={handleCancel} className={styles.cancelButton} disabled={isLoading}>
                <FaTimes /> Cancel
              </button>
              <button onClick={handleSave} className={styles.saveButton} disabled={isLoading}>
                {isLoading ? (
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
            </div>
          )}
        </div>
      </div>

      <div className={styles.profileContainer}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile" 
                      className={styles.avatarImage}
                    />
                  ) : (
                    <FaUser className={styles.avatarIcon} />
                  )}
                </div>
                {isEditing && (
                  <>
                    <button 
                      type="button"
                      onClick={handleImageUpload}
                      className={styles.avatarEditButton}
                      title="Upload profile image"
                    >
                      <FaCamera />
                    </button>
                    {imagePreview && (
                      <button 
                        type="button"
                        onClick={handleRemoveImage}
                        className={styles.avatarRemoveButton}
                        title="Remove image"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <div className={styles.profileInfo}>
                <h2>{profileData.fullName}</h2>
                <p className={styles.role}>
                  <FaBriefcase /> {profileData.role} • {profileData.department}
                </p>
                <p className={styles.lastLogin}>
                  <FaRegClock /> Last login: {formatLastLogin(profileData.lastLogin)}
                </p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <FaUser /> Personal Information
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.firstName}</div>
                )}
              </div>
              <div className={styles.field}>
                <label>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.lastName}</div>
                )}
              </div>
              <div className={styles.field}>
                <label><FaEnvelope /> Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.email}</div>
                )}
              </div>
              <div className={styles.field}>
                <label><FaPhone /> Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.phone}</div>
                )}
              </div>
              <div className={styles.field}>
                <label><FaCalendarAlt /> Join Date</label>
                <div className={styles.value}>{formatDate(profileData.joinDate)}</div>
              </div>
              <div className={styles.field}>
                <label>Employee ID</label>
                <div className={styles.value}>{profileData.employeeId}</div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <FaMapMarkerAlt /> Address Information
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Street Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.address.street}</div>
                )}
              </div>
              <div className={styles.field}>
                <label>City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.address.city}</div>
                )}
              </div>
              <div className={styles.field}>
                <label>State</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.address.state}</div>
                )}
              </div>
              <div className={styles.field}>
                <label>ZIP Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.address.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.address.zipCode}</div>
                )}
              </div>
              <div className={styles.field}>
                <label><FaGlobe /> Country</label>
                {isEditing ? (
                  <select
                    value={profileData.address.country}
                    onChange={(e) => handleAddressChange('country', e.target.value)}
                    className={styles.select}
                  >
                    <option value="USA">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                ) : (
                  <div className={styles.value}>{profileData.address.country}</div>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <FaShieldAlt /> Emergency Contact
            </h3>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Contact Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.emergencyContact.name}
                    onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.emergencyContact.name}</div>
                )}
              </div>
              <div className={styles.field}>
                <label>Relationship</label>
                {isEditing ? (
                  <select
                    value={profileData.emergencyContact.relationship}
                    onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                    className={styles.select}
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend">Friend</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  <div className={styles.value}>{profileData.emergencyContact.relationship}</div>
                )}
              </div>
              <div className={styles.field}>
                <label><FaPhone /> Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.emergencyContact.phone}
                    onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.emergencyContact.phone}</div>
                )}
              </div>
              <div className={styles.field}>
                <label><FaEnvelope /> Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.emergencyContact.email}
                    onChange={(e) => handleEmergencyContactChange('email', e.target.value)}
                    className={styles.input}
                  />
                ) : (
                  <div className={styles.value}>{profileData.emergencyContact.email}</div>
                )}
              </div>
            </div>
          </div>

          {/* User Permissions */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <FaCheckCircle /> Permissions & Access
            </h3>
            <div className={styles.permissionsList}>
              {profileData.permissions.map((permission) => (
                <div key={permission} className={styles.permissionItem}>
                  <FaCheckCircle className={styles.permissionIcon} />
                  <span>{permission.replace(/_/g, ' ').toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

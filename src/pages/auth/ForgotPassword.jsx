import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import styles from './Auth.module.css';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll always show success
      // In real implementation, this would make an API call to send reset email
      setIsSuccess(true);
      
    } catch (error) {
      setErrors({
        submit: 'Failed to send reset email. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendAnother = () => {
    setIsSuccess(false);
    setFormData({ email: '' });
  };

  if (isSuccess) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.successContainer}>
            <FaCheckCircle className={styles.successIcon} />
            <h1 className={styles.successTitle}>Check Your Email</h1>
            <p className={styles.successMessage}>
              We've sent a password reset link to <strong>{formData.email}</strong>
            </p>
            <div className={styles.successInstructions}>
              <p>Please check your email and click the link to reset your password.</p>
              <p>If you don't see the email, check your spam folder.</p>
            </div>
            
            <div className={styles.successActions}>
              <button 
                onClick={handleSendAnother}
                className={styles.secondaryButton}
              >
                Send Another Email
              </button>
              <Link to="/login" className={styles.primaryButton}>
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Link to="/login" className={styles.backLink}>
            <FaArrowLeft /> Back to Login
          </Link>
          <h1>Forgot Password</h1>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {errors.submit && (
            <div className={styles.errorMessage}>
              {errors.submit}
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="email">
              <FaEnvelope className={styles.inputIcon} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              placeholder="Enter your email address"
              disabled={isLoading}
              autoFocus
            />
            {errors.email && (
              <span className={styles.fieldError}>{errors.email}</span>
            )}
          </div>

          <button 
            type="submit" 
            className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className={styles.spinner}></div>
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <div className={styles.authFooter}>
            <p>
              Remember your password?{' '}
              <Link to="/login" className={styles.link}>
                Sign In
              </Link>
            </p>
            <p>
              Don't have an account?{' '}
              <Link to="/register" className={styles.link}>
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

// Booking service for handling database operations

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const bookingService = {
  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create booking');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get booking by reference number
  getBookingByReference: async (referenceNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/${referenceNumber}`);
      
      if (!response.ok) {
        throw new Error('Booking not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Get analytics data
  getAnalytics: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/dashboard`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching analytics:', error);
      throw error;
    }
  },

  // Check capacity for a specific slot
  checkCapacity: async (location, date, timeSlot) => {
    try {
      const response = await fetch(`${API_BASE_URL}/capacity/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location, date, timeSlot }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to check capacity');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error checking capacity:', error);
      throw error;
    }
  },

  // Send OTP
  sendOTP: async (mobileNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (mobileNumber, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber, otp }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid OTP');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  }
};
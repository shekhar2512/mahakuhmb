// Capacity management logic for Kumbh Mela locations

export const LOCATION_CAPACITIES = {
  panchvati: {
    name: 'Panchvati',
    dailyCapacity: 200000, // Much larger capacity
    timeSlots: {
      morning: 80000,
      afternoon: 60000,
      evening: 60000
    },
    description: 'Main location with larger capacity for crowd management'
  },
  trimbakeshwar: {
    name: 'Trimbakeshwar',
    dailyCapacity: 50000, // Limited capacity due to space constraints
    timeSlots: {
      morning: 20000,
      afternoon: 15000,
      evening: 15000
    },
    description: 'Sacred Jyotirlinga location with limited space'
  }
};

export const checkCapacityAvailability = (location, date, timeSlot, currentBookings = 0) => {
  const locationConfig = LOCATION_CAPACITIES[location.toLowerCase()];
  
  if (!locationConfig) {
    throw new Error('Invalid location');
  }
  
  const slotCapacity = locationConfig.timeSlots[timeSlot.toLowerCase()];
  const availableSlots = slotCapacity - currentBookings;
  
  return {
    available: availableSlots > 0,
    capacity: slotCapacity,
    booked: currentBookings,
    remaining: Math.max(0, availableSlots),
    utilizationRate: Math.round((currentBookings / slotCapacity) * 100)
  };
};

export const getLocationPriority = (location) => {
  // Panchvati has higher priority due to larger capacity
  return location.toLowerCase() === 'panchvati' ? 1 : 2;
};

export const validateBookingCapacity = async (bookingData) => {
  const { location, selectedDate, timeSlot, numberOfMembers } = bookingData;
  
  try {
    // This would typically make an API call to check current bookings
    // For now, we'll simulate the check
    const currentBookings = await getCurrentBookings(location, selectedDate, timeSlot);
    const capacityCheck = checkCapacityAvailability(location, selectedDate, timeSlot, currentBookings);
    
    if (capacityCheck.remaining < numberOfMembers) {
      return {
        success: false,
        message: `Insufficient capacity. Only ${capacityCheck.remaining} slots available.`,
        capacityInfo: capacityCheck
      };
    }
    
    return {
      success: true,
      message: 'Booking can be confirmed',
      capacityInfo: capacityCheck
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error checking capacity',
      error: error.message
    };
  }
};

// Mock function - replace with actual API call
const getCurrentBookings = async (location, date, timeSlot) => {
  // This should fetch from your PostgreSQL database
  // For now, returning mock data based on location capacity logic
  const baseBookings = {
    panchvati: {
      morning: 65000,
      afternoon: 45000,
      evening: 55000
    },
    trimbakeshwar: {
      morning: 18000,
      afternoon: 12000,
      evening: 13000
    }
  };
  
  return baseBookings[location.toLowerCase()]?.[timeSlot.toLowerCase()] || 0;
};
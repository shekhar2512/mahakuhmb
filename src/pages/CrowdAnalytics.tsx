import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';

const CrowdAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real analytics data from backend
  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      // Replace with your actual backend API endpoint
      const response = await fetch('/api/analytics/dashboard');
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Fallback to mock data if API fails
      setAnalyticsData(getMockAnalyticsData());
    } finally {
      setIsLoading(false);
    }
  };

  const getMockAnalyticsData = () => ({
    overallStats: [
      {
        icon: Users,
        title: 'Total Registrations',
        value: '8,45,230',
        change: '+12.5%',
        changeType: 'increase'
      },
      {
        icon: CheckCircle,
        title: 'Confirmed Passes',
        value: '7,89,150',
        change: '+8.3%',
        changeType: 'increase'
      },
      {
        icon: Calendar,
        title: 'Peak Day Bookings',
        value: '1,85,000',
        change: 'Aug 15',
        changeType: 'neutral'
      },
      {
        icon: Activity,
        title: 'Current Capacity',
        value: '78%',
        change: 'Optimal',
        changeType: 'neutral'
      }
    ],
    locationStats: [
      {
        location: 'Panchvati',
        totalCapacity: 200000, // Increased capacity for Panchvati
        currentBookings: 145000,
        utilizationRate: 73,
        peakHours: 'Morning (6-9 AM)',
        status: 'moderate'
      },
      {
        location: 'Trimbakeshwar',
        totalCapacity: 50000, // Reduced capacity for Trimbakeshwar
        currentBookings: 38000,
        utilizationRate: 76,
        peakHours: 'Evening (6-8 PM)',
        status: 'high'
      }
    ],
    timeSlotData: [
      { slot: 'Morning', bookings: 65000, capacity: 85000, percentage: 76 },
      { slot: 'Afternoon', bookings: 48000, capacity: 65000, percentage: 74 },
      { slot: 'Evening', bookings: 70000, capacity: 100000, percentage: 70 }
    ],
    dailyTrends: [
      { date: '2027-08-02', bookings: 25000, capacity: 50000 },
      { date: '2027-08-05', bookings: 45000, capacity: 50000 },
      { date: '2027-08-10', bookings: 48000, capacity: 50000 },
      { date: '2027-08-15', bookings: 50000, capacity: 50000 },
      { date: '2027-08-20', bookings: 47000, capacity: 50000 },
      { date: '2027-08-25', bookings: 43000, capacity: 50000 },
      { date: '2027-09-01', bookings: 46000, capacity: 50000 },
      { date: '2027-09-05', bookings: 44000, capacity: 50000 },
      { date: '2027-09-11', bookings: 42000, capacity: 50000 }
    ]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-slate-600">Loading analytics data...</p>
          </div>
        </div>
      </div>
    );
  }

  const { overallStats, locationStats, timeSlotData, dailyTrends } = analyticsData || getMockAnalyticsData();

  // Remove the mock data arrays and use the fetched data instead

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUtilizationColor = (rate: number) => {
    if (rate >= 80) return 'bg-red-500';
    if (rate >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <BarChart3 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Crowd Analytics Dashboard
          </h1>
          <p className="text-xl text-slate-600">
            Real-time insights and crowd management analytics
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Analytics Overview</h2>
          <p className="text-slate-600">
            Showing data for entire booking period: August 2 - September 11, 2027
          </p>
          <button 
            onClick={fetchAnalyticsData}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Data
          </button>
        </div>

        {/* Overall Statistics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overallStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-12 w-12 text-blue-600" />
                <div className={`text-sm font-semibold px-2 py-1 rounded ${
                  stat.changeType === 'increase' ? 'text-green-600 bg-green-100' :
                  stat.changeType === 'decrease' ? 'text-red-600 bg-red-100' :
                  'text-slate-600 bg-slate-100'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Location-wise Analytics */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Location-wise Capacity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {locationStats.map((location, index) => (
              <div key={index} className="border border-slate-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900">{location.location}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(location.status)}`}>
                    {location.utilizationRate}% Utilized
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Capacity Utilization</span>
                      <span>{location.currentBookings.toLocaleString()} / {location.totalCapacity.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getUtilizationColor(location.utilizationRate)}`}
                        style={{ width: `${location.utilizationRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600 block">Peak Hours</span>
                      <span className="font-semibold text-slate-900">{location.peakHours}</span>
                    </div>
                    <div>
                      <span className="text-slate-600 block">Available Slots</span>
                      <span className="font-semibold text-green-600">
                        {(location.totalCapacity - location.currentBookings).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Slot Distribution */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Time Slot Distribution</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {timeSlotData.map((slot, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-slate-900">{slot.slot}</h3>
                </div>
                
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray={`${slot.percentage}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900">{slot.percentage}%</span>
                  </div>
                </div>
                
                <div className="text-sm text-slate-600">
                  <div>{slot.bookings.toLocaleString()} bookings</div>
                  <div>of {slot.capacity.toLocaleString()} capacity</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Trends */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Daily Booking Trends</h2>
          <div className="space-y-4">
            {dailyTrends.map((day, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium text-slate-600">
                  {new Date(day.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-slate-600 mb-1">
                    <span>Bookings</span>
                    <span>{day.bookings.toLocaleString()} / {day.capacity.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${(day.bookings / day.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm font-semibold text-slate-900">
                    {Math.round((day.bookings / day.capacity) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts and Recommendations */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-3" />
              <h2 className="text-2xl font-bold text-slate-900">Alerts</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="font-semibold text-red-800">High Capacity Alert</span>
                </div>
                <p className="text-red-700 text-sm mt-1">
                  Panchvati location is at 83% capacity for August 15th
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="font-semibold text-yellow-800">Peak Time Warning</span>
                </div>
                <p className="text-yellow-700 text-sm mt-1">
                  Morning slots are filling up faster than expected
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-slate-900">Recommendations</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">Optimize Distribution</span>
                </div>
                <p className="text-blue-700 text-sm mt-1">
                  Promote afternoon slots to balance crowd distribution
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Capacity Management</span>
                </div>
                <p className="text-green-700 text-sm mt-1">
                  Current booking pace is optimal for safe crowd management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrowdAnalytics;
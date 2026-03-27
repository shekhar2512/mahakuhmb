import React, { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, Download, QrCode } from 'lucide-react';
import { bookingService } from '../api/bookingService';

interface BookingData {
  referenceNumber: string;
  fullName: string;
  location: string;
  date: string;
  timeSlot: string;
  numberOfMembers: number;
  passType: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  qrCode?: string;
}

const CheckStatus: React.FC = () => {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock booking data
  const mockBookings: { [key: string]: BookingData } = {
    'KM2027123456': {
      referenceNumber: 'KM2027123456',
      fullName: 'Rajesh Kumar',
      location: 'Panchvati',
      date: '2027-08-15',
      timeSlot: 'morning',
      numberOfMembers: 3,
      passType: 'free',
      status: 'confirmed',
      qrCode: 'KUMBH_PASS_KM2027123456_2027-08-15_morning'
    },
    'KM2027789012': {
      referenceNumber: 'KM2027789012',
      fullName: 'Priya Sharma',
      location: 'Trimbakeshwar',
      date: '2027-08-20',
      timeSlot: 'afternoon',
      numberOfMembers: 2,
      passType: 'vip',
      status: 'pending',
    }
  };

  const handleSearch = async () => {
    if (!referenceNumber.trim()) {
      setError('Please enter a reference number');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Make actual API call to backend
      const booking = await bookingService.getBookingByReference(referenceNumber.toUpperCase());
      if (booking) {
        setBookingData(booking);
        setError('');
      } else {
        setBookingData(null);
        setError('No booking found with this reference number');
      }
    } catch (error) {
      // Fallback to mock data if API fails
      const booking = mockBookings[referenceNumber.toUpperCase()];
      if (booking) {
        setBookingData(booking);
        setError('');
      } else {
        setBookingData(null);
        setError('No booking found with this reference number');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'pending':
        return <Clock className="h-8 w-8 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-8 w-8 text-red-600" />;
      default:
        return <Clock className="h-8 w-8 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimeSlot = (slot: string) => {
    const slots = {
      morning: 'Morning (6:00 AM - 12:00 PM)',
      afternoon: 'Afternoon (12:00 PM - 6:00 PM)',
      evening: 'Evening (6:00 PM - 10:00 PM)'
    };
    return slots[slot as keyof typeof slots] || slot;
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Search className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Check Pass Status
          </h1>
          <p className="text-xl text-slate-600">
            Enter your reference number to check your booking status
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Reference Number
              </label>
              <input
                type="text"
                placeholder="Enter your reference number (e.g., KM2027123456)"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </div>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Demo Reference Numbers */}
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Demo Reference Numbers</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="font-mono text-blue-600 font-bold">KM2027123456</p>
              <p className="text-sm text-slate-600">Confirmed booking</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="font-mono text-blue-600 font-bold">KM2027789012</p>
              <p className="text-sm text-slate-600">Pending booking</p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        {bookingData && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Status Header */}
            <div className={`p-6 ${getStatusColor(bookingData.status)}`}>
              <div className="flex items-center justify-center">
                {getStatusIcon(bookingData.status)}
                <div className="ml-4">
                  <h2 className="text-2xl font-bold capitalize">
                    {bookingData.status}
                  </h2>
                  <p className="text-sm opacity-75">
                    Reference: {bookingData.referenceNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Information */}
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Booking Details</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-sm text-slate-600 block">Full Name</span>
                      <span className="text-lg font-semibold text-slate-900">{bookingData.fullName}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 block">Location</span>
                      <span className="text-lg font-semibold text-slate-900 capitalize">{bookingData.location}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 block">Visit Date</span>
                      <span className="text-lg font-semibold text-blue-600">{formatDate(bookingData.date)}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 block">Time Slot</span>
                      <span className="text-lg font-semibold text-blue-600">{formatTimeSlot(bookingData.timeSlot)}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 block">Number of Members</span>
                      <span className="text-lg font-semibold text-slate-900">{bookingData.numberOfMembers}</span>
                    </div>
                    <div>
                      <span className="text-sm text-slate-600 block">Pass Type</span>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        bookingData.passType === 'vip' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {bookingData.passType.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                {bookingData.status === 'confirmed' && bookingData.qrCode && (
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-center mb-6">
                      <QrCode className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">Your QR Code</h3>
                      <p className="text-slate-600">Present this at entry points</p>
                    </div>
                    <div className="bg-white border-4 border-blue-200 rounded-xl p-6 shadow-lg">
                      {/* QR Code placeholder - in real app, generate actual QR code */}
                      <div className="w-32 h-32 bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                        <QrCode className="h-16 w-16 text-slate-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {bookingData.status === 'confirmed' && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                      <Download className="mr-2 h-5 w-5" />
                      Download Pass PDF
                    </button>
                    <button className="flex items-center justify-center px-8 py-4 bg-slate-600 text-white font-bold rounded-full hover:bg-slate-700 transform hover:scale-105 transition-all duration-300">
                      <QrCode className="mr-2 h-5 w-5" />
                      View QR Code
                    </button>
                  </div>
                </div>
              )}

              {bookingData.status === 'pending' && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Booking Under Review</h3>
                    <p className="text-yellow-700">
                      Your booking is being processed. You will receive confirmation within 24 hours.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckStatus;
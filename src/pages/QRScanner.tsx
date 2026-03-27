import React, { useState } from 'react';
import { QrCode, Scan, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ScannedData {
  referenceNumber: string;
  fullName: string;
  location: string;
  date: string;
  timeSlot: string;
  numberOfMembers: number;
  passType: string;
  status: 'valid' | 'invalid' | 'expired';
}

const QRScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [manualCode, setManualCode] = useState('');

  // Mock QR data
  const mockQRData: { [key: string]: ScannedData } = {
    'KUMBH_PASS_KM2027123456_2027-08-15_morning': {
      referenceNumber: 'KM2027123456',
      fullName: 'Rajesh Kumar',
      location: 'Panchvati',
      date: '2027-08-15',
      timeSlot: 'morning',
      numberOfMembers: 3,
      passType: 'free',
      status: 'valid'
    },
    'KUMBH_PASS_KM2027789012_2027-08-20_afternoon': {
      referenceNumber: 'KM2027789012',
      fullName: 'Priya Sharma',
      location: 'Trimbakeshwar',
      date: '2027-08-20',
      timeSlot: 'afternoon',
      numberOfMembers: 2,
      passType: 'vip',
      status: 'expired'
    }
  };

  const simulateQRScan = () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    setTimeout(() => {
      const qrCodes = Object.keys(mockQRData);
      const randomQR = qrCodes[Math.floor(Math.random() * qrCodes.length)];
      setScannedData(mockQRData[randomQR]);
      setIsScanning(false);
    }, 2000);
  };

  const handleManualVerification = () => {
    const data = mockQRData[manualCode];
    if (data) {
      setScannedData(data);
    } else {
      setScannedData({
        referenceNumber: 'INVALID',
        fullName: 'Unknown',
        location: 'Unknown',
        date: 'Unknown',
        timeSlot: 'Unknown',
        numberOfMembers: 0,
        passType: 'Unknown',
        status: 'invalid'
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="h-12 w-12 text-green-600" />;
      case 'expired':
        return <AlertTriangle className="h-12 w-12 text-yellow-600" />;
      case 'invalid':
        return <XCircle className="h-12 w-12 text-red-600" />;
      default:
        return <QrCode className="h-12 w-12 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'expired':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'invalid':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    if (dateStr === 'Unknown') return dateStr;
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeSlot = (slot: string) => {
    if (slot === 'Unknown') return slot;
    const slots = {
      morning: 'Morning (6:00 AM - 12:00 PM)',
      afternoon: 'Afternoon (12:00 PM - 6:00 PM)',
      evening: 'Evening (6:00 PM - 10:00 PM)'
    };
    return slots[slot as keyof typeof slots] || slot;
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Scan className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            QR Code Scanner
          </h1>
          <p className="text-xl text-slate-600">
            Scan or verify QR codes for entry validation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Scan QR Code</h2>
            
            {/* Camera View Placeholder */}
            <div className="bg-slate-100 rounded-xl p-8 mb-6 text-center">
              {isScanning ? (
                <div className="animate-pulse">
                  <Scan className="h-24 w-24 text-blue-600 mx-auto mb-4 animate-bounce" />
                  <p className="text-lg font-semibold text-slate-700">Scanning...</p>
                  <p className="text-slate-500">Please hold the QR code steady</p>
                </div>
              ) : (
                <div>
                  <QrCode className="h-24 w-24 text-slate-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-slate-700 mb-2">Ready to Scan</p>
                  <p className="text-slate-500">Position QR code within the frame</p>
                </div>
              )}
            </div>

            <button
              onClick={simulateQRScan}
              disabled={isScanning}
              className="w-full px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
            >
              {isScanning ? 'Scanning...' : 'Start Scanning'}
            </button>

            {/* Manual Verification */}
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Manual Verification</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Enter QR code data manually"
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={handleManualVerification}
                  className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700"
                >
                  Verify
                </button>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Demo: KUMBH_PASS_KM2027123456_2027-08-15_morning
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Verification Result</h2>
            
            {scannedData ? (
              <div>
                {/* Status Header */}
                <div className={`rounded-xl p-6 mb-6 border-2 ${getStatusColor(scannedData.status)}`}>
                  <div className="flex items-center justify-center mb-4">
                    {getStatusIcon(scannedData.status)}
                  </div>
                  <h3 className="text-2xl font-bold text-center capitalize mb-2">
                    {scannedData.status}
                  </h3>
                  {scannedData.status === 'valid' && (
                    <p className="text-center">Entry Authorized</p>
                  )}
                  {scannedData.status === 'expired' && (
                    <p className="text-center">Pass has expired or time slot has passed</p>
                  )}
                  {scannedData.status === 'invalid' && (
                    <p className="text-center">Invalid QR code or pass not found</p>
                  )}
                </div>

                {/* Pass Details */}
                {scannedData.status !== 'invalid' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-slate-600 block">Reference Number</span>
                        <span className="font-semibold text-slate-900">{scannedData.referenceNumber}</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600 block">Pass Type</span>
                        <span className={`inline-block px-2 py-1 rounded text-sm font-semibold ${
                          scannedData.passType === 'vip' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {scannedData.passType.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-slate-600 block">Full Name</span>
                      <span className="text-lg font-semibold text-slate-900">{scannedData.fullName}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-slate-600 block">Location</span>
                        <span className="font-semibold text-slate-900 capitalize">{scannedData.location}</span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-600 block">Members</span>
                        <span className="font-semibold text-slate-900">{scannedData.numberOfMembers}</span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm text-slate-600 block">Visit Date</span>
                      <span className="font-semibold text-blue-600">{formatDate(scannedData.date)}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm text-slate-600 block">Time Slot</span>
                      <span className="font-semibold text-blue-600">{formatTimeSlot(scannedData.timeSlot)}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setScannedData(null)}
                  className="w-full mt-6 px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700"
                >
                  Scan Another Code
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <QrCode className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-lg text-slate-500">No QR code scanned yet</p>
                <p className="text-slate-400">Scan a QR code to see verification results</p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Scanner Instructions:</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Ensure good lighting when scanning QR codes</li>
            <li>• Hold the device steady and position QR code within the frame</li>
            <li>• Valid passes will show green status with entry authorization</li>
            <li>• Expired or invalid passes will be clearly marked</li>
            <li>• Use manual verification if automatic scanning fails</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
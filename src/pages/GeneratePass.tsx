import React, { useState } from 'react';
import { Calendar, Clock, Users, Download, QrCode, Plus, Minus, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PassGenerator from '../components/PassGenerator';
import { validateBookingCapacity, LOCATION_CAPACITIES } from '../utils/capacityLogic';

interface FamilyMember {
  name: string;
  age: string;
  gender: string;
}

interface FormData {
  fullName: string;
  aadhaarNumber: string;
  mobileNumber: string;
  location: string;
  selectedDate: string;
  timeSlot: string;
  passType: 'free' | 'vip';
  numberOfMembers: number;
  familyMembers: FamilyMember[];
  otp: string;
}

const GeneratePass: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passGenerated, setPassGenerated] = useState(false);
  const [generatedPassData, setGeneratedPassData] = useState(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    aadhaarNumber: '',
    mobileNumber: '',
    location: '',
    selectedDate: '',
    timeSlot: '',
    passType: 'free',
    numberOfMembers: 1,
    familyMembers: [{ name: '', age: '', gender: '' }],
    otp: ''
  });

  const timeSlots = [
    { value: 'morning', label: 'Morning (6:00 AM - 12:00 PM)' },
    { value: 'afternoon', label: 'Afternoon (12:00 PM - 6:00 PM)' },
    { value: 'evening', label: 'Evening (6:00 PM - 10:00 PM)' }
  ];

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberCountChange = (increment: boolean) => {
    const maxMembers = formData.passType === 'free' ? 4 : 5;
    const newCount = increment 
      ? Math.min(formData.numberOfMembers + 1, maxMembers)
      : Math.max(formData.numberOfMembers - 1, 1);
    
    setFormData(prev => ({
      ...prev,
      numberOfMembers: newCount,
      familyMembers: Array(newCount).fill(0).map((_, i) => 
        prev.familyMembers[i] || { name: '', age: '', gender: '' }
      )
    }));
  };

  const updateFamilyMember = (index: number, field: keyof FamilyMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      familyMembers: prev.familyMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const sendOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (formData.otp === '123456') { // Demo OTP
        setOtpVerified(true);
        setCurrentStep(2);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = () => {
    if (formData.passType === 'vip') {
      navigate('/payment', { state: { formData } });
    } else {
      // Process free pass - generate pass data
      const passData = {
        applicantName: formData.fullName,
        age: '25', // You might want to add age field to form
        gender: 'male', // You might want to add gender field to form
        mobile: formData.mobileNumber,
        city: 'Unknown', // You might want to add city field to form
        familyMembers: formData.familyMembers,
        selectedDate: formData.selectedDate,
        timeSlot: formData.timeSlot,
        passId: `KM2027${Date.now().toString().slice(-6)}`,
        issueDate: new Date().toLocaleDateString('en-IN'),
        qrData: `KUMBH_PASS_KM2027${Date.now().toString().slice(-6)}_${formData.selectedDate}_${formData.timeSlot}`
      };
      
      setGeneratedPassData(passData);
      setPassGenerated(true);
      setCurrentStep(3);
    }
  };

  const generateDateOptions = () => {
    const startDate = new Date('2027-08-02');
    const endDate = new Date('2027-09-11');
    const options = [];
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      options.push(
        <option key={dateStr} value={dateStr}>
          {d.toLocaleDateString('en-IN')}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <QrCode className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Generate Smart Pass
          </h1>
          <p className="text-xl text-slate-600">
            Fill in your details to generate your Kumbh Mela 2027 Smart Pass
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Personal Details */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Personal Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  pattern="[A-Za-z\s]+"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name (letters only)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Aadhaar Number *
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{12}"
                  maxLength={12}
                  value={formData.aadhaarNumber}
                  onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="12-digit Aadhaar number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10-digit mobile number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location *
                </label>
                <select
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Location</option>
                  <option value="panchvati">Panchvati</option>
                  <option value="trimbakeshwar">Trimbakeshwar</option>
                </select>
                {formData.location && (
                  <p className="text-sm text-slate-600 mt-2">
                    {LOCATION_CAPACITIES[formData.location]?.description}
                  </p>
                )}
              </div>
            </div>

            {/* OTP Verification */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Mobile Verification</h3>
              {!otpSent ? (
                <button
                  onClick={sendOTP}
                  disabled={!formData.mobileNumber || isLoading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </button>
              ) : (
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => handleInputChange('otp', e.target.value)}
                    className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={verifyOTP}
                    disabled={formData.otp.length !== 6 || isLoading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              )}
              {otpSent && !otpVerified && (
                <p className="text-sm text-slate-600 mt-2">Demo OTP: 123456</p>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!otpVerified}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
              >
                Continue to Pass Details
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Pass Details */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Pass Details</h2>
            
            {/* Pass Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-4">Pass Type *</label>
              <div className="grid md:grid-cols-2 gap-4">
                <div 
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.passType === 'free' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleInputChange('passType', 'free')}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Free Pass</h3>
                  <p className="text-slate-600 mb-2">Maximum 4 members</p>
                  <p className="text-2xl font-bold text-green-600">₹0</p>
                </div>
                
                <div 
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.passType === 'vip' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => handleInputChange('passType', 'vip')}
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-2">VIP Pass</h3>
                  <p className="text-slate-600 mb-2">Maximum 5 members + Priority entry</p>
                  <p className="text-2xl font-bold text-blue-600">₹500</p>
                </div>
              </div>
            </div>

            {/* Visit Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Visit Date *
                </label>
                <select
                  required
                  value={formData.selectedDate}
                  onChange={(e) => handleInputChange('selectedDate', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Date</option>
                  {generateDateOptions()}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Time Slot *
                </label>
                <select
                  required
                  value={formData.timeSlot}
                  onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Time Slot</option>
                  {timeSlots.map(slot => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Number of Members */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Number of Members (including you)
              </label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleMemberCountChange(false)}
                  disabled={formData.numberOfMembers <= 1}
                  className="p-2 bg-slate-200 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="text-2xl font-bold text-slate-900 min-w-[3rem] text-center">
                  {formData.numberOfMembers}
                </span>
                <button
                  type="button"
                  onClick={() => handleMemberCountChange(true)}
                  disabled={formData.numberOfMembers >= (formData.passType === 'free' ? 4 : 5)}
                  className="p-2 bg-slate-200 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <span className="text-sm text-slate-600">
                  Max: {formData.passType === 'free' ? 4 : 5} members
                </span>
              </div>
            </div>

            {/* Family Members Details */}
            {formData.numberOfMembers > 1 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Family Members Details
                </h3>
                {formData.familyMembers.slice(1).map((member, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-6 mb-4">
                    <h4 className="text-md font-medium text-slate-900 mb-4">
                      Member {index + 2}
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        required
                        value={member.name}
                        onChange={(e) => updateFamilyMember(index + 1, 'name', e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        required
                        min="1"
                        max="120"
                        value={member.age}
                        onChange={(e) => updateFamilyMember(index + 1, 'age', e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <select
                        required
                        value={member.gender}
                        onChange={(e) => updateFamilyMember(index + 1, 'gender', e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
              >
                {formData.passType === 'vip' ? (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Payment
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Generate Free Pass
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Pass Generated (for free passes) */}
        {currentStep === 3 && formData.passType === 'free' && !passGenerated && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Pass Generated Successfully!</h2>
              <p className="text-xl text-slate-600">Your Kumbh Mela Smart Pass is ready</p>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Reference Number</h3>
              <p className="text-2xl font-bold text-blue-600">KM2027{Date.now().toString().slice(-6)}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
                Download Pass PDF
              </button>
              <button 
                onClick={() => navigate('/check-status')}
                className="px-8 py-4 bg-slate-600 text-white font-bold rounded-full hover:bg-slate-700 transform hover:scale-105 transition-all duration-300"
              >
                Check Status
              </button>
            </div>
          </div>
        )}
        
        {/* Pass Generator Component */}
        {passGenerated && generatedPassData && (
          <PassGenerator 
            passData={generatedPassData}
            onBack={() => {
              setPassGenerated(false);
              setCurrentStep(2);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GeneratePass;
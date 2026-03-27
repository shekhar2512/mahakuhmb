import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  Shield, 
  CheckCircle, 
  ArrowLeft,
  Lock
} from 'lucide-react';

const PaymentGateway: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const formData = location.state?.formData;

  const paymentMethods = [
    {
      id: 'upi',
      name: 'UPI Payment',
      icon: Smartphone,
      description: 'Pay using UPI apps like GPay, PhonePe, Paytm'
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: Building2,
      description: 'Pay using your bank account'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Pay using Visa, Mastercard, RuPay'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const refNumber = `KM2027${Date.now().toString().slice(-6)}`;
      setReferenceNumber(refNumber);
      setPaymentSuccess(true);
      setIsProcessing(false);
    }, 3000);
  };

  if (!formData) {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Invalid Access</h1>
          <p className="text-slate-600 mb-8">Please generate a pass first.</p>
          <button
            onClick={() => navigate('/generate-pass')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Generate Pass
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Successful!</h1>
            <p className="text-xl text-slate-600 mb-8">Your VIP pass booking has been confirmed</p>
            
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Reference Number</h3>
              <p className="text-2xl font-bold text-blue-600">{referenceNumber}</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Booking Status: Pending</h3>
              <p className="text-green-700">
                Your booking is being processed. You will receive confirmation within 24 hours.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/check-status')}
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
              >
                Check Status
              </button>
              <button 
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-slate-600 text-white font-bold rounded-full hover:bg-slate-700 transform hover:scale-105 transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Secure Payment</h1>
            <p className="text-slate-600">Complete your VIP pass payment</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <Lock className="h-6 w-6 text-green-600 mr-2" />
                <span className="text-sm text-green-600 font-semibold">Secured by 256-bit SSL encryption</span>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Payment Method</h2>
              
              <div className="space-y-4 mb-8">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center">
                      <method.icon className="h-8 w-8 text-blue-600 mr-4" />
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{method.name}</h3>
                        <p className="text-slate-600">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Form based on selected method */}
              {selectedMethod === 'upi' && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">UPI Payment</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'netbanking' && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Net Banking</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Select Bank
                    </label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                  </div>
                </div>
              )}

              {selectedMethod === 'card' && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Card Payment</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name on card"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-8 px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Shield className="mr-2 h-6 w-6" />
                    Pay ₹500 Securely
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-600">Pass Type</span>
                  <span className="font-semibold text-purple-600">VIP Pass</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Members</span>
                  <span className="font-semibold">{formData.numberOfMembers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Location</span>
                  <span className="font-semibold capitalize">{formData.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Date</span>
                  <span className="font-semibold">
                    {new Date(formData.selectedDate).toLocaleDateString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Time Slot</span>
                  <span className="font-semibold capitalize">{formData.timeSlot}</span>
                </div>
              </div>
              
              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-slate-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹500</span>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-700 font-medium">
                    100% Secure Payment
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
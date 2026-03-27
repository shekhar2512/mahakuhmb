import React, { useRef, useEffect } from 'react';
import { Download, ArrowLeft, QrCode as QrCodeIcon } from 'lucide-react';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface PassData {
  applicantName: string;
  age: string;
  gender: string;
  mobile: string;
  city: string;
  familyMembers: Array<{ name: string; age: string; gender: string }>;
  selectedDate: string;
  timeSlot: string;
  passId: string;
  issueDate: string;
  qrData: string;
}

interface PassGeneratorProps {
  passData: PassData;
  onBack: () => void;
}

const PassGenerator: React.FC<PassGeneratorProps> = ({ passData, onBack }) => {
  const passRef = useRef<HTMLDivElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    generateQRCode();
  }, [passData.qrData]);

  const generateQRCode = async () => {
    if (qrCanvasRef.current) {
      try {
        await QRCode.toCanvas(qrCanvasRef.current, passData.qrData, {
          width: 120,
          margin: 2,
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    }
  };

  const downloadAsPDF = async () => {
    if (passRef.current) {
      try {
        // Hide any elements that shouldn't appear in PDF
        const buttonsToHide = passRef.current.querySelectorAll('button');
        buttonsToHide.forEach(btn => btn.style.display = 'none');
        
        const canvas = await html2canvas(passRef.current, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false,
          allowTaint: true,
          foreignObjectRendering: true
        });
        
        // Restore hidden elements
        buttonsToHide.forEach(btn => btn.style.display = '');
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Calculate dimensions to fit the page properly
        const imgWidth = canvas.width / 2; // Adjust for scale
        const imgHeight = canvas.height / 2;
        const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 40) / imgHeight);
        
        const finalWidth = imgWidth * ratio;
        const finalHeight = imgHeight * ratio;
        const imgX = (pdfWidth - finalWidth) / 2;
        const imgY = 30;
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, finalWidth, finalHeight);
        pdf.save(`Kumbh_Mela_Pass_${passData.passId}.pdf`);
        
        // Show success message
        alert('Pass downloaded successfully!');
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error downloading pass. Please try again.');
      }
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeSlot = (slot: string) => {
    const slots = {
      morning: 'Morning (6:00 AM - 12:00 PM)',
      afternoon: 'Afternoon (12:00 PM - 6:00 PM)',
      evening: 'Evening (6:00 PM - 10:00 PM)'
    };
    return slots[slot as keyof typeof slots] || slot;
  };

  const getActiveMembers = () => {
    return passData.familyMembers.filter(member => member.name.trim() !== '');
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Form
          </button>
          <button
            onClick={downloadAsPDF}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-yellow-600 text-white rounded-lg hover:from-orange-700 hover:to-yellow-700 transition-colors shadow-lg"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </button>
        </div>

        {/* Pass Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" ref={passRef}>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-8 text-center">
            <h1 className="text-3xl font-bold mb-2">कुंभ मेला स्मार्ट पास</h1>
            <h2 className="text-2xl font-semibold mb-1">Kumbh Mela Smart Pass 2027</h2>
            <p className="text-lg opacity-90">Nashik, Maharashtra</p>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Section - Details */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Pass Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600 block">Pass ID</span>
                      <span className="text-lg font-bold text-orange-600">{passData.passId}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600 block">Issue Date</span>
                      <span className="text-lg font-semibold">{passData.issueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Applicant Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 block">Name</span>
                      <span className="font-semibold">{passData.applicantName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Age</span>
                      <span className="font-semibold">{passData.age} years</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Gender</span>
                      <span className="font-semibold capitalize">{passData.gender}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Mobile</span>
                      <span className="font-semibold">{passData.mobile}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600 block">City</span>
                      <span className="font-semibold">{passData.city}</span>
                    </div>
                  </div>
                </div>

                {getActiveMembers().length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                      Family Members ({getActiveMembers().length})
                    </h3>
                    <div className="space-y-2">
                      {getActiveMembers().map((member, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-sm text-gray-600">
                            {member.age} yrs, {member.gender}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                    Visit Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 block">Visit Date</span>
                      <span className="text-lg font-semibold text-orange-600">
                        {formatDate(passData.selectedDate)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 block">Time Slot</span>
                      <span className="text-lg font-semibold text-orange-600">
                        {formatTimeSlot(passData.timeSlot)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - QR Code */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-center mb-4">
                  <QrCodeIcon className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-gray-900">Scan for Entry</h3>
                </div>
                <div className="bg-white border-4 border-orange-200 rounded-xl p-4 shadow-lg">
                  <canvas ref={qrCanvasRef} />
                </div>
                <p className="text-xs text-gray-500 text-center mt-2 max-w-32">
                  Present this QR code at entry points
                </p>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-gray-50 px-8 py-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Important:</strong> This pass is valid only for the selected date and time slot.
                Please carry a valid photo ID along with this pass.
              </p>
              <p className="text-xs text-gray-500">
                Issued under crowd safety initiative by Maharashtra Government
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-semibold text-orange-600">
                  "Safety and Devotion go Hand in Hand – Kumbh Mela 2027"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Pass Instructions:</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Present this pass and a valid photo ID at entry points</li>
            <li>• Entry is allowed only during your selected time slot</li>
            <li>• Each pass is valid for one visit only on the selected date</li>
            <li>• Children below 5 years do not require separate passes</li>
            <li>• Follow all safety guidelines and instructions from authorities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PassGenerator;
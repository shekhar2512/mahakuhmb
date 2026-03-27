import React from 'react';
import { Heart, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">Kumbh Mela Smart Pass 2027</span>
          </div>
          <div className="flex items-center justify-center text-blue-100 mb-4">
            <Heart className="h-4 w-4 mr-2" />
            <span className="italic">
              "Safety and Devotion go Hand in Hand – Kumbh Mela 2027"
            </span>
          </div>
          <div className="text-sm text-blue-100">
            <p>Organized under the guidance of Maharashtra Government</p>
            <p className="mt-2">© 2027 Nashik Kumbh Mela Smart Pass System. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Users, AlertTriangle, Shield, Calendar, MapPin, Clock, Building2, Droplets } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    {
      icon: Users,
      label: 'Expected Pilgrims',
      value: '1 Crore+',
      description: 'Over 41 days'
    },
    {
      icon: Calendar,
      label: 'Daily Visitors',
      value: '1.5-2 Lakh',
      description: 'Regular days'
    },
    {
      icon: Clock,
      label: 'Shahi Snan Days',
      value: '5 Lakh',
      description: 'Maximum per day'
    },
    {
      icon: MapPin,
      label: 'Duration',
      value: '41 Days',
      description: 'Aug 2 - Sep 11, 2027'
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Kumbh Mela</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The world's largest peaceful gathering, where millions of devotees come together 
            in a celebration of faith, spirituality, and cultural heritage
          </p>
        </div>

        {/* Significance Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              The Sacred Significance
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  The Kumbh Mela is not just a festival; it's a spiritual phenomenon that has been 
                  celebrated for centuries. Nashik, situated on the banks of the holy Godavari River, 
                  becomes the center of devotion as millions gather to take the sacred dip during 
                  auspicious planetary alignments.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This ancient tradition represents the confluence of faith, culture, and humanity, 
                  where pilgrims from across the globe come seeking spiritual purification and divine blessings.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 rounded-xl p-6">
                    <MapPin className="h-10 w-10 text-blue-600 mb-3" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Panchvati</h4>
                    <p className="text-slate-700 text-sm">Sacred site of Lord Rama's exile, where devotees take holy dips in the Godavari River</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <Building2 className="h-10 w-10 text-blue-600 mb-3" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">Trimbakeshwar</h4>
                    <p className="text-slate-700 text-sm">Home to one of the twelve Jyotirlingas and source of the holy Godavari River</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/9715673/pexels-photo-9715673.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Godavari Ghat" 
                  className="rounded-xl shadow-lg w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="mb-16">
          <div className="bg-red-50 border-l-4 border-red-400 rounded-xl p-8">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-red-800">Learning from Experience</h2>
            </div>
            <p className="text-lg text-red-700 mb-4">
              The tragic stampede at Prayagraj Maha Kumbh 2025 highlighted the critical need for 
              better crowd management and safety measures during large spiritual gatherings.
            </p>
            <p className="text-lg text-red-700">
              Learning from this incident, the Maharashtra Government has introduced the Smart Pass 
              system to ensure the safety, discipline, and controlled entry of devotees, making 
              the Nashik Kumbh Mela 2027 a model for safe spiritual gatherings.
            </p>
          </div>
        </section>

        {/* Smart Pass Solution */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Smart Pass: Our Solution
              </h2>
              <p className="text-xl text-gray-700">
                Ensuring Safety, Discipline, and Controlled Entry
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety First</h3>
                <p className="text-gray-700">
                  Preventing overcrowding and ensuring emergency response capabilities 
                  through controlled entry systems.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Organized Flow</h3>
                <p className="text-gray-700">
                  Time-slot based entries ensuring smooth movement and comfortable 
                  experience for all pilgrims.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Innovation</h3>
                <p className="text-gray-700">
                  QR code-based passes enabling quick verification and real-time 
                  crowd monitoring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Kumbh Mela 2027 - By the Numbers
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Shield, 
  MapPin, 
  Clock,
  Heart,
  Droplets,
  Building2,
  Stethoscope,
  Car,
  HelpCircle,
  BarChart3,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';

const Home: React.FC = () => {
  const facilities = [
    {
      icon: Shield,
      title: 'Crowd Management',
      description: 'Advanced crowd control systems ensuring safe movement of devotees'
    },
    {
      icon: Stethoscope,
      title: 'Medical Facilities',
      description: '24/7 medical support with emergency response teams'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Comprehensive security arrangements for peaceful pilgrimage'
    },
    {
      icon: Droplets,
      title: 'Drinking Water',
      description: 'Clean drinking water facilities at multiple locations'
    },
    {
      icon: HelpCircle,
      title: 'Help Centers',
      description: 'Information and assistance centers for devotees'
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Organized transportation and parking facilities'
    }
  ];

  const analytics = [
    {
      icon: Users,
      title: 'Expected Devotees',
      value: '1 Crore+',
      description: 'Over 41 days'
    },
    {
      icon: Calendar,
      title: 'Daily Capacity',
      value: '2 Lakh',
      description: 'Slot-based entries'
    },
    {
      icon: MapPin,
      title: 'Locations',
      value: '2 Main',
      description: 'Panchvati & Trimbakeshwar'
    },
    {
      icon: Clock,
      title: 'Time Slots',
      value: '3 Daily',
      description: 'Morning, Afternoon, Evening'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(30, 58, 138, 0.4), rgba(59, 130, 246, 0.4)), url("https://images.pexels.com/photos/8112199/pexels-photo-8112199.jpeg?auto=compress&cs=tinysrgb&w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <Shield className="h-20 w-20 text-blue-300 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              <span className="text-blue-200">नासिक</span> सिंहस्थ कुंभ मेला
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-8 drop-shadow-md">
              Smart Pass System 2027
            </h2>
          </div>
          
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12 shadow-2xl">
            <p className="text-xl md:text-3xl font-bold text-blue-600 mb-6">
              Faith • Devotion • Digital Innovation
            </p>
            <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed">
              Experience the sacred gathering with enhanced safety, organized entry, 
              and seamless crowd management through our advanced Smart Pass system
            </p>
            <div className="flex items-center justify-center space-x-3 text-blue-600 mb-8">
              <Calendar className="h-7 w-7" />
              <span className="text-xl md:text-2xl font-bold">2nd August – 11th September 2027</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/generate-pass"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-full hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Generate Smart Pass
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
            <Link
              to="/check-status"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-full border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Check Pass Status
              <CheckCircle className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      {/* About Kumbh Mela Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About <span className="text-blue-600">Kumbh Mela</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              The world's largest peaceful gathering, where millions unite in devotion at the sacred confluence
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-blue-50 rounded-2xl p-8">
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Panchvati</h3>
                <p className="text-slate-700 leading-relaxed">
                  The sacred site where Lord Rama, Sita, and Lakshmana spent their exile years. 
                  The holy Godavari River flows through this divine location, making it perfect for the sacred bath.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-8">
                <Building2 className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Trimbakeshwar</h3>
                <p className="text-slate-700 leading-relaxed">
                  Home to one of the twelve Jyotirlingas, Trimbakeshwar is where the Godavari River originates. 
                  This sacred temple town holds immense spiritual significance for devotees.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/9715673/pexels-photo-9715673.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Godavari Ghat" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Pass System Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Why Smart Pass System?
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Learning from past experiences, we've introduced an intelligent crowd management system 
              to ensure safety, organization, and a peaceful spiritual experience for all devotees
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Users className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Reduce Overcrowding</h3>
              <p className="text-slate-600">
                Controlled entry system prevents dangerous overcrowding and ensures comfortable movement
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Heart className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Better Experience</h3>
              <p className="text-slate-600">
                Organized visits allow devotees to focus on their spiritual journey without chaos
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Organized Entry</h3>
              <p className="text-slate-600">
                Systematic entry process with designated time slots for smooth crowd flow
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <Clock className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-4">Slot-based Visits</h3>
              <p className="text-slate-600">
                Pre-scheduled time slots ensure optimal crowd distribution throughout the day
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              World-Class <span className="text-blue-600">Facilities</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              Comprehensive infrastructure and services to ensure a safe, comfortable, and memorable pilgrimage
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <facility.icon className="h-14 w-14 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">{facility.title}</h3>
                <p className="text-slate-600 leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crowd Analytics Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BarChart3 className="h-16 w-16 text-blue-300 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Smart <span className="text-blue-300">Analytics</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto">
              Data-driven crowd management for optimal devotee experience and safety
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {analytics.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-colors">
                <stat.icon className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-blue-200 mb-2">{stat.title}</div>
                <div className="text-sm text-blue-100">{stat.description}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/analytics"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              View Detailed Analytics
              <BarChart3 className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Star className="h-16 w-16 text-blue-200 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Begin Your Sacred Journey
          </h2>
          <p className="text-xl text-blue-100 mb-12 leading-relaxed">
            Join millions of devotees in this divine celebration. Generate your Smart Pass now 
            for a safe, organized, and spiritually fulfilling experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/generate-pass"
              className="inline-flex items-center px-10 py-5 bg-white text-blue-600 font-bold text-xl rounded-full hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Award className="mr-3 h-7 w-7" />
              Generate Pass
            </Link>
            <Link
              to="/check-status"
              className="inline-flex items-center px-10 py-5 bg-blue-800 text-white font-bold text-xl rounded-full border-2 border-blue-400 hover:bg-blue-900 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <CheckCircle className="mr-3 h-7 w-7" />
              Check Status
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
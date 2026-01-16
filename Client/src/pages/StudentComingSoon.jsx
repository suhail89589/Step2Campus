import React from 'react';
import { Rocket, Clock, Bell } from 'lucide-react';

const StudentComingSoon = ({ user }) => {
  return (
    <div className="hero-gradient min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full glass-card-strong rounded-[2.5rem] p-12 text-center shadow-2xl border border-white/20">
        <div className="mb-8 flex justify-center">
          <div className="bg-white/20 p-6 rounded-3xl float-animation">
            <Rocket size={60} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4">
          Hello, {user?.name?.split(' ')[0] || 'Aspirant'}!
        </h1>
        <p className="text-xl text-white/80 mb-8 leading-relaxed">
          Your account is ready, but our mentors are currently being verified to ensure you get the best guidance. 
          <span className="block mt-2 font-semibold">The Step2Campus dashboard launches in 12 days!</span>
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 text-white border border-white/10">
            <Clock size={20} className="text-orange-300" />
            <span className="text-sm font-medium">Early Access Granted</span>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-3 text-white border border-white/10">
            <Bell size={20} className="text-orange-300" />
            <span className="text-sm font-medium">Notifications On</span>
          </div>
        </div>

        <button className="w-full bg-white text-orange-600 font-bold py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform">
          Explore Preview Content
        </button>
      </div>
    </div>
  );
};

export default StudentComingSoon;
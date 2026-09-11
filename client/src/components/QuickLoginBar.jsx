import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { UserCheck, ShieldAlert, Utensils, GraduationCap } from 'lucide-react';

export const QuickLoginBar = () => {
  const { login, user } = useContext(AuthContext);

  const handleQuickLogin = async (email, password) => {
    try {
      await login(email, password);
    } catch (err) {
      console.error('Quick login failed:', err);
    }
  };

  return (
    <div className="bg-neutral-950/90 border-b border-neutral-800/80 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-neutral-400 font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-white font-semibold">Demo Quick-Login Presets:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleQuickLogin('student1@lpu.in', 'password123')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              user?.role === 'student' ? 'bg-blue-600 text-white font-semibold' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            Student (Aarav - BH-1)
          </button>

          <button
            onClick={() => handleQuickLogin('warden.bh1@lpu.in', 'password123')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              user?.email === 'warden.bh1@lpu.in' ? 'bg-amber-600 text-white font-semibold' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Warden BH-1
          </button>

          <button
            onClick={() => handleQuickLogin('mess.alpha@lpu.in', 'password123')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              user?.email === 'mess.alpha@lpu.in' ? 'bg-emerald-600 text-white font-semibold' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            Mess Manager
          </button>

          <button
            onClick={() => handleQuickLogin('admin@lpu.in', 'password123')}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              user?.role === 'admin' ? 'bg-purple-600 text-white font-semibold' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Super Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickLoginBar;

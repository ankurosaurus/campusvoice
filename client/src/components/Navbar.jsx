import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext, DEMO_PRESETS } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { LogOut, Menu, X, ShieldAlert, UserCheck, Utensils, GraduationCap, Activity } from 'lucide-react';

export const Navbar = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = async (path, presetEmail) => {
    if (presetEmail) {
      try {
        await login(presetEmail, 'password123');
      } catch (e) {
        console.warn('Auto login fallback:', e);
      }
    }
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 px-4 md:px-10 py-4 bg-black border-b border-neutral-900/80">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        
        {/* Top Navbar Row */}
        <div className="grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-4">
          
          {/* Left: Brand Logo */}
          <Link to="/" className="inline-flex items-center gap-2.5 justify-self-start font-semibold text-lg tracking-tight text-white group">
            <svg className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
              <g transform="rotate(-30 12 12)">
                <circle cx="7.3" cy="3.2" r="1.45" />
                <rect x="5.5" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <rect x="14.9" y="4.7" width="3.6" height="14.6" rx="1.8" />
                <circle cx="16.7" cy="20.8" r="1.45" />
              </g>
            </svg>
            <span>CampusVoice<span className="font-normal text-neutral-400">.ai</span></span>
          </Link>

          {/* Center: Direct Navigation Liquid-Metal Pills (Desktop) */}
          <nav className="hidden md:flex items-center gap-2 justify-self-center">
            <Link 
              to="/" 
              className={`liquid-pill ${location.pathname === '/' ? 'border-white text-white font-semibold' : ''}`}
            >
              Benefits
            </Link>

            <Link 
              to="/transparency" 
              className={`liquid-pill ${location.pathname === '/transparency' ? 'border-emerald-500 text-emerald-400 font-semibold' : ''}`}
            >
              <Activity className="w-3.5 h-3.5 mr-1 text-emerald-400 inline" /> Public Trust
            </Link>

            <button
              onClick={() => handleNavClick('/student', 'student1@lpu.in')}
              className={`liquid-pill ${location.pathname === '/student' ? 'border-blue-500 text-blue-400 font-semibold' : ''}`}
            >
              Student Portal
            </button>

            <button
              onClick={() => handleNavClick('/staff', 'warden.bh1@lpu.in')}
              className={`liquid-pill ${location.pathname === '/staff' ? 'border-amber-500 text-amber-400 font-semibold' : ''}`}
            >
              Warden Portal
            </button>

            <button
              onClick={() => handleNavClick('/admin', 'admin@lpu.in')}
              className={`liquid-pill ${location.pathname === '/admin' ? 'border-purple-500 text-purple-400 font-semibold' : ''}`}
            >
              Gap Analytics
            </button>
          </nav>

          {/* Right: User Profile & Actions */}
          <div className="flex items-center gap-3 justify-self-end">
            {user ? (
              <div className="flex items-center gap-2">
                <NotificationBell />
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-semibold text-white">{user.name}</span>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-mono">{user.role} {user.hostelBlock !== 'N/A' && `(${user.hostelBlock})`}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors text-xs flex items-center gap-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-3.5 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="btn-vesper-solid text-xs">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Burger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 1-Click Role Preset Switcher Toolbar */}
        <div className="bg-neutral-950/90 border border-neutral-900 rounded-xl px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <strong className="text-white font-semibold">1-Click Examiner Role Switcher:</strong>
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => handleNavClick('/student', 'student1@lpu.in')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all ${
                user?.role === 'student' ? 'bg-blue-600 text-white' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <GraduationCap className="w-3 h-3" /> Student View
            </button>

            <button
              onClick={() => handleNavClick('/staff', 'warden.bh1@lpu.in')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all ${
                user?.email === 'warden.bh1@lpu.in' ? 'bg-amber-600 text-white' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <UserCheck className="w-3 h-3" /> Warden BH-1
            </button>

            <button
              onClick={() => handleNavClick('/staff', 'mess.alpha@lpu.in')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all ${
                user?.email === 'mess.alpha@lpu.in' ? 'bg-emerald-600 text-white' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <Utensils className="w-3 h-3" /> Mess Staff
            </button>

            <button
              onClick={() => handleNavClick('/admin', 'admin@lpu.in')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all ${
                user?.role === 'admin' ? 'bg-purple-600 text-white' : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              <ShieldAlert className="w-3 h-3" /> Admin Gap Visualizer
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-24 z-40 bg-black/95 backdrop-blur-2xl p-6 flex flex-col gap-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-white py-2 border-b border-neutral-900">
            Benefits / Home
          </Link>
          <Link to="/transparency" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-emerald-400 py-2 border-b border-neutral-900">
            Public Trust Layer
          </Link>
          <button onClick={() => handleNavClick('/student', 'student1@lpu.in')} className="text-left text-base font-medium text-blue-400 py-2 border-b border-neutral-900">
            Student Portal
          </button>
          <button onClick={() => handleNavClick('/staff', 'warden.bh1@lpu.in')} className="text-left text-base font-medium text-amber-400 py-2 border-b border-neutral-900">
            Warden & Mess Portal
          </button>
          <button onClick={() => handleNavClick('/admin', 'admin@lpu.in')} className="text-left text-base font-semibold text-purple-400 py-2 border-b border-neutral-900">
            Admin Gap Visualizer
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

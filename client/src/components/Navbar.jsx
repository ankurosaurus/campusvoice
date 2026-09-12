import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import NotificationBell from './NotificationBell';
import { LogOut, Menu, X, ShieldAlert, UserCheck, Utensils, GraduationCap, Activity, Sparkles } from 'lucide-react';

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
    <header className="relative z-50 px-6 md:px-8 py-5 border-b border-white/10 backdrop-blur-md bg-black/40">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo (Prompt Spec: Instrument Serif, text-3xl) */}
          <Link to="/" className="inline-flex items-center gap-2 group">
            <span 
              className="text-2xl sm:text-3xl tracking-tight text-white font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              CampusVoice<sup className="text-xs text-sky-400 font-sans ml-0.5">®</sup>
            </span>
          </Link>

          {/* Center: Nav links (Hidden on mobile, md:flex) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${location.pathname === '/' ? 'text-white font-medium' : 'text-neutral-400 hover:text-white'}`}
            >
              Home
            </Link>

            <Link 
              to="/transparency" 
              className={`text-sm transition-colors ${location.pathname === '/transparency' ? 'text-emerald-400 font-medium' : 'text-neutral-400 hover:text-white'}`}
            >
              Public Trust
            </Link>

            <button
              onClick={() => handleNavClick('/student', 'student1@lpu.in')}
              className={`text-sm transition-colors ${location.pathname === '/student' ? 'text-sky-400 font-medium' : 'text-neutral-400 hover:text-white'}`}
            >
              Student Portal
            </button>

            <button
              onClick={() => handleNavClick('/staff', 'warden.bh1@lpu.in')}
              className={`text-sm transition-colors ${location.pathname === '/staff' ? 'text-amber-400 font-medium' : 'text-neutral-400 hover:text-white'}`}
            >
              Warden Portal
            </button>

            <button
              onClick={() => handleNavClick('/admin', 'admin@lpu.in')}
              className={`text-sm transition-colors ${location.pathname === '/admin' ? 'text-purple-400 font-medium' : 'text-neutral-400 hover:text-white'}`}
            >
              Gap Analytics
            </button>
          </nav>

          {/* Right: CTA & User Actions */}
          <div className="flex items-center gap-3">
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
                  className="liquid-glass rounded-full px-3.5 py-1.5 text-xs text-neutral-300 hover:text-white hover:scale-[1.03] transition-all flex items-center gap-1"
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
                {/* Prompt Spec CTA Button */}
                <Link to="/student" className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white hover:scale-[1.03] transition-transform">
                  Begin Journey
                </Link>
              </div>
            )}

            {/* Mobile Burger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 1-Click Role Switcher Toolbar */}
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <strong className="text-white font-semibold">1-Click Examiner Role Switcher:</strong>
          </span>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => handleNavClick('/student', 'student1@lpu.in')}
              className={`liquid-glass rounded-full px-3 py-1 text-[11px] font-medium flex items-center gap-1 transition-all ${
                user?.role === 'student' ? 'text-sky-300 font-semibold border-sky-400/50' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <GraduationCap className="w-3 h-3 text-sky-400" /> Student View
            </button>

            <button
              onClick={() => handleNavClick('/staff', 'warden.bh1@lpu.in')}
              className={`liquid-glass rounded-full px-3 py-1 text-[11px] font-medium flex items-center gap-1 transition-all ${
                user?.email === 'warden.bh1@lpu.in' ? 'text-amber-300 font-semibold border-amber-400/50' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <UserCheck className="w-3 h-3 text-amber-400" /> Warden BH-1
            </button>

            <button
              onClick={() => handleNavClick('/staff', 'mess.alpha@lpu.in')}
              className={`liquid-glass rounded-full px-3 py-1 text-[11px] font-medium flex items-center gap-1 transition-all ${
                user?.email === 'mess.alpha@lpu.in' ? 'text-emerald-300 font-semibold border-emerald-400/50' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <Utensils className="w-3 h-3 text-emerald-400" /> Mess Staff
            </button>

            <button
              onClick={() => handleNavClick('/admin', 'admin@lpu.in')}
              className={`liquid-glass rounded-full px-3 py-1 text-[11px] font-medium flex items-center gap-1 transition-all ${
                user?.role === 'admin' ? 'text-purple-300 font-semibold border-purple-400/50' : 'text-neutral-300 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3 h-3 text-purple-400" /> Admin Gap Visualizer
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-24 z-40 bg-black/95 backdrop-blur-2xl p-6 flex flex-col gap-3">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-white py-2 border-b border-neutral-900">
            Home
          </Link>
          <Link to="/transparency" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-emerald-400 py-2 border-b border-neutral-900">
            Public Trust Layer
          </Link>
          <button onClick={() => handleNavClick('/student', 'student1@lpu.in')} className="text-left text-base font-medium text-sky-400 py-2 border-b border-neutral-900">
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

import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const DEMO_PRESETS = {
  'student1@lpu.in': {
    id: 'std_1',
    name: 'Aarav Patel',
    email: 'student1@lpu.in',
    role: 'student',
    hostelBlock: 'BH-1',
    roomNo: '102',
    staffUnit: ''
  },
  'warden.bh1@lpu.in': {
    id: 'warden_bh1',
    name: 'Col. Suresh Verma (Warden BH-1)',
    email: 'warden.bh1@lpu.in',
    role: 'staff',
    hostelBlock: 'BH-1',
    roomNo: '',
    staffUnit: 'BH-1 Warden Office'
  },
  'warden.bh2@lpu.in': {
    id: 'warden_bh2',
    name: 'Vikram Singh (Warden BH-2)',
    email: 'warden.bh2@lpu.in',
    role: 'staff',
    hostelBlock: 'BH-2',
    roomNo: '',
    staffUnit: 'BH-2 Warden Office'
  },
  'warden.gh1@lpu.in': {
    id: 'warden_gh1',
    name: 'Dr. Sunita Sharma (Warden GH-1)',
    email: 'warden.gh1@lpu.in',
    role: 'staff',
    hostelBlock: 'GH-1',
    roomNo: '',
    staffUnit: 'GH-1 Warden Office'
  },
  'mess.alpha@lpu.in': {
    id: 'mess_alpha',
    name: 'Chef Anil Kapoor (Mess Manager)',
    email: 'mess.alpha@lpu.in',
    role: 'staff',
    hostelBlock: 'Mess Alpha',
    roomNo: '',
    staffUnit: 'Mess Alpha Operations'
  },
  'admin@lpu.in': {
    id: 'admin_1',
    name: 'Dr. Rajesh Kumar (Chief Admin)',
    email: 'admin@lpu.in',
    role: 'admin',
    hostelBlock: 'All',
    roomNo: '',
    staffUnit: 'Central Administration'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('campusvoice_user');
      if (savedUser && savedUser !== 'undefined') {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.warn('Error reading stored user:', e);
    }
    return DEMO_PRESETS['student1@lpu.in'];
  });

  const [token] = useState('mock_jwt_token_2026');

  // Synchronous, zero-delay login method for prototype evaluation
  const login = (email) => {
    const emailLower = (email || '').toLowerCase().trim();
    let userData = DEMO_PRESETS[emailLower];

    if (!userData) {
      const isWarden = emailLower.includes('warden');
      const isMess = emailLower.includes('mess');
      const isAdmin = emailLower.includes('admin');
      const role = isAdmin ? 'admin' : (isWarden || isMess) ? 'staff' : 'student';

      userData = {
        id: `demo_${Date.now()}`,
        name: emailLower.split('@')[0].toUpperCase(),
        email: emailLower,
        role,
        hostelBlock: isWarden ? 'BH-1' : isMess ? 'Mess Alpha' : 'BH-1',
        roomNo: '101',
        staffUnit: isWarden ? 'BH-1 Warden Office' : ''
      };
    }

    try {
      localStorage.setItem('campusvoice_user', JSON.stringify(userData));
    } catch (e) {}

    setUser(userData);
    return userData;
  };

  const register = (formData) => {
    const userData = {
      id: `demo_reg_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: 'student',
      hostelBlock: formData.hostelBlock || 'BH-1',
      roomNo: formData.roomNo || '101',
      staffUnit: ''
    };

    try {
      localStorage.setItem('campusvoice_user', JSON.stringify(userData));
    } catch (e) {}

    setUser(userData);
    return userData;
  };

  const logout = () => {
    try {
      localStorage.removeItem('campusvoice_user');
    } catch (e) {}
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading: false, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

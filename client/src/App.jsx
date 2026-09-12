import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { ComplaintsProvider } from './context/ComplaintsContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TransparencyDashboard from './pages/TransparencyDashboard';
import AIChatbotWidget from './components/AIChatbotWidget';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="min-h-screen bg-black text-white p-12 text-center">Loading Session...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
    if (user.role === 'staff') return <Navigate to="/staff" replace />;
    return <Navigate to="/student" replace />;
  }

  return children;
};

export function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <ComplaintsProvider>
          <Router>
            <div className="min-h-screen bg-[hsl(201,100%,13%)] text-white flex flex-col font-sans selection:bg-sky-900 selection:text-white">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/transparency" element={<TransparencyDashboard />} />
                  
                  <Route
                    path="/student"
                    element={
                      <ProtectedRoute allowedRoles={['student']}>
                        <StudentDashboard />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/staff"
                    element={
                      <ProtectedRoute allowedRoles={['staff', 'admin']}>
                        <StaffDashboard />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
              <AIChatbotWidget />
            </div>
          </Router>
        </ComplaintsProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;

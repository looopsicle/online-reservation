import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { User } from '@shared/models';
import Home from './pages/Home';
import ServicesPage from './features/services/pages/ServicesPage';
import ServicesDetail from './features/services/pages/ServicesDetail';
import ProfilePage from './features/userProfile/pages/ProfilePage';
import Navbar from './components/Navbar';

import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './features/auth/pages/LoginPage';

function AppContent() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isLoginPage && <Navbar user={user} onLogout={logout} />}

      <main className="flex-grow bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServicesDetail />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      <footer className="text-pink-300 bg-pink-100 text-center py-4">
        © 2025 Vioré. All Rights Reserved.
      </footer>
    </div>
  );
}

function App() {
  console.log('App rendered');
  return (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
  );
}

export default App;

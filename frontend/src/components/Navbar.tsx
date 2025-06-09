// src/components/Navbar.tsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { User } from '@shared/models';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const firstName = user?.name.split(' ')[0] || '';

  return (
    <nav className="px-8 py-4 flex justify-between items-center shadow-md bg-white">
      {/* Logo */}
      <Link to="/" className="text-pink-300 text-4xl font-bold font-ruthie">
        Vioré
      </Link>

      {/* Nav Items */}
      <ul className="flex space-x-8">
        {[
          { to: '/',        label: 'Home',     end: true  },
          { to: '/services', label: 'Services', end: false }
        ].map(({ to, label, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative py-1 font-medium transition-colors ${
                  isActive
                    ? 'text-pink-300 border-b-2 border-pink-300'
                    : 'text-gray-700 hover:text-pink-300'
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* User Profile / Auth */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <NavLink
              to="/profile"
              className="flex items-center text-gray-700 hover:text-pink-300 transition"
            >
              <UserCircleIcon className="h-8 w-8" />
              <span className="ml-2 font-medium">Hi, {firstName}!</span>
            </NavLink>
          </>
        ) : (
          <Link
            to="/login"
            className="text-pink-300 font-medium hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

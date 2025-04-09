import React from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import doorExit from '../../assets/door-exit.png'; // Adjust the path as necessary

const Navbar = ({ title, subtitle, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between h-16 px-6 bg-black text-white border-b border-gray-700">
      {/* Left section - Menu Icon and Sidebar Toggle */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="hover:bg-gray-700 p-2 rounded-lg"
        >
          <Menu size={20} className="text-white" />
        </button>
      </div>

      {/* Center section - Title and Subtitle */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      {/* Right section - Logout Button */}
      <div className="flex items-center gap-4">
        <button onClick={handleLogout} className="p-2 rounded-lg">
          <img src={doorExit} alt="Logout" className="w-8 h-8" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Users, Car, Navigation, AlertTriangle, DollarSign, Settings, Menu, LogOut } from 'lucide-react';
import sidebarLogo from '../../assets/sidebar.png';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Drivers', icon: Car, path: '/drivers' },
    { name: 'Rides', icon: Navigation, path: '/rides' },
    { name: 'Complaints', icon: AlertTriangle, path: '/complaints' },
    { name: 'Earnings', icon: DollarSign, path: '/earnings' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div
      className={`h-full bg-black transition-all duration-300 flex flex-col justify-between ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div>
        {/* Logo and Toggle Button */}
        <div className="flex items-center justify-between py-4 px-2">
          {!isCollapsed && <img src={sidebarLogo} alt="Logo" className="w-32" />}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-700"
          >
            <Menu size={20} className="text-white" />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-2 mt-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center px-4 py-3 my-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? 'bg-[#171717] text-[#FFB800] shadow-[0_0_15px_4px_rgba(255,184,0,0.6)]'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={
                  isActive
                    ? {
                        boxShadow: '0 0 15px 4px rgba(255, 184, 0, 0.6)',
                        borderRadius: '12px',
                      }
                    : {}
                }
              >
                <div className="mr-3">
                  <item.icon size={20} />
                </div>
                {!isCollapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-gray-800 mt-auto px-2 py-3">
        {isCollapsed ? (
          <div className="flex flex-col items-center space-y-3">
            {/* User avatar - gold circle with initial */}
            <div className="h-8 w-8 rounded-full bg-[#FFB800] flex items-center justify-center text-black font-semibold">
              A
            </div>

            {/* Logout button below avatar when collapsed */}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-gray-700 rounded-md flex justify-center"
              title="Logout"
            >
              <LogOut size={18} className="text-gray-300" />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            {/* User avatar - gold circle with initial */}
            <div className="h-8 w-8 rounded-full bg-[#FFB800] flex items-center justify-center text-black font-semibold mr-3">
              A
            </div>

            <div className="flex-1">
              <p className="text-white text-sm font-medium">Admin User</p>
              <p className="text-gray-400 text-xs">admin@ridapp.com</p>
            </div>

            <button
              onClick={handleLogout}
              className="p-1 hover:bg-gray-700 rounded-md"
              title="Logout"
            >
              <LogOut size={18} className="text-gray-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

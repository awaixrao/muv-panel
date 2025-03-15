import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  ScrollText, 
  Navigation, 
  Users, 
  UserCog,
  Globe, 
  Car, 
  Shield, 
  Settings,
  User
} from 'lucide-react';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Orders', icon: ScrollText, path: '/orders' },
    { name: 'Rides', icon: Navigation, path: '/rides' },
    { name: 'Clients', icon: Users, path: '/clients' },
    { name: 'Drivers', icon: UserCog, path: '/drivers' },
    { name: 'Live map', icon: Globe, path: '/live-map' },
    { name: 'Car classes', icon: Car, path: '/car-classes' },
    { name: 'Moderators', icon: Shield, path: '/moderators' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className={`${isOpen ? 'w-56' : 'w-16'} bg-black transition-all duration-300`}>
      {/* User profile section */}
      <div className="p-4">
        {isOpen ? (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-medium">Terry</p>
              <p className="text-gray-400 text-xs">+1(8 (96) 435-46-15</p>
            </div>
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center mx-auto">
            <User size={16} className="text-white" />
          </div>
        )}
      </div>

      {/* Main Menu Label */}
      {isOpen && (
        <div className="px-4 py-2">
          <p className="text-gray-400 text-xs uppercase">MAIN MENU</p>
        </div>
      )}

      {/* Navigation */}
      <div className="px-2">
        {menuItems.map((item, index) => (
          <Link 
            to={item.path}
            key={index} 
            className={`flex items-center px-2 py-2 my-1 rounded-xl transition-colors
              ${location.pathname === item.path
                ? 'bg-[#FFB800] text-black' 
                : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
          >
            <div className={`${!isOpen ? 'mx-auto' : 'mr-3'}`}>
              <item.icon size={20} />
            </div>
            {isOpen && <span className="text-sm">{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
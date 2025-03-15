import React from 'react';
import { Menu, LogOut } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  // You can replace these with dynamic values from your application state
  const userName = "Terry";
  const messageCount = 2;
  
  return (
    <nav className="flex items-center h-14 px-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="hover:bg-gray-100 p-2 rounded-lg"
        >
          <Menu size={20} className="text-gray-500" />
        </button>
        
        <div className="flex items-center gap-1">
          <span className="text-gray-600 text-base italic">Good morning,</span>
          <span className="text-gray-600 text-base italic font-medium">{userName}</span>
          <span className="text-yellow-500">👋</span>
          <span className="text-gray-400 text-xs ml-1">you have 1 new message</span>
        </div>
      </div>

      {/* Right side controls */}
      <div className="ml-auto flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700">
          <LogOut size={20} />
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;
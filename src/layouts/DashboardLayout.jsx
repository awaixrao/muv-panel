import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../UI/Navbar/Navbar";
import Sidebar from "../UI/Sidebar/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex min-h-screen bg-black p-4">
      {/* Sidebar without any borders */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content with rounded borders and border styling except on sidebar side */}
      <div className={`flex-1 overflow-hidden`}>
        <div className="flex flex-col">
          <main className="flex-1 ">
            <Outlet />
          </main>
          
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

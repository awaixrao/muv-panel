import React, { useState } from 'react';
import { MdSearch, MdMoreVert, MdPhone, MdVisibility } from 'react-icons/md';

const DriverCard = ({ driver }) => {
  const { name, location, status, rating, ratingCount, rides, carModel, earnings, verified, insuranceStatus } = driver;
  
  const getStatusColor = (status) => {
    if (status === 'Online') return 'bg-green-500 text-white';
    if (status === 'Offline') return 'bg-gray-500 text-white';
    if (status === 'Suspended') return 'bg-red-500 text-white';
    return 'bg-gray-500 text-white';
  };
  
  return (
    <div className="bg-[#262626] rounded-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-700 mr-3 overflow-hidden">
              {driver.avatar ? (
                <img src={driver.avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white font-medium">{name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(status)}`}>
                  {status}
                </span>
                <button className="text-gray-400">
                  <MdMoreVert />
                </button>
              </div>
              <p className="text-gray-400 text-sm">{location}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-sm mr-4">
            <svg className="w-4 h-4 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white">{rating}</span>
            <span className="text-gray-400 ml-1">({ratingCount})</span>
          </div>
          <div className="flex items-center text-sm">
            <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300">{carModel}</span>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center text-sm mr-4">
            <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300">{rides} rides</span>
          </div>
          <div className="flex items-center text-sm">
            <svg className="w-4 h-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300">${earnings}</span>
          </div>
        </div>
      </div>
      
      {/* Status badges positioned above the buttons */}
      <div className="px-4 flex flex-wrap gap-2 mb-2">
        {verified === 'Verified' && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">
            Verified
          </span>
        )}
        {insuranceStatus === 'Insurance Expired' && (
          <span className="px-3 py-1 bg-red-500 text-white text-xs rounded-full">
            Insurance Expired
          </span>
        )}
      </div>
      
      {/* Buttons with proper spacing and styling */}
      <div className="px-4 pb-4 flex gap-2">
        <button className="flex-1 py-2 flex items-center justify-center bg-black text-gray-300 rounded">
          <MdPhone className="mr-1" />
          Contact
        </button>
        <button className="flex-1 py-2 flex items-center justify-center bg-yellow-500 text-black rounded">
          <MdVisibility className="mr-1" />
          View Details
        </button>
      </div>
    </div>
  );
};

const LiveTrackingSection = () => {
  // Active drivers for live tracking section
  const activeDrivers = [
    { name: 'John Doe', location: 'New York', status: 'Active', avatar: '/api/placeholder/32/32' },
    { name: 'Emily Chen', location: 'San Francisco', status: 'Active', avatar: '/api/placeholder/32/32' },
  ];

  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden h-full">
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-white text-lg">Live Tracking</h3>
      </div>
      
      <div className="p-4 bg-[#262626] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 mb-2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-gray-400 text-sm">Map Placeholder</span>
          <span className="text-gray-400 text-xs mb-3">4 active drivers online</span>
        </div>
        
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((star) => (
            <div key={star} className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-medium">
              {star}
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="text-white text-lg mb-3">Active Drivers</h4>
        <div className="space-y-4">
          {activeDrivers.map((driver, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-700 mr-3 overflow-hidden">
                {driver.avatar ? (
                  <img src={driver.avatar} alt={driver.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    {driver.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <p className="text-white text-sm">{driver.name}</p>
                <p className="text-gray-400 text-xs">{driver.location}</p>
              </div>
              <div className="ml-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DriverManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Example driver data based on your screenshots with added verification and insurance status
  const drivers = [
    {
      id: 1,
      name: 'John Doe',
      location: 'New York',
      status: 'Online',
      rating: '4.8',
      ratingCount: '352',
      rides: '950',
      carModel: 'Toyota Camry',
      earnings: '22,450.3',
      verified: 'Verified',
      insuranceStatus: 'Valid',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      location: 'Chicago',
      status: 'Offline',
      rating: '4.6',
      ratingCount: '287',
      rides: '982',
      carModel: 'Honda Accord',
      earnings: '24,340.75',
      verified: 'Pending',
      insuranceStatus: 'Insurance Expired',
    },
    {
      id: 3,
      name: 'Michael Smith',
      location: 'Los Angeles',
      status: 'Suspended',
      rating: '4.7',
      ratingCount: '414',
      rides: '1245',
      carModel: 'Tesla Model 3',
      earnings: '31,443.25',
      verified: 'Verified',
      insuranceStatus: 'Valid',
    },
    {
      id: 4,
      name: 'Emily Chen',
      location: 'San Francisco',
      status: 'Online',
      rating: '4.9',
      ratingCount: '531',
      rides: '543',
      carModel: 'Kia Sportage',
      earnings: '12,650.25',
      verified: 'Verified',
      insuranceStatus: 'Insurance Expired',
    },
    {
      id: 5,
      name: 'David Miller',
      location: 'Boston',
      status: 'Offline',
      rating: '4.5',
      ratingCount: '256',
      rides: '854',
      carModel: 'Hyundai Accent',
      earnings: '19,250.25',
      verified: 'Pending',
      insuranceStatus: 'Valid',
    },
    {
      id: 6,
      name: 'Sophia Garcia',
      location: 'Miami',
      status: 'Online',
      rating: '4.7',
      ratingCount: '378',
      rides: '1105',
      carModel: 'Chevrolet Bolt',
      earnings: '27,340.75',
      verified: 'Verified',
      insuranceStatus: 'Valid',
    },
  ];
  
  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto p-4">
        {/* Header with title */}
        <div className="border-b border-blue-600 pb-2 mb-6">
          <h1 className="text-xl font-bold">Driver Management</h1>
          <p className="text-gray-400 text-sm">Manage, Monitor and Assist Driver Fleet</p>
        </div>
        
        <div className="grid grid-cols-12 gap-4">
          {/* Main content area - 3/4 of screen */}
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-[#1a1a1a] rounded-lg mb-6">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-white text-lg">Driver Search</h2>
              </div>
              <div className="p-4">
                <div className="relative mb-4">
                  <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or vehicle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#262626] border-none rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <select className="bg-[#262626] border-none rounded-md px-3 py-2 text-gray-300 focus:outline-none w-full appearance-none">
                    <option>All Statuses</option>
                    <option>Online</option>
                    <option>Offline</option>
                    <option>Suspended</option>
                    <option>Verified</option>
                    <option>Insurance Expired</option>
                  </select>
                  
                  <select className="bg-[#262626] border-none rounded-md px-3 py-2 text-gray-300 focus:outline-none w-full appearance-none">
                    <option>All Verifications</option>
                    <option>Verified</option>
                    <option>Pending</option>
                  </select>
                  
                  <select className="bg-[#262626] border-none rounded-md px-3 py-2 text-gray-300 focus:outline-none w-full appearance-none">
                    <option>All Cities</option>
                    <option>New York</option>
                    <option>Chicago</option>
                    <option>Los Angeles</option>
                    <option>San Francisco</option>
                  </select>
                </div>
                
                <div className="text-sm text-gray-400 mb-2">
                  Showing {filteredDrivers.length} of {drivers.length} drivers
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDrivers.map(driver => (
                <DriverCard key={driver.id} driver={driver} />
              ))}
            </div>
          </div>
          
          {/* Live tracking section - 1/4 of screen */}
          <div className="col-span-12 lg:col-span-3">
            <LiveTrackingSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverManagementPage;
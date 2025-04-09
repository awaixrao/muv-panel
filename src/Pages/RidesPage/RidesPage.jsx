import React, { useState } from 'react';

const RidesPage = () => {
  // Define tab options
  const tabs = [
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  // State for active tab
  const [activeTab, setActiveTab] = useState('ongoing');

  // Sample data for rides
  const rides = [
    {
      id: '2023-06-15-10:39-AM',
      passenger: {
        name: 'John Doe',
        id: 'JD'
      },
      driver: {
        name: 'Michael Johnson',
        id: 'MJ'
      },
      pickupLocation: '123 Main St, Downtown',
      dropoffLocation: '456 Oak Ave, Uptown',
      price: '$15.40',
      duration: '25 min',
      distance: '7.2 miles',
      status: 'ongoing',
      progress: 1, // 0: Request Accepted, 1: En Route to Pickup, 2: Arrived at Pickup, 3: On Trip, 4: Arrived at Destination
    },
    {
      id: '2023-06-16-11:45-AM',
      passenger: {
        name: 'Sarah Williams',
        id: 'SA'
      },
      driver: {
        name: 'Robert Brown',
        id: 'RO'
      },
      pickupLocation: '789 Pine Rd, Westside',
      dropoffLocation: '101 Elm Blvd, Eastside',
      price: '$22.75',
      duration: '35 min',
      distance: '12.6 miles',
      status: 'ongoing',
      progress: 1, // 0: Request Accepted, 1: En Route to Pickup, 2: Arrived at Pickup, 3: On Trip, 4: Arrived at Destination
    }
  ];

  // Progress steps
  const progressSteps = [
    'Request Accepted',
    'En Route to Pickup',
    'Arrived at Pickup',
    'On Trip',
    'Arrived at Destination'
  ];

  // Filter rides based on active tab
  const filteredRides = rides.filter(ride => ride.status === activeTab);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Ride Management</h1>
          <button className="bg-transparent border border-gray-700 rounded px-3 py-1 flex items-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-sm">Show Map</span>
          </button>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search rides..." 
            className="w-full bg-gray-900 border border-gray-700 rounded py-2 pl-8 pr-10 text-sm"
          />
          <div className="absolute left-2 top-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="absolute right-2 top-2">
            <button className="flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span className="ml-1 text-xs">Filter: All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === tab.id ? 'text-amber-500 border-b-2 border-amber-500' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Ride List */}
      <div className="px-4">
        {filteredRides.map((ride, index) => (
          <div key={ride.id} className={`py-4 ${index > 0 ? 'border-t border-gray-800' : ''}`}>
            {/* Date and Details Button */}
            <div className="flex justify-between items-center mb-3">
              <div className="text-xs text-gray-400">{ride.id}</div>
              <button className="bg-blue-600 text-xs px-3 py-1 rounded hover:bg-blue-700">
  Ongoing
</button>
            </div>
            
            {/* Passenger and Driver Info */}
            <div className="flex justify-between mb-4">
              <div className="flex items-start">
                <div className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                  {ride.passenger.id}
                </div>
                <div>
                  <div className="text-xs text-gray-400">Passenger</div>
                  <div className="text-sm">{ride.passenger.name}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2">
                  {ride.driver.id}
                </div>
                <div>
                  <div className="text-xs text-gray-400">Driver</div>
                  <div className="text-sm">{ride.driver.name}</div>
                </div>
              </div>
            </div>
            
            {/* Pickup and Dropoff Locations */}
            <div className="mb-3">
              <div className="flex items-start mb-2">
                <div className="mr-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Pickup location</div>
                  <div className="text-sm">{ride.pickupLocation}</div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Dropoff location</div>
                  <div className="text-sm">{ride.dropoffLocation}</div>
                </div>
              </div>
            </div>
            
            {/* Price, Duration, Distance */}
            <div className="flex items-center mb-4 text-sm">
              <div className="font-medium mr-4">{ride.price}</div>
              <div className="flex items-center text-gray-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {ride.duration}
              </div>
              <div className="flex items-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {ride.distance}
              </div>
            </div>
            
            {/* Progress Timeline */}
            <div className="mb-2">
              <div className="relative">
                <div className="absolute top-1/2 w-full h-0.5 bg-gray-700 -translate-y-1/2"></div>
                <div className="flex justify-between relative">
                  {progressSteps.map((step, i) => {
                    const isCompleted = i <= ride.progress;
                    const isActive = i === ride.progress;
                    return (
                      <div key={i} className="flex flex-col items-center z-10">
                        <div className={`w-4 h-4 rounded-full mb-1 ${
                          isCompleted ? 'bg-yellow-500' : 'bg-gray-700'
                        }`}></div>
                        {i === 0 || i === 2 || i === 4 ? (
                          <div className="text-xs text-gray-400">{step}</div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Actions */}
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default RidesPage;
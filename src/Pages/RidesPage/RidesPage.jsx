import React, { useState } from 'react';
import Table from '../../UI/Table/Table';

const RidesPage = () => {
  // Define tab options
  const tabs = [
    { id: 'pending', label: 'Pending', count: 5 },
    { id: 'in-progress', label: 'In progress', count: 1 },
    { id: 'completed', label: 'Completed', count: 70 },
    { id: 'upcoming', label: 'Upcoming', count: 0 },
    { id: 'pre-cancelled', label: 'Pre cancelled', count: 26 },
    { id: 'cancelled-by-driver', label: 'Cancelled by driver', count: 1 },
    { id: 'in-process', label: 'In process', count: 1 },
  ];

  // State for active tab
  const [activeTab, setActiveTab] = useState('pending');

  // Table columns definition
  const tableColumns = [
    { 
      header: 'User', 
      accessor: 'user',
      type: 'user'
    },
    { 
      header: 'Car Comfort', 
      accessor: 'carComfort',
      type: 'carComfort'
    },
    { 
      header: 'Ordered Time', 
      accessor: 'orderedTime',
      type: 'datetime'
    },
    { 
      header: 'Start Location', 
      accessor: 'startLocation',
      type: 'location'
    },
    { 
      header: 'Finish Location', 
      accessor: 'finishLocation',
      type: 'location'
    },
    { 
      header: 'Income', 
      accessor: 'income',
      type: 'income'
    }
  ];

  // Sample data categorized by tab
  const allData = {
    'pending': [
      {
        id: 1,
        avatar: 'https://i.pravatar.cc/40?img=7',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'simple',
        orderedTime: '04.12.2021 20:30',
        startLocation: 'Silk Road, Kokcha Street, Tashkent, Uzbekistan',
        finishLocation: 'Silk Road, Kokcha Street, Tashkent, Uzbekistan',
        income: '$50 000 UZS',
        status: 'pending'
      },
      {
        id: 2,
        avatar: 'https://i.pravatar.cc/40?img=8',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'elite',
        orderedTime: '04.12.2021 20:24',
        startLocation: 'Zilolaxon Ergash ko\'chasi, Tashkent, Uzbekistan',
        finishLocation: 'Zilolaxon Ergash ko\'chasi, Tashkent, Uzbekistan',
        income: '$20 000 UZS',
        status: 'pending'
      },
      {
        id: 3,
        avatar: 'https://i.pravatar.cc/40?img=9',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'convenient',
        orderedTime: '04.12.2021 20:23',
        startLocation: '78 Sadriddin Ayni, Tashkent, Uzbekistan',
        finishLocation: '78 Sadriddin Ayni, Tashkent, Uzbekistan',
        income: '$30 000 UZS',
        status: 'pending'
      },
      {
        id: 4,
        avatar: 'https://i.pravatar.cc/40?img=10',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'convenient',
        orderedTime: '17.11.2021 15:13',
        startLocation: '13 Bunyodkor ko\'chasi, Tashkent 100183, Uzbekistan',
        finishLocation: '13 Bunyodkor ko\'chasi, Tashkent 100183, Uzbekistan',
        income: '$40 000 UZS',
        status: 'pending'
      },
      {
        id: 5,
        avatar: 'https://i.pravatar.cc/40?img=11',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'convenient',
        orderedTime: '04.12.2021 20:20',
        startLocation: '1 Katta Tsarskiy ko\'chasi, Tashkent 100000, Uzbekistan',
        finishLocation: '1 Katta Tsarskiy ko\'chasi, Tashkent 100000, Uzbekistan',
        income: '$50 000 UZS',
        status: 'pending'
      }
    ],
    'in-progress': [
      {
        id: 6,
        avatar: 'https://i.pravatar.cc/40?img=12',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'elite',
        orderedTime: '04.12.2021 20:15',
        startLocation: 'Amir Temur Square, Tashkent, Uzbekistan',
        finishLocation: 'Chorsu Bazaar, Tashkent, Uzbekistan',
        income: '$35 000 UZS',
        status: 'in-progress'
      }
    ],
    'completed': [
      {
        id: 7,
        avatar: 'https://i.pravatar.cc/40?img=13',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'simple',
        orderedTime: '03.12.2021 18:30',
        startLocation: 'Tashkent International Airport, Tashkent, Uzbekistan',
        finishLocation: 'Hyatt Regency, Tashkent, Uzbekistan',
        income: '$60 000 UZS',
        status: 'completed'
      },
      // More completed rides would be here
    ],
    'upcoming': [],
    'pre-cancelled': [
      {
        id: 8,
        avatar: 'https://i.pravatar.cc/40?img=14',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'convenient',
        orderedTime: '02.12.2021 14:45',
        startLocation: 'Chimgan Mountains, Tashkent Region, Uzbekistan',
        finishLocation: 'Tashkent City, Uzbekistan',
        income: '$75 000 UZS',
        status: 'pre-cancelled'
      },
      // More pre-cancelled rides would be here
    ],
    'cancelled-by-driver': [
      {
        id: 9,
        avatar: 'https://i.pravatar.cc/40?img=15',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'elite',
        orderedTime: '01.12.2021 09:15',
        startLocation: 'Samarkand, Uzbekistan',
        finishLocation: 'Tashkent, Uzbekistan',
        income: '$120 000 UZS',
        status: 'cancelled-by-driver'
      }
    ],
    'in-process': [
      {
        id: 10,
        avatar: 'https://i.pravatar.cc/40?img=16',
        name: 'Sierra Ferguson',
        phone: '+998 (99) 436-46-15',
        carComfort: 'convenient',
        orderedTime: '04.12.2021 21:00',
        startLocation: 'Tashkent Botanical Garden, Uzbekistan',
        finishLocation: 'Tashkent Zoo, Uzbekistan',
        income: '$25 000 UZS',
        status: 'in-process'
      }
    ]
  };

  // Get filtered data based on active tab
  const getFilteredData = () => {
    return allData[activeTab] || [];
  };

  return (
    <div className="space-y-4">
      {/* Tabs navigation - updated to match screenshot exactly */}
      <div className="flex items-center overflow-x-auto whitespace-nowrap border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-3 py-2 text-sm transition-colors relative ${
              activeTab === tab.id
                ? 'text-amber-500 font-medium'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.label}
            <span className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${
              activeTab === tab.id ? 'bg-gray-100 text-gray-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.count}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></div>
            )}
            {index !== tabs.length - 1 && (
              <span className="mx-1 text-gray-300">›</span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <Table 
        columns={tableColumns} 
        data={getFilteredData()}
        currentPage={1}
        totalPages={2}
        onPageChange={(page) => console.log('Page changed to:', page)}
      />
    </div>
  );
};

export default RidesPage;
import React, { useState } from 'react';

const DarkTable = ({ columns, data, currentPage = 1, totalPages = 1, onPageChange }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (rowId) => {
    setSelectedRows(prev => 
      prev.includes(rowId) 
        ? prev.filter(id => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === data.length 
        ? [] 
        : data.map(row => row.id)
    );
  };

  // Get status color based on status value
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'canceled':
      case 'cancelled':
        return 'bg-red-500';
      case 'pending':
        return 'bg-amber-400';
      default:
        return 'bg-gray-500';
    }
  };

  // Helper function to render cell content based on column type
  const renderCell = (column, row) => {
    if (column.render) {
      return column.render(row);
    }

    switch (column.type) {
      case 'user':
        return (
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <div className="font-medium text-white">{row.name}</div>
              <div className="text-xs text-gray-400">{row.email}</div>
            </div>
          </div>
        );

      case 'role':
        return (
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${row.roleIcon === 'driver' ? 'bg-blue-400' : 'bg-green-400'} mr-2`}></div>
            <span className="text-sm text-white">{row[column.accessor]}</span>
          </div>
        );

      case 'status':
        return (
          <div className="inline-flex px-2 py-1 rounded-full text-xs text-white font-medium" 
               style={{ backgroundColor: row.statusColor === 'red' ? '#EF4444' : '#10B981' }}>
            {row[column.accessor]}
          </div>
        );

      case 'rating':
        return (
          <div className="flex items-center">
            <span className="text-sm text-white mr-1">{row[column.accessor]}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );

      case 'date':
        return (
          <span className="text-sm text-white">
            {row[column.accessor]}
          </span>
        );

      case 'actions':
        return (
          <div className="flex items-center space-x-3">
            {/* Eye Icon */}
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            
            {/* Check Icon - Yellow for some rows */}
            {row.id % 2 === 1 && (
              <button className="text-amber-400 hover:text-amber-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </button>
            )}
            
            {/* Green Check Icon for specific rows */}
            {row.id === 3 && (
              <button className="text-green-500 hover:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </button>
            )}
            
            {/* Ban/Cancel Icon - Red for all rows */}
            {row.id !== 3 && (
              <button className="text-red-500 hover:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              </button>
            )}
          </div>
        );

      default:
        return (
          <span className="text-sm text-white">
            {row[column.accessor]}
          </span>
        );
    }
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="px-4 py-4 whitespace-nowrap"
                  >
                    {renderCell(column, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-800">
        <button className="text-amber-400 border border-amber-400 rounded px-3 py-1 text-sm">
          Export User Data
        </button>
        <button className="bg-amber-400 text-black font-medium rounded px-3 py-1 text-sm">
          Add New User
        </button>
      </div>
    </div>
  );
};

const UsersPage = () => {
  const columns = [
    { header: 'Name', accessor: 'name', type: 'user' },
    { header: 'Role', accessor: 'role', type: 'role' },
    { header: 'Status', accessor: 'status', type: 'status' },
    { header: 'Joined', accessor: 'joined', type: 'date' },
    { header: 'Rating', accessor: 'rating', type: 'rating' },
    { header: 'Actions', accessor: 'actions', type: 'actions' },
  ];

  const data = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      role: 'Driver', 
      roleIcon: 'driver',
      status: 'Active', 
      statusColor: 'green',
      joined: '2023-01-15', 
      rating: '4.8' 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      role: 'Passenger', 
      roleIcon: 'passenger',
      status: 'Active', 
      statusColor: 'green',
      joined: '2023-03-10', 
      rating: '4.5' 
    },
    { 
      id: 3, 
      name: 'Michael Johnson', 
      email: 'michael.j@example.com', 
      role: 'Driver', 
      roleIcon: 'driver',
      status: 'Cancelled', 
      statusColor: 'red',
      joined: '2022-11-20', 
      rating: '3.2' 
    },
    { 
      id: 4, 
      name: 'Sarah Williams', 
      email: 'sarah.w@example.com', 
      role: 'Passenger', 
      roleIcon: 'passenger',
      status: 'Active', 
      statusColor: 'green',
      joined: '2023-04-05', 
      rating: '4.9' 
    },
    { 
      id: 5, 
      name: 'Robert Brown', 
      email: 'robert.b@example.com', 
      role: 'Driver', 
      roleIcon: 'driver',
      status: 'Active', 
      statusColor: 'green',
      joined: '2023-02-18', 
      rating: '4.6' 
    },
    { 
      id: 6, 
      name: 'Emily Davis', 
      email: 'emily.d@example.com', 
      role: 'Passenger', 
      roleIcon: 'passenger',
      status: 'Cancelled', 
      statusColor: 'red',
      joined: '2023-01-30', 
      rating: '3.7' 
    }
  ];

  const handlePageChange = (page) => {
    console.log(`Page changed to ${page}`);
  };

  return (
    <div className="bg-black p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white mb-1">User Management</h1>
        <p className="text-gray-400 text-sm">Manage users and their permissions</p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search users..." 
            className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg px-4 py-2 pl-10 w-full"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div className="flex items-center ml-4">
          <button className="bg-gray-800 text-white text-sm rounded-lg px-4 py-2 flex items-center">
            <span>Filter All</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <DarkTable 
        columns={columns}
        data={data}
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersPage;
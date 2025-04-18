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
      case 'completed':
        return 'bg-amber-400';
      case 'cancelled':
        return 'bg-red-500';
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
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
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
          View more
        </button>
      </div>
    </div>
  );
};

// Demo component to showcase the table
const TableDemo = () => {
  const columns = [
    { header: 'User', accessor: 'name', type: 'user' },
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

export default TableDemo;
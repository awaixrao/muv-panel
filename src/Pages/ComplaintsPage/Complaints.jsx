import React, { useState } from 'react';

const DarkTable = ({ columns, data, currentPage = 1, totalPages = 1, onPageChange }) => {
  // Helper function to render cell content based on column type
  const renderCell = (column, row) => {
    if (column.render) {
      return column.render(row);
    }

    switch (column.type) {
      case 'id':
        return (
          <span className="text-sm text-white">
            {row[column.accessor]}
          </span>
        );

      case 'user':
        return (
          <div className="flex flex-col">
            <div className="font-medium text-white">{row.name}</div>
            <div className="text-xs text-gray-400">{row.role}</div>
          </div>
        );

      case 'issue':
        return (
          <span className="text-sm text-white">
            {row[column.accessor]}
          </span>
        );

      case 'status':
        return (
          <div className="inline-flex px-3 py-1 rounded-full text-xs font-medium" 
              style={{ 
                backgroundColor: 
                  row.status === 'Pending' ? '#F59E0B' : 
                  row.status === 'In Progress' ? '#3B82F6' : 
                  row.status === 'Resolved' ? '#10B981' : 
                  row.status === 'Urgent' ? '#EF4444' : '#6B7280',
                color: row.status === 'Pending' ? '#000000' : '#FFFFFF'
              }} >
            {row.status}
          </div>
        );

      case 'date':
        return (
          <span className="text-sm text-gray-400">
            {row[column.accessor]}
          </span>
        );

      case 'resolution':
        return (
          <div className="flex items-center text-sm text-gray-400">
            {row.resolution === 'Pending' ? (
              <>
                <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3" />
                </svg>
                {row.resolution}
              </>
            ) : (
              row.resolution
            )}
          </div>
        );

      case 'actions':
        return (
          <div className="flex items-center space-x-3">
            {/* View Icon (Yellow) */}
            <button className="text-[#FFD06B] hover:text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <path d="M8 10h8"></path>
                <path d="M8 14h8"></path>
              </svg>
            </button>
            
            {/* Resolve Icon (Green) - Not showing for already resolved */}
            {row.status !== 'Resolved' && (
              <button className="text-green-500 hover:text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </button>
            )}
            
            {/* Cancel/Decline Icon (Red) - Not showing for resolved */}
            {row.status !== 'Resolved' && (
              <button className="text-red-500 hover:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
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
    <div className="overflow-hidden rounded-lg" style={{ backgroundColor: "#0F0F0F" }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-800">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-4 py-3 text-left text-xs font-medium text-[#FFD06B] uppercase tracking-wider"
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
    </div>
  );
};

const ComplaintsPage = () => {
  // Define status tabs
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'inProgress', label: 'In Progress' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'resolved', label: 'Resolved' },
  ];

  // State for active tab
  const [activeTab, setActiveTab] = useState('all');
  // State for selected complaint
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Table columns definition
  const columns = [
    { header: 'ID', accessor: 'id', type: 'id' },
    { header: 'User', accessor: 'name', type: 'user' },
    { header: 'Issue Type', accessor: 'issueType', type: 'issue' },
    { header: 'Status', accessor: 'status', type: 'status' },
    { header: 'Created', accessor: 'created', type: 'date' },
    { header: 'Resolution Time', accessor: 'resolution', type: 'resolution' },
    { header: 'Actions', accessor: 'actions', type: 'actions' },
  ];

  // Sample data for complaints
  const complaintsData = [
    { 
      id: 'CM-1001', 
      name: 'Sarah Johnson', 
      role: 'Passenger',
      issueType: 'Payment Dispute', 
      status: 'Pending', 
      created: '7d 4h ago', 
      resolution: 'Pending' 
    },
    { 
      id: 'CM-1002', 
      name: 'Michael Chen', 
      role: 'Passenger',
      issueType: 'App Malfunction', 
      status: 'In Progress', 
      created: '7d 15h ago', 
      resolution: 'Pending' 
    },
    { 
      id: 'CM-1003', 
      name: 'Elena Rodriguez', 
      role: 'Passenger',
      issueType: 'Driver Behavior', 
      status: 'Resolved', 
      created: '7d 4h ago', 
      resolution: '15 hours' 
    },
    { 
      id: 'CM-1004', 
      name: 'David Kim', 
      role: 'Passenger',
      issueType: 'Fare Calculation', 
      status: 'Urgent', 
      created: '7d 0h ago', 
      resolution: 'Pending' 
    },
    { 
      id: 'CM-1005', 
      name: 'Lisa Patel', 
      role: 'Passenger',
      issueType: 'Safety Concern', 
      status: 'Resolved', 
      created: '7d 5h ago', 
      resolution: '1 days' 
    }
  ];

  // Filter complaints based on active tab
  const filteredComplaints = activeTab === 'all' 
    ? complaintsData 
    : complaintsData.filter(complaint => complaint.status.toLowerCase().replace(' ', '') === activeTab);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="p-4">
        <h1 className="text-xl font-medium mb-2">Complaints Management</h1>
      </div>

      {/* Main Content Area - Split View */}
      <div className="flex h-full">
        {/* Left Panel - Complaints Table */}
        <div className="w-full lg:w-3/4 mr-4"> {/* Added margin-right */}
          {/* Status Tabs */}
          <div className="flex border-b border-gray-800">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex-1 py-2 text-center font-medium text-sm ${
                  activeTab === tab.id 
                  ? 'bg-[#FFD06B] text-black' 
                  : 'bg-gray-800 text-gray-400'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Complaints Table */}
          <DarkTable 
            columns={columns}
            data={filteredComplaints}
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
          />
        </div>

        {/* Right Panel - Complaint Details */}
        <div className="hidden lg:block lg:w-1/4 border-l border-gray-800 pl-4" style={{ backgroundColor: "#0F0F0F" }}> {/* Added padding-left */}
          {/* Search and Filter Bar */}
          <div className="p-2 flex justify-between">
            <div className="relative flex-grow mr-2">
              <input 
                type="text" 
                placeholder="Search complaints..." 
                className="bg-gray-900 border border-gray-700 text-white text-sm rounded-lg px-4 py-2 pl-10 w-full"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button className="flex items-center bg-transparent border border-[#FFD06B] text-[#FFD06B] px-4 py-2 rounded-lg">
              <span className="mr-2">Filter</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>

          {/* Complaint Details Content */}
          {selectedComplaint ? (
            <div className="p-4">
              <h2 className="text-lg font-medium mb-4">Complaint Details</h2>
              {/* Complaint details content would go here */}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>Select a complaint to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintsPage;

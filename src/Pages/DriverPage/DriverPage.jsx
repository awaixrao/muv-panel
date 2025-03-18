import React, { useState } from 'react';
import Table from '../../UI/Table/Table';
import { MdSearch } from 'react-icons/md';

const DriverPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All driver');

  const drivers = [
    {
      id: 1,
      firstName: 'Sierra',
      address: '9 Ipanema Palace Avenue, Tashkent, Uzbekistan',
      birthdate: '9/5/1990',
      status: 'Offline',
      phoneNumber: '+998 (99) 436-46-15',
      workLocation: 'Some Time Ago',
    },
    {
      id: 2,
      firstName: 'Nathaniel',
      address: '76 Express Plaza, Tashkent, Uzbekistan',
      birthdate: '6/6/1973',
      status: 'Active',
      phoneNumber: '+998 (99) 765-43-21',
      workLocation: '1 Month Ago',
    },
    {
      id: 3,
      firstName: 'Alberto',
      address: '9 Lloyd Trieste Kitchen, Tashkent 41092, Uzbekistan',
      birthdate: '11/4/1964',
      status: 'Offline',
      phoneNumber: '+998 (99) 111-22-33',
      workLocation: '3 Days Ago',
    },
    {
      id: 4,
      firstName: 'Mary',
      address: '9 Lloyd Trieste Kitchen, Tashkent 41092, Uzbekistan',
      birthdate: '11/3/1963',
      status: 'Active',
      phoneNumber: '+998 (99) 444-55-66',
      workLocation: '2 Weeks Ago',
    },
    {
      id: 5,
      firstName: 'Bessie',
      address: '9 Ipanema Palace Avenue, Tashkent, Uzbekistan',
      birthdate: '1/2/1949',
      status: 'Active',
      phoneNumber: '+998 (99) 777-88-99',
      workLocation: 'Some Time Ago',
    },
  ];

  const driverRequests = [
    {
      id: 1,
      firstName: 'Sierra',
      address: '9 Ipanema Palace Avenue, Tashkent, Uzbekistan',
      birthdate: '9/5/1980',
      state: 'New',
      homeLocation: '21 Hamidulla Oripov ko\'chasi, Tashkent, Uzbekistan',
    },
    {
      id: 2,
      firstName: 'Nathaniel',
      address: '76 Express Plaza, Tashkent, Uzbekistan',
      birthdate: '6/6/1972',
      state: 'New',
      homeLocation: '21 Hamidulla Oripov ko\'chasi, Tashkent, Uzbekistan',
    },
  ];

  const driverColumns = [
    {
      header: '',
      accessor: 'checkbox',
      type: 'checkbox',
      render: (row) => (
        <input type="checkbox" className="form-checkbox" />
      ),
    },
    { header: 'First Name', accessor: 'firstName', type: 'text' },
    { header: 'Address', accessor: 'address', type: 'text' },
    { header: 'Birthdate', accessor: 'birthdate', type: 'text' },
    {
      header: 'Status',
      accessor: 'status',
      type: 'text',
      render: (row) => (
        <span className={row.status === 'Active' ? 'text-amber-500' : 'text-black'}>
          {row.status}
        </span>
      ),
    },
    { header: 'Phone Number', accessor: 'phoneNumber', type: 'text' },
    {
      header: 'Work Location',
      accessor: 'workLocation',
      type: 'text',
      render: (row) => {
        const workLocationColor = row.workLocation.includes('Weeks Ago') || row.workLocation.includes('Months Ago') ?  ' bg-red-100  text-red-500 px-4  rounded-full' : ' rounded-full px-4 bg-yellow-100 text-amber-500';
        return <span className={workLocationColor}>{row.workLocation}</span>;
      },
    },
  ];

  const requestColumns = [
    {
      header: '',
      accessor: 'checkbox',
      type: 'checkbox',
      render: (row) => (
        <input type="checkbox" className="form-checkbox" />
      ),
    },
    { header: 'First Name', accessor: 'firstName', type: 'text' },
    { header: 'Address', accessor: 'address', type: 'text' },
    { header: 'Birthdate', accessor: 'birthdate', type: 'text' },
    { header: 'State', accessor: 'state', type: 'text' },
    { header: 'Home Location', accessor: 'homeLocation', type: 'text' },
    {
      header: 'Approve Or Not',
      accessor: 'approve',
      type: 'text',
      render: (row) => (
        <div className="flex space-x-2">
          <button className="px-4  bg-yellow-100 text-yellow-600 rounded-full hover:bg-yellow-200 transition duration-200">Yes</button>
          <button className="px-4 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition duration-200">No</button>
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredDrivers = drivers.filter(driver =>
    driver.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">Drivers list</h2>
          <div className="flex items-center bg-white rounded-full w-60">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={handleSearch}
              className="flex-1 py-2 px-3 border-none outline-none text-gray-600 text-sm placeholder-gray-400 rounded-l-lg"
            />
            <div className="p-2 flex items-center justify-center">
              <MdSearch className="text-gray-400 text-xl" />
            </div>
          </div>
        </div>
        <div className="relative">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-full p-2 pl-4 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            <option value="All driver">All driver</option>
            <option value="Active">Active</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      {/* Driver Table Section */}
      <Table
        columns={driverColumns}
        data={filteredDrivers}
        currentPage={1}
        totalPages={1}
        onPageChange={(page) => console.log('Page changed to:', page)}
      />

      {/* Driver Requests Table Section */}
      <h2 className="text-2xl font-semibold text-gray-900 mt-8">Drivers Request</h2>
      <Table
        columns={requestColumns}
        data={driverRequests}
        currentPage={1}
        totalPages={1}
        onPageChange={(page) => console.log('Page changed to:', page)}
      />
    </div>
  );
};

export default DriverPage;

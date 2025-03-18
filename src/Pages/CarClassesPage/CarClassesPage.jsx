import React, { useState } from 'react';
import Table from '../../UI/Table/Table'; // Assuming you have a Table component
import CarClassModal from './components/CarClassModal'; // Import the CarClassModal
import { MdSearch } from 'react-icons/md';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";

const CarClassesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [carClasses, setCarClasses] = useState([
    { id: 1, user: 'Sierra Ferguson', avatar: 'https://i.pravatar.cc/150?img=1', startingValue: 3000, freeKm: 0, perKmValue: 1200, waitingTime: 3, outOfBranch: 3 },
    { id: 2, user: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2', startingValue: 10000, freeKm: 12, perKmValue: 3600, waitingTime: 6, outOfBranch: 5 },
    // Add more sample data as needed
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCarClass, setCurrentCarClass] = useState(null);

  const tableColumns = [
    {
      header: '',
      accessor: 'checkbox',
      type: 'checkbox',
      render: (row) => (
        <input type="checkbox" className="form-checkbox" />
      ),
    },
    {
      header: 'User',
      accessor: 'user',
      type: 'user',
      render: (row) => (
        <div className="flex items-center">
          <img src={row.avatar} alt={row.user} className="w-8 h-8 rounded-full mr-2" />
          <span>{row.user}</span>
        </div>
      ),
    },
    { header: 'Starting Value', accessor: 'startingValue', type: 'text' },
    { header: 'Free Km', accessor: 'freeKm', type: 'text' },
    { header: 'Per Km Value', accessor: 'perKmValue', type: 'text' },
    { header: 'Waiting Time', accessor: 'waitingTime', type: 'text' },
    { header: 'Out Of Branch', accessor: 'outOfBranch', type: 'text' },
    {
      header: 'Actions',
      accessor: 'actions',
      type: 'actions',
      render: (row) => (
        <div className="flex space-x-3">
          <button className="text-amber-500 hover:text-amber-600" onClick={() => openModal(row)}>
            <TbEdit size={18} />
          </button>
          <button className="text-amber-500 hover:text-amber-600" onClick={() => handleDelete(row.id)}>
            <RiDeleteBin6Line size={18} />
          </button>
        </div>
      ),
    },
  ];

  const openModal = (carClass) => {
    setCurrentCarClass(carClass);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCarClass(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCarClasses = carClasses.filter(carClass =>
    carClass.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddCarClassModal = () => {
    setCurrentCarClass(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setCarClasses(carClasses.filter(carClass => carClass.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Car Classes List</h2>
        <div className="flex items-center">
          <button
            onClick={openAddCarClassModal}
            className="px-4 py-2 border border-yellow-400 text-black rounded hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Add Car Class
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Table
          columns={tableColumns}
          data={filteredCarClasses}
          currentPage={1}
          totalPages={1}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />

        {isModalOpen && (
          <CarClassModal
            isOpen={isModalOpen}
            onClose={closeModal}
            carClass={currentCarClass} // Pass the current car class to the modal
          />
        )}
      </div>
    </div>
  );
};

export default CarClassesPage;

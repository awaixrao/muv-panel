import React, { useState } from 'react';
import Table from '../../UI/Table/Table';
import DynamicModal from '../../UI/DynamicModal/DynamicModal';
import { MdSearch, MdDelete } from 'react-icons/md';
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";


const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Alena Ferguson',
      phone: '+998 (99) 123-45-67',
      totalRides: 123,
      totalFinished: 8,
      homeLocation: '9 Ipanema Palace Avenue, Tashkent, Uzbekistan',
      workLocation: '12 Akmal Street, Tashkent, Uzbekistan',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      name: 'Alena Ferguson',
      phone: '+998 (99) 765-43-21',
      totalRides: 16,
      totalFinished: 9,
      homeLocation: '9 Ipanema Palace Avenue, Tashkent, Uzbekistan',
      workLocation: '12 Akmal Street, Tashkent, Uzbekistan',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      name: 'Alena Ferguson',
      phone: '+998 (99) 111-22-33',
      totalRides: 305,
      totalFinished: 12,
      homeLocation: '76 Express Plaza, Tashkent, Uzbekistan',
      workLocation: '12 Akmal Street, Tashkent, Uzbekistan',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      name: 'Alena Ferguson',
      phone: '+998 (99) 444-55-66',
      totalRides: 7,
      totalFinished: 1,
      homeLocation: '9 Lloyd Trieste Kitchen, Tashkent 41092, Uzbekistan',
      workLocation: '12 Akmal Street, Tashkent 41092, Uzbekistan',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 5,
      name: 'Alena Ferguson',
      phone: '+998 (99) 777-88-99',
      totalRides: 19,
      totalFinished: 7,
      homeLocation: '9 Lloyd Trieste Kitchen, Tashkent 41092, Uzbekistan',
      workLocation: '10000, Uzbekistan',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState(null);
  
  const tableColumns = [
    { header: 'User', accessor: 'name', type: 'user' },
    { header: 'Total rides', accessor: 'totalRides', type: 'text' },
    { header: 'Total Finished', accessor: 'totalFinished', type: 'text' },
    { header: 'Home Location', accessor: 'homeLocation', type: 'location' },
    { header: 'Work Location', accessor: 'workLocation', type: 'location' },
    {
      header: '',
      accessor: 'actions',
      type: 'actions',
      render: (row) => (
        <div className="flex space-x-3">
          <button className="text-amber-500 hover:text-amber-600" onClick={() => openModal(row)}>
            <TbEdit size={18} />
          </button>
          <button className="text-amber-500 hover:text-amber-600">
            <img 
              src="https://via.placeholder.com/150" // A placeholder image for testing
              alt="Mail" 
              className="w-4 h-4" 
            />
          </button>
          <button className="text-amber-500 hover:text-amber-600">
            <RiDeleteBin6Line size={18} />
          </button>
        </div>
      ),
    },
  ];
  
  const openModal = (client) => {
    setCurrentClient(client);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentClient(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddClientModal = () => {
    setCurrentClient(null);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="p-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">Clients list</h2>
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
        <button
          onClick={openAddClientModal}
          className="px-4 py-2 border border-yellow-400 text-black rounded hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
        >
          Add New Client
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Table
          columns={tableColumns}
          data={filteredClients}
          currentPage={1}
          totalPages={1}
          onPageChange={(page) => console.log('Page changed to:', page)}
        />
        
        {isModalOpen && (
          <DynamicModal
            isOpen={isModalOpen}
            onClose={closeModal}
            client={currentClient}
            setClients={setClients}
          />
        )}
      </div>
    </div>
  );
};

export default ClientsPage;
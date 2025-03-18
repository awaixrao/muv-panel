import React, { useState } from 'react';

const DynamicModal = ({ isOpen, onClose, client }) => {
  const [formData, setFormData] = useState({
    firstName: client ? client.name : '',
    address: client ? client.homeLocation : '',
    startDate: '',
    endDate: ''
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    // You may want to update the client data here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-1/3 rounded shadow-lg p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        {/* Modal Header */}
        <h2 className="text-lg font-medium mb-4 text-gray-700">Clients Information</h2>
        
        {/* Profile Image Upload */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {selectedImage ? (
                <img src={selectedImage} alt="Client" className="w-20 h-20 rounded-full" />
              ) : (
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1 cursor-pointer">
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </label>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Sierra"
              className="w-full p-2 border border-gray-200 rounded text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          {/* Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="XXXXX"
              className="w-full p-2 border border-gray-200 rounded text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          {/* Date Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date:</label>
            <div className="flex items-center">
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                placeholder="Start date"
                className="w-full p-2 border border-gray-200 rounded-l text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="px-2 py-2 border-t border-b text-gray-400">-</div>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                placeholder="End date"
                className="w-full p-2 border border-gray-200 rounded-r text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            >
              Add New Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DynamicModal;
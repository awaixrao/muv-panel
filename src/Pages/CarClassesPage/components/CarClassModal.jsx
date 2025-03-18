import React, { useState } from "react";

const CarClassModal = ({ isOpen, onClose, carClass }) => {
  const [formData, setFormData] = useState({
    name: carClass ? carClass.name : "",
    lightning: false,
    delivery: false,
    startingValue: carClass ? carClass.startingValue : "",
    perKmValue: carClass ? carClass.perKmValue : "",
    waitingTime: carClass ? carClass.waitingTime : "",
    freeKm: carClass ? carClass.freeKm : "",
    perMinuteValue: carClass ? carClass.perMinuteValue : "",
    outOfBranch: carClass ? carClass.outOfBranch : "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    console.log("Submitted Data:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white w-1/3 rounded-lg shadow-lg p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          ✖
        </button>

        {/* Modal Header */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Car Class Information</h2>

        {/* Profile Image Upload */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              {selectedImage ? (
                <img src={selectedImage} alt="Car Class" className="w-16 h-16 rounded-full" />
              ) : (
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="lightning" checked={formData.lightning} onChange={handleChange} />
              <span className="text-gray-700">Lightning ⚡</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="delivery" checked={formData.delivery} onChange={handleChange} />
              <span className="text-gray-700">Delivery</span>
            </label>
          </div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Starting value:</label>
              <input
                type="text"
                name="startingValue"
                value={formData.startingValue}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Free km:</label>
              <input
                type="text"
                name="freeKm"
                value={formData.freeKm}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Per km value:</label>
              <input
                type="text"
                name="perKmValue"
                value={formData.perKmValue}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Per minute value:</label>
              <input
                type="text"
                name="perMinuteValue"
                value={formData.perMinuteValue}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Waiting time:</label>
              <input
                type="text"
                name="waitingTime"
                value={formData.waitingTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Out of branch:</label>
              <input
                type="text"
                name="outOfBranch"
                value={formData.outOfBranch}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded text-gray-700"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Add Car Class
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarClassModal;

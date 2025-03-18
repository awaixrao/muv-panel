import React from "react";
import vector from '../../assets/vector.png'; // Adjust the path as necessary

const moderators = [
  { id: 1, name: "admin", avatar: vector },
  { id: 2, name: "moderator", avatar: vector },
  { id: 3, name: "admin 2", avatar: vector },
];

const ModeratorsPage = () => {
  return (
    <div className="p-6">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Moderators list</h2>
        <button className="px-4 py-2 border border-yellow-400 text-black rounded text-sm hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400">
          Add New Moderator
        </button>
      </div>

      {/* Moderators List */}
      <div className="grid grid-cols-5 gap-6 mb-6">
        {moderators.map((moderator) => (
          <div key={moderator.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
            <img src={moderator.avatar} alt={moderator.name} className="w-16 h-16 rounded-full mb-2" />
            <span className="text-lg font-medium">{moderator.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeratorsPage;

import React, { useState } from 'react';

const Table = ({ columns, data, currentPage = 1, totalPages = 1, onPageChange }) => {
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
        : data.map((_, index) => index)
    );
  };

  // Helper function to render cell content based on column type
  const renderCell = (column, row) => {
    switch (column.type) {
      case 'user':
        return (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedRows.includes(row.id)}
              onChange={() => handleSelectRow(row.id)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <img 
              src={row.avatar} 
              alt="" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-gray-900">{row.name}</div>
              <div className="text-sm text-gray-500">{row.phone}</div>
            </div>
          </div>
        );

      case 'carComfort':
        return (
          <div className="text-sm text-gray-900">
            {row.carComfort}
          </div>
        );

      case 'income':
        return (
          <div className="flex items-center justify-end">
            <span className="text-[#32B60D] font-medium bg-[#EAFBE7] px-3 py-1 rounded-full">
              {row.income}
            </span>
          </div>
        );

      case 'location':
        return (
          <div className="max-w-xs">
            <div className="text-sm text-gray-900 truncate">{row[column.accessor]}</div>
          </div>
        );

      default:
        return (
          <span className="text-sm text-gray-900">
            {row[column.accessor]}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white"
                >
                  {index === 0 ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === data.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      {column.header}
                    </div>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="hover:bg-gray-50 transition-colors"
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className="px-6 py-4 whitespace-nowrap text-sm"
                  >
                    {renderCell(column, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span className="font-medium text-gray-700">1</span>
          <span>of</span>
          <span>{totalPages}</span>
          <span>items</span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm
                ${currentPage === page 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-500 hover:bg-gray-50'}`}
            >
              {page}
            </button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50">
            <span>›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table; 
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
        : data.map(row => row.id)
    );
  };

  // Helper function to render cell content based on column type
  const renderCell = (column, row) => {
    if (column.render) {
      return column.render(row);
    }

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
            <div className="ml-2">
              <div className="font-medium text-gray-900">{row.name}</div>
              <div className="text-sm text-gray-500">{row.phone}</div>
            </div>
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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white"
                >
                  {index === 0 ? (
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.length === data.length && data.length > 0}
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
                    className="px-6 py-3 whitespace-nowrap"
                  >
                    {renderCell(column, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>Total users: {data.length}</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center gap-1 text-sm text-gray-500 mr-2">
            <span>1-{Math.min(data.length, 5)} of {data.length} items</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange(1)}
              className="w-8 h-8 flex items-center justify-center rounded bg-amber-400 text-sm font-medium text-white"
            >
              1
            </button>
            <button
              onClick={() => onPageChange(2)}
              disabled={totalPages < 2}
              className="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              2
            </button>
            <button 
              onClick={() => onPageChange(3)}
              disabled={totalPages < 3}
              className="w-8 h-8 flex items-center justify-center rounded text-sm text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
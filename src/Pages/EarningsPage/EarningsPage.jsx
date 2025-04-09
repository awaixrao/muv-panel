import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Vector3 from '../../assets/vector3.png'; // Adjust path to your assets folder
import Vector4 from '../../assets/vector4.png'; // Adjust path to your assets folder

// Card component for the top row - identical to the ones in your dashboard
const EarningsCard = ({ title, value, change, icon }) => {
  const isPositive = !change.startsWith('-');
  
  return (
    <div className="bg-[#0F0F0F] rounded-xl p-5 border border-[#1A1A1A]">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <h3 className="text-white text-3xl font-medium mb-2">{value}</h3>
          <div className="flex items-center text-sm">
            <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
              {change}
            </span>
            <span className="text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
        <div className="bg-[#1A1A1A] p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

// Earnings Line Chart component with reduced height
const EarningsLineChart = ({ title, data }) => {
  return (
    <div className="bg-[#0F0F0F] rounded-xl p-5 border border-[#1A1A1A]">
      <div className="mb-3">
        <h3 className="text-white text-xl font-medium">{title}</h3>
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', borderRadius: '4px' }}
              itemStyle={{ color: '#2563EB' }}
              labelStyle={{ color: 'white' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#2563EB" 
              strokeWidth={3}
              dot={false}
              activeDot={{ stroke: '#2563EB', strokeWidth: 2, r: 6, fill: '#2563EB' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Payment Methods Distribution component with progress bars in rows and reduced height
const PaymentMethodsChart = ({ title, data }) => {
  return (
    <div className="bg-[#0F0F0F] rounded-xl p-5 border border-[#1A1A1A]">
      <div className="mb-3">
        <h3 className="text-white text-xl font-medium">{title}</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">{item.method}</span>
              <span className="text-gray-300">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full bg-amber-400" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Transactions Table component with properly aligned header buttons
const TransactionsTable = () => {
  // Table data
  const transactions = [
    { id: 'TRX-1234', date: 'Apr 05, 2025', amount: '$325.00', method: 'Credit Card', customer: 'Emma Wilson', driver: 'Jake Thomas', status: 'Completed' },
    { id: 'TRX-1235', date: 'Apr 06, 2025', amount: '$178.50', method: 'PayPal', customer: 'Daniel Lee', driver: 'Olivia Garcia', status: 'Pending' },
    { id: 'TRX-1236', date: 'Apr 06, 2025', amount: '$92.75', method: 'Apple Pay', customer: 'Noah Parker', driver: 'Sophia Martinez', status: 'Failed' },
    { id: 'TRX-1237', date: 'Apr 07, 2025', amount: '$215.30', method: 'Credit Card', customer: 'Isabella Chen', driver: 'Ethan Johnson', status: 'Completed' },
    { id: 'TRX-1238', date: 'Apr 07, 2025', amount: '$163.80', method: 'Google Pay', customer: 'William Taylor', driver: 'Ava Robinson', status: 'Pending' }
  ];

  // Status color function
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-amber-400 text-black';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="bg-[#0F0F0F] rounded-lg overflow-hidden">
      {/* Table Header with Tabs */}
      <div className="flex items-center justify-between border-b border-gray-800">
        {/* Tabs on left */}
        <div className="flex">
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'transactions' ? 'bg-amber-400 text-black' : 'bg-transparent text-gray-400'}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'pending' ? 'bg-amber-400 text-black' : 'bg-transparent text-gray-400'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Approvals
          </button>
        </div>
        
        {/* Export buttons on right */}
        <div className="flex items-center mr-2">
          <button className="px-3 py-1 mr-2 bg-[#1A1A1A] rounded text-sm text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            CSV
          </button>
          <button className="px-3 py-1 bg-[#1A1A1A] rounded text-sm text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            PDF
          </button>
        </div>
      </div>
      
      {/* Search Bar with Status Filter */}
      <div className="px-4 py-2 border-b border-gray-800 flex justify-between items-center">
        <div className="relative flex-1 mr-2">
          <input 
            type="text" 
            placeholder="Search by ID, customer or driver..." 
            className="bg-[#1A1A1A] text-white text-sm rounded px-4 py-2 pl-10 w-full"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex items-center">
          <button className="bg-[#1A1A1A] text-white px-3 py-2 rounded text-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            All Statuses
          </button>
        </div>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Transaction ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Method</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Driver</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{transaction.id}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{transaction.date}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{transaction.amount}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{transaction.method}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{transaction.customer}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-white">{transaction.driver}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <button className="text-gray-400 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const EarningsPage = () => {
  // Card data exactly matching your images
  const cardData = [
    {
      title: "Total Earnings",
      value: "$284,546.75",
      change: "+12.3% ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
          <path d="M12 18V6"></path>
        </svg>
      )
    },
    {
      title: "Driver Payouts",
      value: "$178,932.50",
      change: "+8.7% ",
      icon: <img src={Vector4} alt="Driver Payout Icon" className="text-amber-400" />
    },
    {
      title: "Pending Transactions",
      value: "$24,356.25",
      change: "-2% ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    {
      title: "Refund Requests",
      value: "$3,276.80",
      change: "+5% ",
      icon: <img src={Vector3} alt="Refund Request Icon" className="text-amber-400" />
    }
  ];

  // Data for Earnings Overview graph
  const earningsData = [
    { name: 'Jan', value: 15000 },
    { name: 'Feb', value: 20000 },
    { name: 'Mar', value: 18000 },
    { name: 'Apr', value: 22000 },
    { name: 'May', value: 20000 },
    { name: 'Jun', value: 24000 },
    { name: 'Jul', value: 28000 },
  ];

  // Data for Payment Methods Distribution
  const paymentMethodsData = [
    { method: "Credit Card", percentage: 65 },
    { method: "PayPal", percentage: 20 },
    { method: "Wallet", percentage: 10 },
    { method: "Other", percentage: 5 },
  ];

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium">Payments & Earnings</h1>
        <p className="text-gray-400 text-sm">Manage all payment activities</p>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cardData.map((card, index) => (
          <EarningsCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Earnings Overview Chart with reduced height */}
        <EarningsLineChart 
          title="Earnings Overview" 
          data={earningsData} 
        />
        
        {/* Payment Methods Distribution with reduced height */}
        <PaymentMethodsChart 
          title="Payment Methods Distribution" 
          data={paymentMethodsData} 
        />
      </div>

      {/* Transactions Table */}
      <div className="mb-6">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default EarningsPage;
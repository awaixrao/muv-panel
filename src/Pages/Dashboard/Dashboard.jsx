import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { User, TrendingUp, TrendingDown } from 'lucide-react';
import Table from '../../UI/Table/Table';

const Dashboard = () => {
  // Sample data for the chart
  const chartData = [
    { name: 'Jan', rides: 4000, sales: 2400 },
    { name: 'Feb', rides: 3000, sales: 1398 },
    { name: 'Mar', rides: 2000, sales: 9800 },
    { name: 'Apr', rides: 2780, sales: 3908 },
    { name: 'May', rides: 1890, sales: 4800 },
    { name: 'Jun', rides: 2390, sales: 3800 },
    { name: 'Jul', rides: 3490, sales: 4300 },
  ];

  // Sample data for stats cards
  const statsCards = [
    { 
      title: 'Total active drivers', 
      value: '7,265', 
      change: '+11.01%', 
      isPositive: true,
      color: 'bg-[#FFD572]' // Yellow
    },
    { 
      title: 'Total active passengers', 
      value: '3,671', 
      change: '-0.03%', 
      isPositive: false,
      color: 'bg-[#96F294]' // Light green
    },
    { 
      title: 'Total rides completed', 
      value: '156', 
      change: '+15.03%', 
      isPositive: true,
      color: 'bg-[#FFB572]' // Orange
    },
    { 
      title: 'Total earnings', 
      value: '2,318', 
      change: '+4.08%', 
      isPositive: true,
      color: 'bg-[#72DFD0]' // Teal
    },
  ];

  // Sample data for top drivers
  const topDrivers = [
    { 
      name: 'Maharrm Hasanli', 
      phone: '+998 (99) 436-46-15',
      orders: 5, 
      income: '$ 98', 
      avatar: 'https://i.pravatar.cc/40?img=1' 
    },
    { 
      name: 'Gina Garza', 
      phone: '+998 (99) 158-10-15',
      orders: 5, 
      income: '$ 15', 
      avatar: 'https://i.pravatar.cc/40?img=2' 
    },
    { 
      name: 'Brian Reed', 
      phone: '+998 (99) 436-46-15',
      orders: 5, 
      income: '$ 23', 
      avatar: 'https://i.pravatar.cc/40?img=3' 
    },
    { name: 'Tammy Spencer', rating: 5, income: '$98', avatar: 'https://i.pravatar.cc/40?img=4' },
    { name: 'Joseph Brooks', rating: 5, income: '$90', avatar: 'https://i.pravatar.cc/40?img=5' },
    { name: 'Juan Steward', rating: 5, income: '$98', avatar: 'https://i.pravatar.cc/40?img=6' },
  ];

  // Sample table data
  const tableColumns = [
    { 
      header: 'User', 
      accessor: 'user',
      type: 'user'
    },
    { 
      header: 'Car Comfort', 
      accessor: 'carComfort',
      type: 'carComfort'
    },
    { 
      header: 'Ordered Time', 
      accessor: 'orderedTime',
      type: 'datetime'
    },
    { 
      header: 'Start Location', 
      accessor: 'startLocation',
      type: 'location'
    },
    { 
      header: 'Finish Location', 
      accessor: 'finishLocation',
      type: 'location'
    },
    { 
      header: 'Income', 
      accessor: 'income',
      type: 'income'
    }
  ];

  const tableData = [
    {
      id: 1,
      avatar: 'https://i.pravatar.cc/40?img=1',
      name: 'Harris Ferguson',
      phone: '+998 (99) 436-34-32',
      carComfort: 'simple',
      orderedTime: '04.07.2021 07:34',
      startLocation: '25 Mira st., Tashkent, Uzbekistan',
      finishLocation: '13 Amir Temur st., Tashkent, Uzbekistan',
      income: '$4.00'
    },
    // Add more rows...
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Stats Cards & Graph */}
        <div className="col-span-8 space-y-6">
          {/* Stats Cards in single row with reduced width */}
          <div className="grid grid-cols-4 gap-3">
            {statsCards.map((card, index) => (
              <div 
                key={index} 
                className={`${card.color} rounded-2xl p-3`}
              >
                <h3 className="text-xs text-gray-700 mb-1">{card.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-medium text-gray-900">{card.value}</span>
                  <div className="flex items-center gap-0.5 text-gray-700">
                    <span className="text-xs">{card.change}</span>
                    {card.isPositive ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Graph */}
          <div className="bg-white rounded-2xl p-6 shadow-sm h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Statistic</h2>
                <h3 className="text-sm text-gray-500">Audit Revenue</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FFB800]"></div>
                  <span className="text-sm text-gray-500">Rides</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#32B60D]"></div>
                  <span className="text-sm text-gray-500">Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Aug 2021</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Line 
                    type="monotone" 
                    dataKey="rides" 
                    stroke="#FFB800" 
                    strokeWidth={2} 
                    dot={false} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#32B60D" 
                    strokeWidth={2} 
                    dot={false} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column - Top Drivers */}
        <div className="col-span-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm h-[485px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Top Drivers</h2>
              <button className="text-blue-600 text-sm">See all</button>
            </div>

            <div className="space-y-6">
              {topDrivers.map((driver, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={driver.avatar} 
                      alt="" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{driver.name}</h3>
                      <span className="text-sm text-gray-500">{driver.phone}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      Orders: <span className="text-gray-700">{driver.orders}</span>
                    </div>
                    <div className="font-medium text-gray-900">
                      Income: <span className="text-gray-900">{driver.income}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <Table 
        columns={tableColumns} 
        data={tableData}
        currentPage={1}
        totalPages={3}
        onPageChange={(page) => console.log('Page changed to:', page)}
      />
    </div>
  );
};

export default Dashboard;

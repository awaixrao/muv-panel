import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Updated dynamic card component to match the screenshot
const DashboardCard = ({ title, value, change, icon }) => {
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

// Graph Card component with actual chart implementation
const AreaGraphCard = ({ title, data, color, gradientColor, isFilled }) => {
  return (
    <div className="bg-[#0F0F0F] rounded-xl p-5 border border-[#1A1A1A]">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white text-xl font-medium">{title}</h3>
      </div>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {isFilled ? (
            <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={`colorFill${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0.2}/>
                </linearGradient>
              </defs>
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
                itemStyle={{ color: color }}
                labelStyle={{ color: 'white' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2}
                fillOpacity={1}
                fill={`url(#colorFill${title.replace(/\s+/g, '')})`}
                activeDot={{ stroke: color, strokeWidth: 2, r: 6, fill: color }}
              />
            </AreaChart>
          ) : (
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
                itemStyle={{ color: color }}
                labelStyle={{ color: 'white' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={3}
                dot={false}
                activeDot={{ stroke: color, strokeWidth: 2, r: 6, fill: color }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Bar Chart Card component
const BarChartCard = ({ title, data }) => {
  return (
    <div className="bg-[#0F0F0F] rounded-xl p-5 border border-[#1A1A1A]">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white text-xl font-medium">{title}</h3>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
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
              labelStyle={{ color: 'white' }}
            />
            <Bar dataKey="customers" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            <Bar dataKey="drivers" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 10 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Dashboard = () => {
  // Dashboard card data
  const cardData = [
    {
      title: "Total Rides",
      value: "12,456",
      change: "+8.2% ",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <path d="M9 17h6"></path>
              <circle cx="17" cy="17" r="2"></circle>
            </svg>
    },
    {
      title: "Active Drivers",
      value: "1,248",
      change: "+8% ",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
    },
    {
      title: "Pending Complaints",
      value: "23",
      change: "-5% ",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
    },
    {
      title: "Total Earnings",
      value: "$45,389",
      change: "+10% ",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
              <path d="M12 18V6"></path>
            </svg>
    }
  ];

  // Data for Ride Trends graph (amber/gold color)
  const rideData = [
    { name: 'Jan', value: 3000 },
    { name: 'Feb', value: 3500 },
    { name: 'Mar', value: 3300 },
    { name: 'Apr', value: 3700 },
    { name: 'May', value: 4000 },
    { name: 'Jun', value: 4300 },
    { name: 'Jul', value: 4500 },
  ];

  // Data for Earnings Overview graph (blue color)
  const earningsData = [
    { name: 'Jan', value: 15000 },
    { name: 'Feb', value: 18000 },
    { name: 'Mar', value: 17000 },
    { name: 'Apr', value: 20000 },
    { name: 'May', value: 19000 },
    { name: 'Jun', value: 21000 },
    { name: 'Jul', value: 22000 },
  ];

  // Data for User Growth bar chart
  const userGrowthData = [
    { name: 'Jan', customers: 2000, drivers: 500 },
    { name: 'Feb', customers: 2500, drivers: 600 },
    { name: 'Mar', customers: 3000, drivers: 700 },
    { name: 'Apr', customers: 3500, drivers: 800 },
    { name: 'May', customers: 4200, drivers: 900 },
    { name: 'Jun', customers: 4600, drivers: 1000 },
    { name: 'Jul', customers: 5100, drivers: 1100 },
  ];

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-xl font-medium">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back, Admin</p>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Graphs Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Ride Trends Graph - with area fill */}
        <AreaGraphCard 
          title="Ride Trends"
          data={rideData}
          color="#D97706" // amber-600
          gradientColor="#92400E" // amber-800
          isFilled={true}
        />
        {/* Earnings Overview Graph - line only */}
        <AreaGraphCard 
          title="Earnings Overview"
          data={earningsData}
          color="#2563EB" // blue-600
          isFilled={false}
        />
      </div>

      {/* User Growth Bar Chart - Full Width */}
      <div className="mb-6">
        <BarChartCard 
          title="User Growth" 
          data={userGrowthData} 
        />
      </div>

      {/* Rest of the dashboard content - can be added back as needed */}
    </div>
  );
};

export default Dashboard;
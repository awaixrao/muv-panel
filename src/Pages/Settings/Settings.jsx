import React, { useState } from 'react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('commission');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pricing':
        return <PricingRulesTab />;
      case 'commission':
        return <DriverCommissionTab />;
      case 'fare':
        return <RideFareAdjustmentTab />;
      case 'notification':
        return <NotificationPreferencesTab />;
      case 'security':
        return <SecuritySettingsTab />;
      default:
        return <DriverCommissionTab />;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {/* Navigation Tabs */}
      <div className="flex mb-6">
        <button 
          className={`px-4 py-2 rounded-md flex items-center mr-2 ${activeTab === 'pricing' ? 'bg-amber-400 text-black' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => setActiveTab('pricing')}
        >
          <span className="mr-2">$</span>
          Pricing Rules
        </button>
        <button 
          className={`px-4 py-2 rounded-md flex items-center mr-2 ${activeTab === 'commission' ? 'bg-amber-400 text-black' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => setActiveTab('commission')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Driver Commission
        </button>
        <button 
          className={`px-4 py-2 rounded-md flex items-center mr-2 ${activeTab === 'fare' ? 'bg-amber-400 text-black' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => setActiveTab('fare')}
        >
          <span className="mr-2">$</span>
          Ride Fare Adjustment
        </button>
        <button 
          className={`px-4 py-2 rounded-md flex items-center mr-2 ${activeTab === 'notification' ? 'bg-amber-400 text-black' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => setActiveTab('notification')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          Notification Preferences
        </button>
        <button 
          className={`px-4 py-2 rounded-md flex items-center ${activeTab === 'security' ? 'bg-amber-400 text-black' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => setActiveTab('security')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          Security Settings
        </button>
      </div>

      {/* Render active tab content */}
      {renderTabContent()}
    </div>
  );
};

// Updated Custom Slider Component with proper design
const Slider = ({ value, onChange, min = 0, max = 100 }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleSliderChange = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPercentage = Math.min(Math.max(x / rect.width, 0), 1);
    const newValue = min + newPercentage * (max - min);
    onChange(newValue);
  };

  return (
    <div className="relative w-full h-1 bg-gray-700 rounded-full mt-2 cursor-pointer" onClick={handleSliderChange}>
      <div 
        className="absolute left-0 top-0 h-1 bg-amber-400 rounded-full" 
        style={{ width: `${percentage}%` }}
      />
      <div 
        className="absolute top-1/2 w-4 h-4 bg-amber-400 rounded-full cursor-grab"
        style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

// Collapsible Section Component
const Section = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6">
      <div 
        className="flex justify-between items-center bg-black rounded-t-xl p-4 border border-gray-800 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium">{title}</h2>
        <button>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transform ${isOpen ? 'rotate-180' : ''} transition-transform`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      {isOpen && (
        <div className="bg-black rounded-b-xl p-4 border-x border-b border-gray-800 space-y-6">
          {children}
        </div>
      )}
    </div>
  );
};

// Toggle Switch Component
const Toggle = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
    </label>
  );
};

// Driver Commission Tab Component
const DriverCommissionTab = () => {
  const [baseCommission, setBaseCommission] = useState(5);
  const [expBonus, setExpBonus] = useState(15);
  const [payoutFrequency, setPayoutFrequency] = useState('Weekly');
  const [enablePerfBonus, setEnablePerfBonus] = useState(true);
  const [enableTipSharing, setEnableTipSharing] = useState(true);

  return (
    <div>
      <Section title="Commission Structure">
        <div className="flex justify-between items-center">
          <p className="text-white">Base Commission Rate</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value={baseCommission}
              onChange={(e) => setBaseCommission(Number(e.target.value))}
              className="bg-black text-white text-sm rounded-md px-3 py-1 w-16 mr-2 text-right border border-gray-800"
            />
            <span className="text-gray-400">%</span>
          </div>
        </div>
        
        <Slider 
          value={baseCommission} 
          onChange={setBaseCommission}
          min={0}
          max={20}
        />
        
        <div className="flex justify-between items-center mt-8">
          <p className="text-white">Experienced Driver Bonus</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value={expBonus}
              onChange={(e) => setExpBonus(Number(e.target.value))}
              className="bg-black text-white text-sm rounded-md px-3 py-1 w-16 mr-2 text-right border border-gray-800"
            />
            <span className="text-gray-400">%</span>
          </div>
        </div>
        
        <Slider 
          value={expBonus} 
          onChange={setExpBonus}
          min={0}
          max={30}
        />
      </Section>

      <Section title="Payout Setting">
        <div>
          <p className="text-white mb-2">Payout Frequency</p>
          <div className="relative">
            <select 
              className="bg-black text-white text-sm rounded-md px-4 py-2 w-full appearance-none border border-gray-800"
              value={payoutFrequency}
              onChange={(e) => setPayoutFrequency(e.target.value)}
            >
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-white">Performance Bonus</p>
            <p className="text-xs text-gray-400">Enable performance-based bonuses for high-performing drivers</p>
          </div>
          <Toggle checked={enablePerfBonus} onChange={setEnablePerfBonus} />
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-white">Tip Sharing</p>
            <p className="text-xs text-gray-400">Allow drivers to keep 100% of their tips</p>
          </div>
          <Toggle checked={enableTipSharing} onChange={setEnableTipSharing} />
        </div>
      </Section>
    </div>
  );
};

// Ride Fare Adjustment Tab Component
const RideFareAdjustmentTab = () => {
  const [fareTemplate, setFareTemplate] = useState('Standard Fare');
  const [enableCustomFares, setEnableCustomFares] = useState(true);
  const [enableFareRounding, setEnableFareRounding] = useState(true);

  return (
    <div>
      <Section title="Fare Template">
        <div>
          <p className="text-white mb-2">Select Fare Template</p>
          <div className="relative">
            <select 
              className="bg-black text-white text-sm rounded-md px-4 py-2 w-full appearance-none border border-gray-800"
              value={fareTemplate}
              onChange={(e) => setFareTemplate(e.target.value)}
            >
              <option>Standard Fare</option>
              <option>Premium Fare</option>
              <option>Economy Fare</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button className="bg-amber-400 text-black px-4 py-2 rounded-md text-sm">
            Apply
          </button>
          <button className="bg-gray-100 text-black px-4 py-2 rounded-md text-sm">
            Save
          </button>
        </div>
      </Section>

      <Section title="Fare Adjustment">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white">Enable Custom Fares</p>
            <p className="text-xs text-gray-400">Enable performance-based bonuses for high-performing drivers</p>
          </div>
          <Toggle checked={enableCustomFares} onChange={setEnableCustomFares} />
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-white">Enable Fare Rounding</p>
            <p className="text-xs text-gray-400">Allow drivers to keep 100% of their tips</p>
          </div>
          <Toggle checked={enableFareRounding} onChange={setEnableFareRounding} />
        </div>
      </Section>
    </div>
  );
};

// Notification Preferences Tab Component
const NotificationPreferencesTab = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState('Real-time');

  return (
    <div>
      <Section title="Notification Channels">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white">Email Notifications</p>
            <p className="text-xs text-gray-400">Receive important updates and alerts via email</p>
          </div>
          <Toggle checked={emailNotifications} onChange={setEmailNotifications} />
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-white">SMS Notifications</p>
            <p className="text-xs text-gray-400">Get instant notifications via SMS (standard rates may apply)</p>
          </div>
          <Toggle checked={smsNotifications} onChange={setSmsNotifications} />
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-white">Push Notifications</p>
            <p className="text-xs text-gray-400">Receive real-time push notifications on your devices</p>
          </div>
          <Toggle checked={pushNotifications} onChange={setPushNotifications} />
        </div>
      </Section>

      <Section title="Notification Setting">
        <div>
          <p className="text-white mb-2">Notification Frequency</p>
          <div className="relative">
            <select 
              className="bg-black text-white text-sm rounded-md px-4 py-2 w-full appearance-none border border-gray-800"
              value={notificationFrequency}
              onChange={(e) => setNotificationFrequency(e.target.value)}
            >
              <option>Real-time</option>
              <option>Hourly</option>
              <option>Daily</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button className="bg-amber-400 text-black px-4 py-2 rounded-md text-sm">
            Apply
          </button>
          <button className="bg-gray-100 text-black px-4 py-2 rounded-md text-sm">
            Save
          </button>
        </div>
      </Section>
    </div>
  );
};

// Security Settings Tab Component
const SecuritySettingsTab = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [passwordExpiry, setPasswordExpiry] = useState('30 days');
  const [dataRetention, setDataRetention] = useState('90 Days');
  const [ipWhitelisting, setIpWhitelisting] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);

  return (
    <div>
      <Section title="Authentication Setting">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white">Two-Factor Authentication</p>
            <p className="text-xs text-gray-400">Require two-factor authentication for all admin users</p>
          </div>
          <Toggle checked={twoFactorAuth} onChange={setTwoFactorAuth} />
        </div>
        
        <div className="mt-6">
          <p className="text-white mb-2">Password Expiry</p>
          <div className="relative">
            <select 
              className="bg-black text-white text-sm rounded-md px-4 py-2 w-full appearance-none border border-gray-800"
              value={passwordExpiry}
              onChange={(e) => setPasswordExpiry(e.target.value)}
            >
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Session Setting">
        <div className="flex justify-between items-center">
          <p className="text-white">Session Timeout</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(Number(e.target.value))}
              className="bg-black text-white text-sm rounded-md px-3 py-1 w-16 mr-2 text-right border border-gray-800"
            />
            <span className="text-gray-400">min</span>
          </div>
        </div>
        
        <Slider 
          value={sessionTimeout} 
          onChange={setSessionTimeout}
          min={5}
          max={60}
        />
      </Section>

      <Section title="Data Protection">
        <div>
          <p className="text-white mb-2">Data Retention Period</p>
          <div className="relative">
            <select 
              className="bg-black text-white text-sm rounded-md px-4 py-2 w-full appearance-none border border-gray-800"
              value={dataRetention}
              onChange={(e) => setDataRetention(e.target.value)}
            >
              <option>30 Days</option>
              <option>60 Days</option>
              <option>90 Days</option>
              <option>180 Days</option>
              <option>1 Year</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-white">IP Whitelisting</p>
            <p className="text-xs text-gray-400">Enable performance-based bonuses for high-performing drivers</p>
          </div>
          <Toggle checked={ipWhitelisting} onChange={setIpWhitelisting} />
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div>
            <p className="text-white">Audit Logging</p>
            <p className="text-xs text-gray-400">Allow drivers to keep 100% of their tips</p>
          </div>
          <Toggle checked={auditLogging} onChange={setAuditLogging} />
        </div>

        <div className="flex items-center justify-end mt-6">
          <button className="bg-amber-400 text-black px-4 py-2 rounded-md text-sm">
            Viewer
          </button>
        </div>
      </Section>
    </div>
  );
};

// Pricing Rules Tab Component
const PricingRulesTab = () => {
  const [basePrice, setBasePrice] = useState(5);
  const [pricePerKm, setPricePerKm] = useState(1.5);
  const [pricePerMin, setPricePerMin] = useState(0.25);
  const [pricingModel, setPricingModel] = useState('Viewer');
  const [surgePricingMultiplier, setSurgePricingMultiplier] = useState(1.25);

  return (
    <div>
      <Section title="Base Pricing" defaultOpen={true}>
        <div className="flex justify-between items-center">
          <p className="text-white">Base Price</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value={basePrice}
              onChange={(e) => setBasePrice(Number(e.target.value))}
              className="bg-black text-white text-sm rounded-md px-3 py-1 w-16 mr-2 text-right border border-gray-800"
            />
            <span className="text-gray-400">$</span>
          </div>
        </div>
        
        <Slider 
          value={basePrice} 
          onChange={setBasePrice}
          min={0}
          max={10}
        />
        
        <div className="flex justify-between items-center mt-8">
          <p className="text-white">Price per Kilometer</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value={pricePerKm}
              onChange={(e) => setPricePerKm(Number(e.target.value))}
              className="bg-black text-white text-sm rounded-md px-3 py-1 w-16 mr-2 text-right border border-gray-800"
            />
            <span className="text-gray-400">$</span>
          </div>
        </div>
        
        <Slider 
          value={pricePerKm} 
          onChange={setPricePerKm}
          min={0}
          max={3}
        />
        
        <div className="flex justify-between items-center mt-8">
          <p className="text-white">Price per Minute</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value={pricePerMin}
              onChange={(e) => setPricePerMin(Number(e.target.value))}
              className="bg-black text-white text-sm rounded-md px-3 py-1 w-16 mr-2 text-right border border-gray-800"
            />
            <span className="text-gray-400">$</span>
          </div>
        </div>
        
        <Slider 
          value={pricePerMin} 
          onChange={setPricePerMin}
          min={0}
          max={0.5}
        />
      </Section>

      <Section title="Demand Pricing" defaultOpen={false}>
        <div>
          <p className="text-white mb-2">Pricing Model</p>
          <div className="relative">
            <select 
              className="bg-black text-white text-sm rounded-md px-4 py-2 w-full appearance-none border border-gray-800"
              value={pricingModel}
              onChange={(e) => setPricingModel(e.target.value)}
            >
              <option>Viewer</option>
              <option>Dynamic</option>
              <option>Fixed</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <p className="text-white">Surge Pricing Multiplier</p>
          <div className="flex items-center">
            <input 
              type="text" 
              value={surgePricingMultiplier}
              onChange={(e) => setSurgePricingMultiplier(Number(e.target.value))}
              className="bg-black text-white text-sm rounded-md px-3 py-1 w-16 mr-2 text-right border border-gray-800"
            />
            <span className="text-gray-400">x</span>
          </div>
        </div>
        
        <Slider 
          value={surgePricingMultiplier} 
          onChange={setSurgePricingMultiplier}
          min={1}
          max={3}
        />
      </Section>
    </div>
  );
};

export default SettingsPage;
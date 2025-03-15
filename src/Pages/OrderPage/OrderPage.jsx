import React, { useState } from 'react';

const OrdersPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('+998');
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const [comment, setComment] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const carOptions = [
    { id: 1, name: 'SUV', price: '30 000 SUM' },
    { id: 2, name: 'Elite', price: '30 000 SUM' },
    { id: 3, name: 'XL', price: '30 000 SUM' },
    { id: 4, name: 'XL MUV', price: '30 000 SUM' },
  ];

  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Knowledge base
      </h2>

      {/* Map Section */}
      <div className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.50264869202!2d69.13928276770829!3d41.28251254610872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1648636266342!5m2!1sen!2s"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Two Cards Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Card - Form Details */}
        <div className="col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Phone Number */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Phone number:
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+998 (--) --- -- --"
              />
            </div>

            {/* Payment Dropdown */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Payment:
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option>Paypal</option>
                <option>Credit Card</option>
                <option>Cash</option>
              </select>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mb-6">
            <label className="flex items-center text-sm text-gray-500">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="w-4 h-4 mr-2 border-gray-300 rounded"
              />
              I agree to the <span className="text-yellow-400 ml-1">terms and conditions</span>
            </label>
          </div>

          {/* Comment Section */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Comment:
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="You can leave your opinion"
            ></textarea>
          </div>
        </div>

        {/* Right Card - MUV Cars */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">MUV Cars</h3>
          <div className="space-y-4">
            {carOptions.map((car) => (
              <div key={car.id} className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="car-option"
                    className="w-4 h-4 text-blue-600 border-gray-300"
                  />
                  <span className="ml-3 text-gray-700">{car.name}</span>
                </label>
                <span className="px-3 py-1 bg-[#EAFBE7] text-[#32B60D] rounded-full text-sm">
                  {car.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
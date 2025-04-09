import React from 'react';
import avatar from '../../../assets/vector.png'; // Update the path as necessary
import { FaFolder } from 'react-icons/fa'; // Importing folder icon from react-icons

const DriverData = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Driver data</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center">
                    <img src={avatar} alt="Driver Avatar" className="w-16 h-16 rounded-full mr-4" />
                    <div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Name:</p>
                            <p className="ml-4">Husen Seid</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Birth Date:</p>
                            <p className="ml-4">12.12.2003</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">Balance:</p>
                            <p className="ml-4">15.08.1998</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="font-semibold">State:</p>
                            <p className="ml-4 text-green-500">Active</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="font-semibold mb-2">Comment:</p>
                    <p className="text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
                        temporibus officia natus accusamus molestias recusandae quasi sed architecto
                        sunt omnis aut, quibusdam porro et dolorum consequuntur, error repliat
                        blanditiis rerum.
                    </p>
                </div>
            </div>
            <div className="flex space-x-2">
                <div className="flex items-center bg-yellow-200 bg-opacity-70 rounded-lg p-2 w-1/6">
                    <FaFolder className="text-yellow-600 mr-2" />
                    <span className="font-semibold">Order accept</span>
                    <span className="ml-2">78</span>
                </div>
                <div className="flex items-center bg-green-200 bg-opacity-70 rounded-lg p-2 w-1/6">
                    <FaFolder className="text-green-600 mr-2" />
                    <span className="font-semibold">Order cancel</span>
                    <span className="ml-2">10</span>
                </div>
                <div className="flex items-center bg-green-200 bg-opacity-70 rounded-lg p-2 w-1/6">
                    <FaFolder className="text-green-600 mr-2" />
                    <span className="font-semibold">Order skip</span>
                </div>
                <div className="flex items-center bg-blue-200 bg-opacity-70 rounded-lg p-2 w-1/6">
                    <FaFolder className="text-blue-600 mr-2" />
                    <span className="font-semibold">Rate</span>
                </div>
                <div className="flex items-center bg-purple-200 bg-opacity-70 rounded-lg p-2 w-1/6">
                    <FaFolder className="text-purple-600 mr-2" />
                    <span className="font-semibold">Cash</span>
                </div>
                <div className="flex items-center bg-pink-200 bg-opacity-70 rounded-lg p-2 w-1/6">
                    <FaFolder className="text-pink-600 mr-2" />
                    <span className="font-semibold">Card</span>
                </div>
            </div>
        </div>
    );
};

export default DriverData;

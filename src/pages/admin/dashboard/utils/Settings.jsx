import React from 'react';

const Settings = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Control Panel</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">User Profile Settings</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Select Theme</label>
                    <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Light</option>
                        <option>Dark</option>
                    </select>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Apply</button>
            </div>
        </div>
    );
};

export default Settings;
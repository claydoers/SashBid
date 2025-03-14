'use client';

import React from 'react';

export default function DashboardPreview() {
  // Mock data for demonstration
  const stats = [
    { label: 'Active Projects', value: '8', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ) },
    { label: 'Pending Bids', value: '5', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ) },
    { label: 'Revenue', value: '$78.5k', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) },
    { label: 'Clients', value: '24', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) },
  ];
  
  const recentProjects = [
    { name: 'Oakridge Residence', status: 'In Progress' },
    { name: 'Coastal View Condos', status: 'Pending' },
    { name: 'Maple Street Renovation', status: 'Completed' },
    { name: 'Highland Park Townhomes', status: 'In Progress' },
    { name: 'Riverfront Restaurant', status: 'Completed' },
  ];

  const upcomingBids = [
    { name: 'Sunnyvale Office Complex', dueDate: '10/15/23' },
    { name: 'Westview Shopping Center', dueDate: '10/18/23' },
    { name: 'Cedar Heights Apartments', dueDate: '10/22/23' },
    { name: 'Pinecrest School District', dueDate: '10/30/23' },
  ];

  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-primary-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-lg font-bold">SashBid</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-red-400"></div>
        </div>
      </div>
      
      {/* Sidebar Simulation */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-[40px] bg-gray-800 flex flex-col items-center py-2 space-y-4">
          <div className="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center text-white text-[8px] font-bold">
            SB
          </div>
          <div className="w-5 h-5 rounded bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div className="w-5 h-5 rounded bg-primary-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div className="w-5 h-5 rounded bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="w-5 h-5 rounded bg-gray-700 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="flex-1 p-3 overflow-hidden text-xs bg-gray-50">
          {/* Welcome Header */}
          <div className="bg-primary-700 text-white rounded-lg p-3 mb-3 shadow-md">
            <h2 className="font-bold text-sm">Welcome to SashBid</h2>
            <p className="text-[10px] text-primary-100">Your window and door bidding dashboard</p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm flex items-center">
                <div className="mr-2 bg-primary-50 p-1 rounded-md">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-500 text-[8px]">{stat.label}</p>
                  <p className="font-bold text-gray-800 text-[10px]">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-3">
            {/* Recent Projects */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-primary-50 px-2 py-1 border-b border-gray-200 flex justify-between items-center rounded-t-lg">
                <span className="font-medium text-primary-800 text-[10px]">Recent Projects</span>
                <span className="text-[8px] text-primary-600">View All</span>
              </div>
              <div className="p-1">
                <table className="w-full text-[8px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-1 text-gray-500">Project</th>
                      <th className="text-left p-1 text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProjects.slice(0, 3).map((project, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-1 font-medium text-primary-700">{project.name}</td>
                        <td className="p-1">
                          <span className={`px-1 inline-flex text-[6px] leading-4 font-semibold rounded-full 
                            ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                              project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'}`}>
                            {project.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Upcoming Bids */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-primary-50 px-2 py-1 border-b border-gray-200 flex justify-between items-center rounded-t-lg">
                <span className="font-medium text-primary-800 text-[10px]">Upcoming Bids</span>
                <span className="text-[8px] text-primary-600">View All</span>
              </div>
              <div className="p-1">
                <table className="w-full text-[8px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-1 text-gray-500">Project</th>
                      <th className="text-left p-1 text-gray-500">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcomingBids.slice(0, 3).map((bid, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="p-1 font-medium text-primary-700">{bid.name}</td>
                        <td className="p-1 text-orange-600 font-medium">{bid.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-primary-50 px-2 py-1 border-b border-gray-200 rounded-t-lg">
              <span className="font-medium text-primary-800 text-[10px]">Quick Actions</span>
            </div>
            <div className="p-2 grid grid-cols-3 gap-2">
              <button className="bg-primary-600 text-white rounded px-2 py-1 text-[8px] flex items-center justify-center shadow-sm hover:bg-primary-700 transition-colors">
                <span className="mr-1">+</span> New Project
              </button>
              <button className="bg-primary-600 text-white rounded px-2 py-1 text-[8px] flex items-center justify-center shadow-sm hover:bg-primary-700 transition-colors">
                <span className="mr-1">+</span> Create Bid
              </button>
              <button className="bg-primary-600 text-white rounded px-2 py-1 text-[8px] flex items-center justify-center shadow-sm hover:bg-primary-700 transition-colors">
                <span className="mr-1">+</span> Add Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
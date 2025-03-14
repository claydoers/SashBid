'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Bid {
  id: string;
  projectName: string;
  clientName: string;
  dueDate: string;
  total: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Rejected';
}

export default function BidsPage() {
  // In a real app, this would come from an API
  const [bids, setBids] = useState<Bid[]>([
    {
      id: '1',
      projectName: 'Johnson Residence Windows',
      clientName: 'Robert Johnson',
      dueDate: '2023-10-15',
      total: 12500,
      status: 'Draft',
    },
    {
      id: '2',
      projectName: 'Smith Office Renovation',
      clientName: 'Jane Smith',
      dueDate: '2023-10-18',
      total: 28750,
      status: 'Sent',
    },
    {
      id: '3',
      projectName: 'Lakeside Apartments',
      clientName: 'Lakeside Properties',
      dueDate: '2023-09-30',
      total: 45200,
      status: 'Approved',
    },
    {
      id: '4',
      projectName: 'Thompson Home Windows',
      clientName: 'David Thompson',
      dueDate: '2023-11-05',
      total: 8900,
      status: 'Draft',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filteredBids = bids.filter((bid) => {
    const matchesSearch = 
      bid.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || bid.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Sent':
        return 'bg-blue-100 text-blue-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-primary-700 text-white">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <h1 className="text-3xl font-bold">Manage Your Bids</h1>
          <p className="mt-2 text-primary-100">Create, track, and manage all your project bids in one place</p>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">All Bids</h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bids..."
                  className="form-input pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <select
                className="form-input"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Sent">Sent</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              
              <Link href="/bids/new" className="btn-primary">
                Create New Bid
              </Link>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {filteredBids.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No bids found matching your criteria.
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-primary-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                      Project
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                      Client
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-primary-800 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBids.map((bid) => (
                    <tr key={bid.id} className="hover:bg-primary-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{bid.projectName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{bid.clientName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{bid.dueDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${bid.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(bid.status)}`}>
                          {bid.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/bids/${bid.id}`} className="text-primary-600 hover:text-primary-900 mr-4">
                          View
                        </Link>
                        <Link href={`/bids/${bid.id}/edit`} className="text-primary-600 hover:text-primary-900">
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      
      <section className="w-full py-10 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-2xl font-bold mb-4">Need to create a new bid?</h2>
          <p className="text-gray-600 mb-6">Start the process now and get your proposal to clients faster</p>
          <Link href="/bids/new" className="btn-primary text-lg px-6 py-2">
            Create New Bid
          </Link>
        </div>
      </section>
    </div>
  );
} 
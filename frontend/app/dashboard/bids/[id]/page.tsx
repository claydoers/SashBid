'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BidItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Bid {
  id: string;
  projectName: string;
  clientName: string;
  dueDate: string;
  notes: string;
  items: BidItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Draft' | 'Sent' | 'Approved' | 'Rejected';
  createdAt: string;
  updatedAt: string;
}

export default function BidDetailPage() {
  const params = useParams();
  const bidId = params.id as string;
  
  // In a real app, this would come from an API
  const [bid, setBid] = useState<Bid | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock data for the specific bid
      const mockBid: Bid = {
        id: bidId,
        projectName: 'Johnson Residence Windows',
        clientName: 'Robert Johnson',
        dueDate: '2023-10-15',
        notes: 'Client requested energy efficient windows for the entire house.',
        items: [
          {
            id: '1',
            description: 'Double-Hung Window (36" x 60")',
            quantity: 8,
            unitPrice: 450,
            total: 3600,
          },
          {
            id: '2',
            description: 'Picture Window (48" x 72")',
            quantity: 2,
            unitPrice: 650,
            total: 1300,
          },
          {
            id: '3',
            description: 'Casement Window (24" x 36")',
            quantity: 4,
            unitPrice: 350,
            total: 1400,
          },
          {
            id: '4',
            description: 'Installation Labor',
            quantity: 40,
            unitPrice: 75,
            total: 3000,
          },
          {
            id: '5',
            description: 'Removal and Disposal of Old Windows',
            quantity: 1,
            unitPrice: 1200,
            total: 1200,
          },
        ],
        subtotal: 10500,
        tax: 2000,
        total: 12500,
        status: 'Draft',
        createdAt: '2023-09-20T14:30:00Z',
        updatedAt: '2023-09-22T10:15:00Z',
      };
      
      setBid(mockBid);
      setLoading(false);
    }, 1000);
  }, [bidId]);
  
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bid details...</p>
        </div>
      </div>
    );
  }
  
  if (!bid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bid Not Found</h2>
          <p className="text-gray-600 mb-6">The bid you're looking for doesn't exist or has been removed.</p>
          <Link href="/bids" className="btn-primary">
            Back to Bids
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-primary-700 text-white">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{bid.projectName}</h1>
              <p className="text-primary-100 mt-2">Bid #{bid.id}</p>
            </div>
            <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
              <Link href={`/bids/${bid.id}/edit`} className="btn-secondary">
                Edit Bid
              </Link>
              <button className="btn-primary">
                Generate PDF
              </button>
              <button className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-primary-700 transition-colors">
                Send to Client
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl">
        {/* Bid Overview */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">Bid Overview</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Client</h3>
                <p className="mt-1 text-base text-gray-900">{bid.clientName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                <p className="mt-1 text-base text-gray-900">{bid.dueDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(bid.status)}`}>
                    {bid.status}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created</h3>
                <p className="mt-1 text-base text-gray-900">
                  {new Date(bid.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                <p className="mt-1 text-base text-gray-900">
                  {new Date(bid.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                <p className="mt-1 text-base font-bold text-primary-700">
                  ${bid.total.toLocaleString()}
                </p>
              </div>
            </div>
            
            {bid.notes && (
              <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                <h3 className="text-sm font-medium text-primary-800">Notes</h3>
                <p className="mt-1 text-base text-gray-900">{bid.notes}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Bid Items */}
        <div className="bg-white rounded-lg shadow-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">Bid Items</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-primary-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-800 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bid.items.map((item) => (
                  <tr key={item.id} className="hover:bg-primary-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{item.quantity}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">${item.unitPrice.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                    Subtotal
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${bid.subtotal.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                    Tax
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${bid.tax.toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-primary-50">
                  <td colSpan={3} className="px-6 py-4 text-base font-bold text-primary-800 text-right">
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-bold text-primary-800">
                    ${bid.total.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </main>
      
      <section className="w-full py-10 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to finalize this bid?</h2>
          <p className="text-gray-600 mb-6">Generate a PDF and send it to your client with just a few clicks</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="btn-primary text-lg px-6 py-2">
              Generate PDF
            </button>
            <button className="btn-secondary text-lg px-6 py-2">
              Send to Client
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 
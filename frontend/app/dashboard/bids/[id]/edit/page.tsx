'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import BidForm from '@/components/BidForm';

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
  clientId: string;
  dueDate: string;
  notes: string;
  items: BidItem[];
}

export default function EditBidPage() {
  const params = useParams();
  const router = useRouter();
  const bidId = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [bid, setBid] = useState<Bid | null>(null);
  
  // Mock clients data - in a real app, this would come from an API
  const clients = [
    { id: '1', name: 'Robert Johnson' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Lakeside Properties' },
    { id: '4', name: 'David Thompson' },
    { id: '5', name: 'Urban Developments' },
  ];
  
  useEffect(() => {
    // Simulate API call to fetch the bid
    setTimeout(() => {
      // Mock data for the specific bid
      const mockBid: Bid = {
        id: bidId,
        projectName: 'Johnson Residence Windows',
        clientId: '1', // Robert Johnson
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
      };
      
      setBid(mockBid);
      setLoading(false);
    }, 1000);
  }, [bidId]);
  
  const handleSubmit = (data: any) => {
    // In a real app, this would send the data to an API
    console.log('Updating bid:', data);
    
    // Simulate API call delay
    setTimeout(() => {
      // Redirect to the bid detail page after "saving"
      router.push(`/bids/${bidId}`);
    }, 1000);
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Edit Bid</h1>
              <p className="mt-2 text-primary-100">Make changes to your bid for {bid.projectName}</p>
            </div>
            <Link href={`/bids/${bidId}`} className="mt-4 md:mt-0 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-primary-700 transition-colors">
              Back to Bid
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <BidForm 
            initialData={bid}
            clients={clients} 
            onSubmit={handleSubmit} 
          />
          
          <div className="mt-8 flex justify-end space-x-4">
            <Link href={`/bids/${bidId}`} className="btn-secondary">
              Cancel
            </Link>
            <button 
              type="submit"
              form="bid-form" // This matches the form id in BidForm
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
      
      <section className="w-full py-10 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-2xl font-bold mb-4">Need to make more substantial changes?</h2>
          <p className="text-gray-600 mb-6">Consider creating a new version of this bid instead of editing the current one</p>
          <Link href={`/bids/duplicate/${bidId}`} className="btn-secondary text-lg px-6 py-2">
            Duplicate Bid
          </Link>
        </div>
      </section>
    </div>
  );
} 
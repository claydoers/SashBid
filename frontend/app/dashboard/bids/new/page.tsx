'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BidForm from '@/components/BidForm';

export default function NewBidPage() {
  const router = useRouter();
  
  // Mock clients data - in a real app, this would come from an API
  const clients = [
    { id: '1', name: 'Robert Johnson' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Lakeside Properties' },
    { id: '4', name: 'David Thompson' },
    { id: '5', name: 'Urban Developments' },
  ];
  
  const handleSubmit = (data: any) => {
    // In a real app, this would send the data to an API
    console.log('Submitting bid:', data);
    
    // Simulate API call delay
    setTimeout(() => {
      // Redirect to the bids list page after "saving"
      router.push('/bids');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full bg-primary-700 text-white">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Create New Bid</h1>
              <p className="mt-2 text-primary-100">Fill out the form below to create a new project bid</p>
            </div>
            <Link href="/bids" className="mt-4 md:mt-0 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-primary-700 transition-colors">
              Back to Bids
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-6 py-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <BidForm 
            clients={clients} 
            onSubmit={handleSubmit} 
          />
          
          <div className="mt-8 flex justify-end space-x-4">
            <Link href="/bids" className="btn-secondary">
              Cancel
            </Link>
            <button 
              type="submit"
              form="bid-form" // This matches the form id in BidForm
              className="btn-primary"
            >
              Create Bid
            </button>
          </div>
        </div>
      </main>
      
      <section className="w-full py-10 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-2xl font-bold mb-4">Need help creating your bid?</h2>
          <p className="text-gray-600 mb-6">Our comprehensive guide can help you create effective bids that win more projects</p>
          <Link href="/resources/bidding-guide" className="btn-secondary text-lg px-6 py-2">
            View Bidding Guide
          </Link>
        </div>
      </section>
    </div>
  );
} 
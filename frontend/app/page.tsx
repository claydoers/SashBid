'use client';

import Link from 'next/link';
import Image from 'next/image';
import DashboardPreview from '@/components/DashboardPreview';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full bg-primary-700 text-white">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <nav className="flex justify-between items-center mb-16">
            <div>
              <Image 
                src="/images/logo/sashbid-logo.png" 
                alt="SashBid Logo" 
                width={150} 
                height={50} 
                className="h-10 w-auto"
              />
            </div>
            <div className="space-x-4">
              <Link href="/login" className="btn-secondary">
                Login
              </Link>
              <Link href="/register" className="btn-primary">
                Register
              </Link>
            </div>
          </nav>
          
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Streamline Your Bidding Process
              </h1>
              <p className="text-xl mb-8">
                Create professional bids, manage projects, and grow your door and window business with our comprehensive bidding solution.
              </p>
              <div className="flex space-x-4">
                <Link href="/register" className="btn-primary">
                  Get Started
                </Link>
                <Link href="/demo" className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-primary-700 transition-colors">
                  Watch Demo
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md h-96 relative">
                {/* Dashboard Preview Component */}
                {isMounted && <DashboardPreview />}
                {!isMounted && (
                  <div className="w-full h-full bg-white rounded-lg shadow-lg flex items-center justify-center">
                    <div className="text-primary-700">Loading dashboard preview...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <section className="w-full py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Management</h3>
              <p className="text-gray-600">
                Create and track different bidding projects with ease. Organize your work and never miss a deadline.
              </p>
            </div>
            
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Calculation</h3>
              <p className="text-gray-600">
                Automatically calculate material and labor costs with precision. Generate accurate bids every time.
              </p>
            </div>
            
            <div className="card">
              <div className="h-12 w-12 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Management</h3>
              <p className="text-gray-600">
                Store client information and communication history. Build stronger relationships with your customers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to streamline your bidding process?</h2>
          <Link href="/register" className="btn-primary text-lg px-8 py-3">
            Get Started Today
          </Link>
        </div>
      </section>
      
      <footer className="w-full bg-secondary-800 text-white py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SashBid</h3>
              <p className="text-secondary-300">
                A comprehensive solution for door and window companies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><Link href="/features/projects" className="text-secondary-300 hover:text-white">Project Management</Link></li>
                <li><Link href="/features/inventory" className="text-secondary-300 hover:text-white">Inventory Management</Link></li>
                <li><Link href="/features/bids" className="text-secondary-300 hover:text-white">Bid Generation</Link></li>
                <li><Link href="/features/clients" className="text-secondary-300 hover:text-white">Client Management</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/resources/documentation" className="text-secondary-300 hover:text-white">Documentation</Link></li>
                <li><Link href="/resources/tutorials" className="text-secondary-300 hover:text-white">Tutorials</Link></li>
                <li><Link href="/resources/faq" className="text-secondary-300 hover:text-white">FAQ</Link></li>
                <li><Link href="/resources/support" className="text-secondary-300 hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-secondary-300">Email: info@sashbid.com</li>
                <li className="text-secondary-300">Phone: (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
            &copy; {new Date().getFullYear()} SashBid. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
} 
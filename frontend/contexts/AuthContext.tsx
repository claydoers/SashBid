'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const userData = localStorage.getItem('user');
      
      if (authStatus === 'true' && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Redirect unauthenticated users away from protected routes
  useEffect(() => {
    if (!loading) {
      const protectedRoutes = ['/dashboard', '/bids', '/clients', '/inventory', '/projects'];
      const isProtectedRoute = protectedRoutes.some(route => 
        pathname === route || pathname?.startsWith(`${route}/`)
      );
      
      if (isProtectedRoute && !isAuthenticated) {
        router.push('/login');
      }
      
      // Redirect authenticated users away from auth pages
      const authRoutes = ['/login', '/register'];
      if (authRoutes.includes(pathname || '') && isAuthenticated) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, loading, pathname, router]);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simple authentication logic
    // In a real app, this would be an API call to your backend
    if (username === 'Clay' && password === 'Test123') {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData: User = {
        username: 'Clay',
        name: 'Clay Johnson',
        role: 'Admin'
      };
      
      // Store auth state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 
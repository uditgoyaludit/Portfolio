import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface Visit {
  id: string;
  ip_address: string;
  created_at: string;
}

export function Admin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [showVisits, setShowVisits] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email: 'uditgoyaludit0@gmail.com',
        password: password
      });
      if (error) throw error;
      if (session) {
        setIsAuthenticated(true);
        fetchMessages();
        fetchVisits();
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid password');
    }
  };

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchVisits() {
    try {
      const { data, error } = await supabase
        .from('visits')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setVisits(data || []);
    } catch (error) {
      console.error('Error fetching visits:', error);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Admin Access</h2>
            <p className="mt-2 text-gray-600">Please enter your password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-600 focus:ring-0"
                placeholder="Enter admin password"
              />
            </div>
            {error && <div className="text-red-600 text-center text-sm">{error}</div>}
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-xl text-blue-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
        <button 
          onClick={() => supabase.auth.signOut() && setIsAuthenticated(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div 
        className="bg-white p-6 rounded-lg border-2 border-gray-100 hover:border-blue-600 transition-all cursor-pointer mb-8"
        onClick={() => setShowVisits(!showVisits)}
      >
        <h3 className="text-xl font-bold text-gray-900">Total Visits: {visits.length}</h3>
      </div>

      {showVisits && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {visits.map((visit) => (
            <div key={visit.id} className="p-4 border-2 border-gray-100 rounded-lg bg-white">
              <p className="text-gray-900">IP: {visit.ip_address}</p>
              <p className="text-gray-600 text-sm">
                {new Date(visit.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-900 mb-6">Messages</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((message) => (
          <div key={message.id} className="p-6 border-2 border-gray-100 rounded-lg bg-white">
            <h4 className="text-xl font-bold text-gray-900">{message.name}</h4>
            <p className="text-blue-600 mb-2">{message.email}</p>
            <p className="text-gray-600">{message.message}</p>
            <p className="text-sm text-gray-500 mt-4">
              {new Date(message.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="col-span-full text-center text-gray-600">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
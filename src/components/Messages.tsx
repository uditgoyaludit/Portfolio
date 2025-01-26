import React, { useEffect, useState } from 'react';
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
  visited_at: string;
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [visits, setVisits] = useState<Visit[]>([]);
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
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-8">
          <h2 className="text-center text-3xl font-extrabold text-white">Admin Access Required</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border bg-black/20 placeholder-gray-500 text-white"
              placeholder="Enter admin password"
            />
            {error && <div className="text-red-400 text-center text-sm">{error}</div>}
            <button type="submit" className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white">Access</button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="text-xl text-purple-400 text-center">Loading messages...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Admin</h2>
        <button onClick={() => supabase.auth.signOut() && setIsAuthenticated(false)} className="bg-purple-600 text-white px-4 py-2 rounded-lg">Sign Out</button>
      </div>
      <div className="bg-black/20 p-6 rounded-lg border border-purple-500/30 mb-6 cursor-pointer hover:border-purple-500 transition-all"
           onClick={() => setShowVisits(!showVisits)}>
        <h3 className="text-xl font-semibold text-white">Total Visits: {visits.length}</h3>
      </div>
      {showVisits && (
        <div className="space-y-4">
          {visits.map((visit) => (
            <div key={visit.id} className="p-4 border border-purple-500/30 rounded-lg bg-black/20">
              <p className="text-gray-400">IP: {visit.ip_address}</p>
              <p className="text-gray-500">Visited at: {new Date(visit.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
      <h3 className="text-2xl font-bold">Messages</h3>
      <br></br>
      <div className="space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="p-6 border border-purple-500/30 bg-black/20 rounded-lg">
            <h3 className="text-xl font-semibold">{message.name}</h3>
            <p className="text-gray-400">{message.email}</p>
            <p className="text-gray-300">{message.message}</p>
            <p className="text-sm text-gray-400">{new Date(message.created_at).toLocaleDateString()}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center text-gray-400">No messages yet.</p>}
      </div>
    </div>
  );
}

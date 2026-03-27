'use client';

import React, { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';

export default function LoyaltySignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/loyalty/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed. Please try again.');
      }

      window.location.href = `/loyalty/${data.member.code}`;
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 max-w-md mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-xl font-bold text-slate-100">Join the Program</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="loyalty-name" className="block text-sm font-medium text-slate-300 mb-1.5">
            Full Name
          </label>
          <input
            id="loyalty-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-lg placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>

        <div>
          <label htmlFor="loyalty-email" className="block text-sm font-medium text-slate-300 mb-1.5">
            Email Address
          </label>
          <input
            id="loyalty-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-slate-800 text-white border border-slate-700 rounded-lg placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-6 bg-accent text-slate-900 font-bold rounded-lg hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Join Rewards Program
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-slate-500 mt-4 text-center">
        Already a member? Enter your email and we&apos;ll find your account.
      </p>
    </div>
  );
}

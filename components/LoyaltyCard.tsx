'use client';

import React from 'react';
import { Award, Download, Smartphone, Star, Trophy, Sparkles } from 'lucide-react';
import QRCodeDisplay from './QRCodeDisplay';

interface LoyaltyCardProps {
  name: string;
  email: string;
  code: string;
  punches: number;
  freeSessionsEarned: number;
}

export default function LoyaltyCard({ name, email, code, punches, freeSessionsEarned }: LoyaltyCardProps) {
  const totalSlots = 10;
  const justEarnedFree = punches === 0 && freeSessionsEarned > 0;

  return (
    <div className="max-w-lg mx-auto">
      {/* Celebration Banner */}
      {justEarnedFree && (
        <div className="bg-accent/20 border border-accent/40 rounded-2xl p-6 mb-6 text-center animate-pulse">
          <Sparkles className="w-10 h-10 text-accent mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-accent mb-1">FREE SESSION!</h2>
          <p className="text-slate-300">
            Congratulations! You&apos;ve earned a free tutoring session!
          </p>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl shadow-accent/5 overflow-hidden">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-accent/20 to-cyan-600/10 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-100">BestTutor Rewards</h3>
                <p className="text-xs text-slate-400">Loyalty Punch Card</p>
              </div>
            </div>
            <Star className="w-6 h-6 text-accent" />
          </div>
        </div>

        {/* Member Info */}
        <div className="px-6 pt-5 pb-3">
          <p className="text-slate-100 font-semibold text-lg">{name}</p>
          <p className="text-slate-400 text-sm">{email}</p>
        </div>

        {/* Punch Grid */}
        <div className="px-6 py-4">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 font-medium">
            Session Progress — {punches}/{totalSlots}
          </p>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: totalSlots }).map((_, i) => {
              const isFilled = i < punches;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-full flex items-center justify-center border-2 transition-all ${
                    isFilled
                      ? 'bg-accent/20 border-accent shadow-lg shadow-accent/20'
                      : 'bg-slate-900/50 border-slate-600'
                  }`}
                >
                  {isFilled ? (
                    <Star className="w-5 h-5 text-accent fill-accent" />
                  ) : (
                    <span className="text-slate-600 text-xs font-medium">{i + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-slate-400 mt-3">
            {punches === 0 && freeSessionsEarned === 0
              ? 'Start attending sessions to earn stamps!'
              : punches === 0 && freeSessionsEarned > 0
              ? 'Card reset — keep going for another free session!'
              : `${totalSlots - punches} more session${totalSlots - punches === 1 ? '' : 's'} until your next free session!`}
          </p>
        </div>

        {/* Free Sessions Counter */}
        <div className="mx-6 bg-slate-900/60 rounded-xl px-4 py-3 flex items-center justify-between border border-slate-700/50">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-sm text-slate-300">Free sessions earned</span>
          </div>
          <span className="text-xl font-bold text-accent">{freeSessionsEarned}</span>
        </div>

        {/* QR Code Section */}
        <div className="px-6 py-6 flex justify-center">
          <QRCodeDisplay value={code} size={180} />
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 space-y-3">
          <a
            href={`/api/loyalty/wallet?code=${encodeURIComponent(code)}`}
            className="w-full py-3 px-6 bg-slate-900 text-slate-100 font-semibold rounded-xl border border-slate-600 hover:border-accent/50 hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Smartphone className="w-5 h-5" />
            Add to Apple Wallet
          </a>
          <button
            type="button"
            onClick={() => {
              // Simple approach: print the card
              window.print();
            }}
            className="w-full py-3 px-6 bg-accent/10 text-accent font-semibold rounded-xl border border-accent/30 hover:bg-accent/20 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Save QR Card
          </button>
        </div>
      </div>
    </div>
  );
}

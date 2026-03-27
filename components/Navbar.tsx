'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                Best<span className="text-accent">Tutor</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-slate-300 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
              <Link href="/services" className="text-slate-300 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</Link>
              <Link href="/about" className="text-slate-300 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">About</Link>
              <Link href="/faq" className="text-slate-300 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">FAQ</Link>
              <Link href="/loyalty" className="text-slate-300 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Loyalty</Link>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>Services</Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/faq" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>FAQ</Link>
            <Link href="/loyalty" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-slate-800 transition-colors" onClick={() => setIsOpen(false)}>Loyalty</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

import React from 'react'
import Link from 'next/link'
import { GraduationCap, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-accent" />
            <span className="text-xl font-bold tracking-tight text-white uppercase">
              Best<span className="text-accent">Tutor</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Empowering students with high-tech academic support and personalized learning strategies for the digital age.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Explore</h3>
          <ul className="space-y-4 text-sm">
            <li><Link href="/" className="text-slate-400 hover:text-accent transition-colors">Home</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-accent transition-colors">Services</Link></li>
            <li><Link href="/about" className="text-slate-400 hover:text-accent transition-colors">About</Link></li>
            <li><Link href="/faq" className="text-slate-400 hover:text-accent transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="text-slate-400">Email: hello@besttutor.edu</li>
            <li className="text-slate-400">Phone: +1 (555) 123-4567</li>
            <li className="text-slate-400">Location: Silicon Valley, CA</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-6">Connect</h3>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-accent transition-colors group">
              <Twitter className="h-5 w-5 text-slate-400 group-hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-accent transition-colors group">
              <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-white" />
            </a>
            <a href="#" className="p-2 bg-slate-900 rounded-lg hover:bg-accent transition-colors group">
              <Github className="h-5 w-5 text-slate-400 group-hover:text-white" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4">
        <p>© {currentYear} BestTutor. All rights reserved.</p>
        <div className="flex space-x-8">
          <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-slate-300 transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}

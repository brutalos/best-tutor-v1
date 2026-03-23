import React from 'react'
import FAQAccordion from '@/components/FAQAccordion'
import { HelpCircle, Mail, MessageCircle } from 'lucide-react'

export default function FAQPage() {
  return (
    <div className="bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Frequently Asked <span className="text-accent">Questions</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Need help? Check out our most frequently asked questions or contact our support team.
        </p>
      </div>

      <FAQAccordion />

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center bg-slate-950/50 p-12 rounded-3xl border border-slate-900">
        <div className="space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white">Email Us</h3>
          <p className="text-slate-500 text-sm">support@besttutor.edu</p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white">Live Chat</h3>
          <p className="text-slate-500 text-sm">Mon - Fri: 9am - 6pm EST</p>
        </div>
        <div className="space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-xl font-bold text-white">Help Center</h3>
          <p className="text-slate-500 text-sm">docs.besttutor.edu</p>
        </div>
      </div>
    </div>
  )
}

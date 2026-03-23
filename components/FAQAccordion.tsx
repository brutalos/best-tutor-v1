'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "How do I book a tutoring session?",
    answer: "You can book a session through our website by selecting your subject and tutor, then choosing an available time slot. We'll send you a confirmation email with all the details."
  },
  {
    question: "What subjects do you cover?",
    answer: "We cover a wide range of subjects including Mathematics (SAT/ACT, Calculus, Statistics), Computer Science (Python, Java, Web Dev), Sciences (Physics, Chemistry, Biology), and Humanities (English, History, Languages)."
  },
  {
    question: "Are the sessions online or in-person?",
    answer: "We offer both online and in-person sessions. Our online sessions utilize advanced collaborative tools to ensure a high-quality learning experience, while in-person sessions are available at our regional centers."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 24 hours' notice for cancellations. If you cancel within 24 hours, you may be charged a partial fee. Please contact our support team for more details."
  },
  {
    question: "How are tutors vetted?",
    answer: "Every tutor at BestTutor goes through a rigorous vetting process, including subject-specific testing, pedagogical training, and comprehensive background checks."
  },
  {
    question: "Do you offer group tutoring sessions?",
    answer: "Yes, we offer small group tutoring (2-5 students) for specific subjects. This is a great way to learn with peers while still getting personalized attention."
  }
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-slate-800/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-accent/30 transition-colors">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
          >
            <span className="text-lg font-bold text-white pr-8">{faq.question}</span>
            {openIndex === i ? (
              <Minus className="h-5 w-5 text-accent flex-shrink-0" />
            ) : (
              <Plus className="h-5 w-5 text-slate-500 flex-shrink-0" />
            )}
          </button>
          {openIndex === i && (
            <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

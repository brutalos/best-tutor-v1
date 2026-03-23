import React from 'react'
import { CheckCircle2, Zap, Brain, Code, Globe, Shield } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      icon: Brain,
      title: "SAT/ACT Prep",
      desc: "Advanced test-taking strategies and content mastery for elite scores.",
      features: ["Personalized Study Plan", "Real Practice Tests", "Score Analytics"]
    },
    {
      icon: Code,
      title: "Computer Science",
      desc: "Python, Java, and Web Development for high school and college students.",
      features: ["Project-Based Learning", "Code Reviews", "System Architecture"]
    },
    {
      icon: Zap,
      title: "STEM Acceleration",
      desc: "Calculus, Physics, and Chemistry simplified through modern pedagogy.",
      features: ["Conceptual Deep Dives", "Problem Solving Sets", "Visual Aids"]
    },
    {
      icon: Globe,
      title: "Language Mastery",
      desc: "Fluent communication and academic writing in multiple languages.",
      features: ["Native Speakers", "Grammar Precision", "Conversational Skills"]
    },
    {
      icon: Shield,
      title: "Academic Coaching",
      desc: "Time management, organization, and executive function coaching.",
      features: ["Task Management", "Goal Setting", "Focus Training"]
    },
    {
      icon: CheckCircle2,
      title: "Essay Review",
      desc: "Polishing college applications and academic papers for maximum impact.",
      features: ["Draft Feedback", "Structural Analysis", "Voice Refinement"]
    }
  ]

  return (
    <div className="bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Our <span className="text-accent">Services</span></h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          We offer a comprehensive suite of academic support services designed for the modern learner.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <div key={i} className="bg-slate-800/50 border border-slate-800 rounded-3xl p-8 hover:border-accent/30 transition-all hover:bg-slate-800/80 group">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <service.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{service.title}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{service.desc}</p>
            <ul className="space-y-3">
              {service.features.map((feature, j) => (
                <li key={j} className="flex items-center space-x-2 text-slate-300 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent/60" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-24 p-12 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-slate-800 to-slate-900 border border-accent/20 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to accelerate your learning?</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
          Contact our academic advisors today to build your personalized learning roadmap.
        </p>
        <button className="px-8 py-4 bg-accent text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-accent/20">
          Book a Consultation
        </button>
      </div>
    </div>
  )
}

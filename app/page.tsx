import React from 'react'
import { ArrowRight, Brain, Zap, Target, BookOpen } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-slate-900">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[180px] rounded-full" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-semibold text-accent mb-8">
            <Zap className="h-4 w-4 fill-accent" />
            <span>ENHANCED LEARNING 2026</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
            Master Every Subject with <span className="text-accent underline decoration-accent/30 underline-offset-8">Precision</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            BestTutor combines academic excellence with high-tech pedagogical tools to deliver personalized learning that sticks. Fast-track your education today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/services" 
              className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent/90 text-slate-900 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,210,255,0.3)] flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/about" 
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Brain,
              title: "Cognitive Strategies",
              desc: "Tailored learning plans that align with your unique cognitive profile and goals."
            },
            {
              icon: Target,
              title: "Focused Results",
              desc: "Accelerated progress through data-driven tracking and targeted academic intervention."
            },
            {
              icon: BookOpen,
              title: "Advanced Materials",
              desc: "Access to our curated digital library and high-tech academic resources."
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-slate-800/40 border border-slate-800 hover:border-accent/50 transition-all hover:-translate-y-2 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Image Section */}
      <section className="py-20 bg-slate-950/50 border-y border-slate-900 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Academic Support for the <span className="text-accent">Next Generation</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                We believe that modern students deserve modern tools. Our platform integrates seamless tutoring sessions with collaborative digital workspaces designed for maximum productivity.
              </p>
              <ul className="space-y-4">
                {[
                  "One-on-one expert guidance",
                  "24/7 Digital resource access",
                  "Personalized academic roadmaps",
                  "Modern tech stack integration"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-slate-300">
                    <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <Zap className="h-3 w-3 text-accent fill-accent" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-accent/10 blur-[100px] rounded-full" />
              <img 
                src="/images/academic-showcase.png" 
                alt="Modern academic learning" 
                className="relative rounded-3xl border border-slate-800 shadow-2xl z-10 w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import React from 'react'
import { GraduationCap, Users, History, Award } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { label: "Students Helped", value: "10,000+", icon: Users },
    { label: "Expert Tutors", value: "250+", icon: GraduationCap },
    { label: "Years Experience", value: "12+", icon: History },
    { label: "Success Rate", value: "98%", icon: Award }
  ]

  return (
    <div className="bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
        <div className="flex-1 space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Our Mission is to <span className="text-accent underline decoration-accent/30 underline-offset-8">Empower</span> Modern Students
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Founded in 2014, BestTutor has grown from a local tutoring service into a premier academic support platform. We combine traditional academic rigor with modern pedagogical technology to help students thrive in an increasingly digital world.
          </p>
          <div className="grid grid-cols-2 gap-8 py-8 border-y border-slate-800">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center space-x-2 text-accent">
                  <stat.icon className="h-5 w-5" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full" />
          <img 
            src="/images/about-team.png" 
            alt="BestTutor team and methodology" 
            className="relative rounded-3xl border border-slate-800 shadow-2xl z-10 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-24 bg-slate-950/50 rounded-3xl px-12 border border-slate-900">
        {[
          {
            title: "Expertise First",
            desc: "Our tutors are subject matter experts with degrees from top-tier universities and years of pedagogical experience."
          },
          {
            title: "Tech-Forward",
            desc: "We utilize cutting-edge learning management systems and collaborative tools to enhance the tutoring experience."
          },
          {
            title: "Student-Centric",
            desc: "Every student's journey is unique. We tailor our methods to match individual learning styles and academic goals."
          }
        ].map((item, i) => (
          <div key={i} className="space-y-4">
            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
      
      {/* Team Section Placeholder */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold text-white mb-16">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="group">
              <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square bg-slate-800 border border-slate-700 group-hover:border-accent/50 transition-colors">
                 <img src={`/images/team-member-${n}.png`} alt={`Team Member ${n}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
              </div>
              <h4 className="text-white font-bold group-hover:text-accent transition-colors">Director {n}</h4>
              <p className="text-slate-500 text-sm uppercase tracking-tighter">Academic Lead</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

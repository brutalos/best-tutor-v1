'use client'

import React, { useState, useEffect } from 'react'
import LoyaltyCard from './LoyaltyCard'
import { Loader2, AlertCircle } from 'lucide-react'

interface MemberData {
  name: string
  email: string
  code: string
  punches: number
  freeSessionsEarned: number
}

export default function LoyaltyCardWrapper({ code }: { code: string }) {
  const [member, setMember] = useState<MemberData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMember() {
      try {
        const res = await fetch(`/api/loyalty/${code}`)
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Member not found')
          return
        }
        setMember(data.member)
      } catch {
        setError('Failed to load loyalty card')
      } finally {
        setLoading(false)
      }
    }
    fetchMember()
  }, [code])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="h-10 w-10 text-accent animate-spin" />
        <p className="mt-4 text-slate-400">Loading your loyalty card...</p>
      </div>
    )
  }

  if (error || !member) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Card Not Found</h2>
        <p className="text-slate-400">{error || 'This loyalty code does not exist.'}</p>
        <a
          href="/loyalty"
          className="mt-6 inline-flex items-center px-6 py-3 bg-accent text-slate-900 font-bold rounded-xl hover:bg-accent/90 transition-colors"
        >
          Sign Up for Loyalty
        </a>
      </div>
    )
  }

  return (
    <LoyaltyCard
      name={member.name}
      email={member.email}
      code={member.code}
      punches={member.punches}
      freeSessionsEarned={member.freeSessionsEarned}
    />
  )
}

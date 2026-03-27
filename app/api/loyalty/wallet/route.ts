import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Code query parameter is required' },
        { status: 400 }
      )
    }

    const member = await prisma.loyaltyMember.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!member) {
      return NextResponse.json(
        { success: false, error: 'Member not found' },
        { status: 404 }
      )
    }

    const punchesRemaining = 10 - member.punches

    return NextResponse.json({
      success: true,
      pass: {
        formatVersion: 1,
        organizationName: 'BestTutor',
        description: 'BestTutor Loyalty Punch Card',
        serialNumber: member.code,
        memberName: member.name,
        memberEmail: member.email,
        punches: member.punches,
        maxPunches: 10,
        punchesRemaining,
        freeSessionsEarned: member.freeSessionsEarned,
        memberSince: member.createdAt,
        barcode: {
          format: 'QR',
          message: member.code,
          messageEncoding: 'iso-8859-1',
        },
        colors: {
          background: '#0a1628',
          foreground: '#22d3ee',
          label: '#94a3b8',
        },
      },
    })
  } catch (error) {
    console.error('Loyalty wallet error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate wallet pass data' },
      { status: 500 }
    )
  }
}

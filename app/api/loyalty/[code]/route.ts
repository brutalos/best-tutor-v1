import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params

    if (!code) {
      return NextResponse.json(
        { success: false, error: 'Code is required' },
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

    return NextResponse.json({
      success: true,
      member: {
        name: member.name,
        email: member.email,
        code: member.code,
        punches: member.punches,
        freeSessionsEarned: member.freeSessionsEarned,
        createdAt: member.createdAt,
      },
    })
  } catch (error) {
    console.error('Loyalty lookup error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to look up member' },
      { status: 500 }
    )
  }
}

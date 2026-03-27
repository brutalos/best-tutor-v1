import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code, pin } = body

    if (!code || !pin) {
      return NextResponse.json(
        { success: false, error: 'Code and PIN are required' },
        { status: 400 }
      )
    }

    const staffPin = process.env.STAFF_PIN || '1234'
    if (pin !== staffPin) {
      return NextResponse.json(
        { success: false, error: 'Invalid staff PIN' },
        { status: 403 }
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

    let newPunches = member.punches + 1
    let newFreeSessions = member.freeSessionsEarned
    let freeSessionEarned = false

    if (newPunches >= 10) {
      newPunches = 0
      newFreeSessions += 1
      freeSessionEarned = true
    }

    const updatedMember = await prisma.loyaltyMember.update({
      where: { code: code.toUpperCase() },
      data: {
        punches: newPunches,
        freeSessionsEarned: newFreeSessions,
      },
    })

    await prisma.punchLog.create({
      data: {
        memberId: updatedMember.id,
        punchNumber: freeSessionEarned ? 10 : newPunches,
      },
    })

    return NextResponse.json({
      success: true,
      member: {
        name: updatedMember.name,
        code: updatedMember.code,
        punches: updatedMember.punches,
        freeSessionsEarned: updatedMember.freeSessionsEarned,
      },
      freeSessionEarned,
    })
  } catch (error) {
    console.error('Loyalty punch error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to record punch' },
      { status: 500 }
    )
  }
}

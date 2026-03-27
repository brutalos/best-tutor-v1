import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const trimmedEmail = email.trim().toLowerCase()
    const trimmedName = name.trim()

    // Check if email already exists — return existing member
    const existing = await prisma.loyaltyMember.findUnique({
      where: { email: trimmedEmail },
    })

    if (existing) {
      return NextResponse.json({
        success: true,
        member: {
          name: existing.name,
          email: existing.email,
          code: existing.code,
          punches: existing.punches,
        },
      })
    }

    // Generate a unique code
    let code = generateCode()
    let codeExists = await prisma.loyaltyMember.findUnique({ where: { code } })
    while (codeExists) {
      code = generateCode()
      codeExists = await prisma.loyaltyMember.findUnique({ where: { code } })
    }

    const member = await prisma.loyaltyMember.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        code,
      },
    })

    return NextResponse.json({
      success: true,
      member: {
        name: member.name,
        email: member.email,
        code: member.code,
        punches: member.punches,
      },
    })
  } catch (error) {
    console.error('Loyalty register error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register loyalty member' },
      { status: 500 }
    )
  }
}

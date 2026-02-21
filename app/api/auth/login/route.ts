import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Mock authentication - replace with real auth logic
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Simulate successful login
    const user = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: null,
      createdAt: new Date().toISOString(),
    }

    const token = `mock_token_${Date.now()}`

    return NextResponse.json({
      user,
      token,
      expiresIn: 3600,
    })
  } catch (error) {
    console.error('[v0] Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

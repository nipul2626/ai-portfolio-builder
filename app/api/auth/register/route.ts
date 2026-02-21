import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, name } = body

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Mock registration - replace with real database logic
    const user = {
      id: Date.now().toString(),
      email,
      name,
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
    console.error('[v0] Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

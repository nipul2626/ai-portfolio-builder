import { NextRequest, NextResponse } from 'next/server'

// Mock data storage
const mockPortfolios = new Map()

export async function GET(request: NextRequest) {
  try {
    // In a real app, get user ID from auth token
    const userId = '1'

    const portfolios = Array.from(mockPortfolios.values()).filter(
      (p: any) => p.userId === userId
    )

    return NextResponse.json({ portfolios })
  } catch (error) {
    console.error('[v0] Get portfolios error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, templateId, settings } = body

    // In a real app, get user ID from auth token
    const userId = '1'

    const portfolio = {
      id: Date.now().toString(),
      userId,
      name,
      templateId,
      settings: settings || {},
      content: {},
      metadata: {
        title: name,
        description: '',
        keywords: [],
      },
      theme: {
        colors: {
          primary: '#06b6d4',
          secondary: '#8b5cf6',
          background: '#0a0a0a',
          text: '#ffffff',
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
        },
      },
      published: false,
      customDomain: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockPortfolios.set(portfolio.id, portfolio)

    return NextResponse.json({ portfolio }, { status: 201 })
  } catch (error) {
    console.error('[v0] Create portfolio error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

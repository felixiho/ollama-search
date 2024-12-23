import { NextResponse } from 'next/server'
import { TAVILY_URL } from './constants'
import { getServerConfig } from '@/config/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { query } = body

        const { TAVILY_API_KEY } = getServerConfig()
        const response = await fetch(`${TAVILY_URL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_key: TAVILY_API_KEY,
                query: query,
                include_raw_content: true,
                max_results: 3
            }),
        })

        const data = await response.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
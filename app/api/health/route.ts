import { NextResponse } from 'next/server';

/**
 * Simple health check endpoint to verify API connectivity
 */
export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    }, 
    { status: 200 }
  );
}

/**
 * Support HEAD requests for minimal network usage
 */
export async function HEAD() {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'x-health': 'ok',
      'x-timestamp': new Date().toISOString()
    }
  });
} 
import { NextRequest, NextResponse } from 'next/server'
import { getJobStatus } from '@/lib/veo'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get('jobId')
  if (!jobId) return NextResponse.json({ error: 'Missing jobId' }, { status: 400 })

  const rec = getJobStatus(jobId)
  if (!rec) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

  return NextResponse.json({ id: rec.id, status: rec.status, url: rec.url, error: rec.error })
}

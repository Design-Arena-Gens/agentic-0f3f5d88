import { NextRequest, NextResponse } from 'next/server'
import { startMockJob, startRealVeoJob } from '@/lib/veo'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const input = {
      prompt: String(body.prompt || ''),
      negative: body.negative ? String(body.negative) : undefined,
      duration: body.duration ? Number(body.duration) : undefined,
      aspect: body.aspect ? String(body.aspect) : undefined,
      seed: body.seed !== undefined && body.seed !== null ? Number(body.seed) : undefined,
      guidance: body.guidance ? Number(body.guidance) : undefined,
    }

    if (!input.prompt || input.prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Try real Veo call first; fallback to mock if it fails
    try {
      const { jobId } = await startRealVeoJob(input)
      return NextResponse.json({ jobId })
    } catch {
      const jobId = startMockJob(input)
      return NextResponse.json({ jobId, mocked: true })
    }
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 })
  }
}

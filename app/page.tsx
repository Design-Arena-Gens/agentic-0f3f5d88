"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PromptForm } from '@/components/PromptForm'
import { VideoResult } from '@/components/VideoResult'

type JobStatus = 'queued' | 'processing' | 'completed' | 'failed'

type Job = {
  id: string
  status: JobStatus
  url?: string
  error?: string
}

export default function HomePage() {
  const [job, setJob] = useState<Job | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [polling, setPolling] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const canSubmit = useMemo(() => !isSubmitting && !polling, [isSubmitting, polling])

  const submitPrompt = useCallback(async (payload: any) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      const newJob: Job = { id: data.jobId, status: 'queued' }
      setJob(newJob)
      setIsSubmitting(false)
      setPolling(true)
    } catch (e: any) {
      setIsSubmitting(false)
      setJob({ id: 'error', status: 'failed', error: e?.message ?? 'Unknown error' })
    }
  }, [])

  useEffect(() => {
    if (!job || !polling) return
    if (intervalRef.current) clearInterval(intervalRef.current)

    const poll = async () => {
      const res = await fetch(`/api/status?jobId=${encodeURIComponent(job.id)}`)
      if (!res.ok) {
        setJob({ id: job.id, status: 'failed', error: await res.text() })
        setPolling(false)
        return
      }
      const data: Job = await res.json()
      setJob(data)
      if (data.status === 'completed' || data.status === 'failed') {
        setPolling(false)
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }

    poll()
    intervalRef.current = setInterval(poll, 2000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [job?.id, polling])

  return (
    <main className="container py-10">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Ultra Realistic Cinematic Video (8K) with Veo 3.1</h1>
        <p className="mt-2 text-white/70">Enter a cinematic prompt to generate an 8K video.</p>
      </header>

      <section className="card p-6">
        <PromptForm onSubmit={submitPrompt} disabled={!canSubmit} />
      </section>

      <section className="mt-8">
        <VideoResult job={job} isPolling={polling} />
      </section>

      <footer className="mt-12 text-center text-xs text-white/40">
        Requires a valid GOOGLE_API_KEY for real Veo calls. Falls back to mocked generation for demo.
      </footer>
    </main>
  )
}

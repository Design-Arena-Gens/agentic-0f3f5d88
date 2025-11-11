"use client"

import { useMemo } from 'react'

export function VideoResult({ job, isPolling }: { job: any, isPolling: boolean }) {
  const statusLabel = useMemo(() => {
    if (!job) return null
    if (job.status === 'queued') return 'Queued'
    if (job.status === 'processing') return 'Processing'
    if (job.status === 'completed') return 'Completed'
    if (job.status === 'failed') return 'Failed'
    return 'Unknown'
  }, [job])

  if (!job) {
    return (
      <div className="card p-6 text-white/70 text-sm">
        Enter a cinematic prompt and click generate to begin.
      </div>
    )
  }

  if (job.status === 'failed') {
    return (
      <div className="card p-6 text-red-300">
        Failed: {job.error ?? 'Unknown error'}
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/80">Status: <span className="font-medium">{statusLabel}</span></div>
        {isPolling && (
          <div className="text-xs text-white/50">Polling...</div>
        )}
      </div>

      {job.status !== 'completed' && (
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-1/3 animate-pulse bg-brand-500"></div>
          </div>
          <p className="mt-2 text-xs text-white/60">Generating ultra-realistic frames and compiling video...</p>
        </div>
      )}

      {job.status === 'completed' && job.url && (
        <div className="mt-6 space-y-3">
          <video src={job.url} controls playsInline className="w-full rounded-lg border border-white/10" />
          <div className="flex gap-3 text-sm">
            <a className="btn" href={job.url} download>
              Download
            </a>
            <a className="btn bg-white/10 text-white hover:bg-white/20" href={job.url} target="_blank" rel="noreferrer">
              Open in new tab
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

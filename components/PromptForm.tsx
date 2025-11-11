"use client"

import { useState } from 'react'

export function PromptForm({ onSubmit, disabled }: { onSubmit: (payload: any) => void, disabled?: boolean }) {
  const [prompt, setPrompt] = useState("")
  const [negative, setNegative] = useState("")
  const [duration, setDuration] = useState(8)
  const [aspect, setAspect] = useState("16:9")
  const [seed, setSeed] = useState<number | undefined>(undefined)
  const [guidance, setGuidance] = useState(12)

  return (
    <form
      className="grid grid-cols-1 gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ prompt, negative, duration, aspect, seed, guidance })
      }}
    >
      <div>
        <label className="block text-sm text-white/80 mb-1">Prompt</label>
        <textarea
          required
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="input"
          placeholder="Epic aerial shot over misty mountains at sunrise, golden hour lighting, ultra realistic, cinematic"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-white/80 mb-1">Negative prompt</label>
          <input
            value={negative}
            onChange={(e) => setNegative(e.target.value)}
            className="input"
            placeholder="low quality, artifacts, blurry"
          />
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1">Duration</label>
          <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="input">
            <option value={4}>4s</option>
            <option value={8}>8s</option>
            <option value={16}>16s</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-white/80 mb-1">Aspect ratio</label>
          <select value={aspect} onChange={(e) => setAspect(e.target.value)} className="input">
            <option>16:9</option>
            <option>9:16</option>
            <option>1:1</option>
            <option>21:9</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-white/80 mb-1">Seed (optional)</label>
          <input
            type="number"
            className="input"
            value={seed ?? ""}
            onChange={(e) => setSeed(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="Random"
          />
        </div>
        <div>
          <label className="block text-sm text-white/80 mb-1">Guidance</label>
          <input
            type="number"
            min={0}
            max={30}
            className="input"
            value={guidance}
            onChange={(e) => setGuidance(Number(e.target.value))}
          />
        </div>
        <div className="flex items-end">
          <button className="btn w-full" disabled={disabled}>Generate 8K Cinematic</button>
        </div>
      </div>
    </form>
  )
}

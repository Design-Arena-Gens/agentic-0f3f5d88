import './globals.css'
import type { Metadata } from 'next'
import { clsx } from 'clsx'

export const metadata: Metadata = {
  title: 'AI Video (Google Veo 3.1) - Ultra Realistic 8K',
  description: 'Generate cinematic 8K videos using Google Veo 3.1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx('min-h-screen antialiased')}>{children}</body>
    </html>
  )
}

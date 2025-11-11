# AI Video Generator (Google Veo 3.1)

Generate ultra-realistic cinematic videos (up to 8K) from a text prompt using Google Veo 3.1. This app runs on Next.js and is deployable to Vercel.

## Quickstart

1. Install dependencies:

```bash
npm install
```

2. (Optional) Create `.env.local` with your Google AI Studio API key:

```bash
cp .env.example .env.local
# edit .env.local and set GOOGLE_API_KEY=...
```

Without a key, the app runs in mock mode and returns a sample video after a short delay.

3. Run locally:

```bash
npm run dev
```

4. Build and start production locally:

```bash
npm run build && npm start
```

## Environment

- `GOOGLE_API_KEY`: Google AI Studio key with access to Veo 3.1 video generation. When missing or if the API call fails, the app falls back to a mock job.

## Notes

- In-memory job tracking is used purely for demo purposes. For production, back this with a durable queue/database and poll the real operation status from Google.
- The real Veo endpoint and payload are best-effort and may require updates as Google finalizes the API surface.

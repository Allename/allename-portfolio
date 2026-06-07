/**
 * TEMPORARY — delete this file once you have your refresh token in .env
 *
 * Spotify redirects here after authorization.
 * It exchanges the code for a refresh token and renders it on screen.
 */

import { NextRequest } from "next/server"

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!
const REDIRECT_URI = "http://localhost:3000/callback"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  const error = request.nextUrl.searchParams.get("error")

  if (error) {
    return new Response(`<h2>Authorization denied: ${error}</h2>`, {
      headers: { "Content-Type": "text/html" },
    })
  }

  if (!code) {
    return new Response("<h2>No code received from Spotify.</h2>", {
      headers: { "Content-Type": "text/html" },
    })
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    return new Response(
      `<h2>Token exchange failed</h2><pre>${JSON.stringify(data, null, 2)}</pre>`,
      { headers: { "Content-Type": "text/html" } }
    )
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Spotify Token</title>
      <style>
        body { background: #111; color: #fff; font-family: monospace; padding: 2rem; }
        h2 { color: #1db954; }
        .token { background: #1f1e1e; padding: 1rem; border-radius: 8px; word-break: break-all; font-size: 14px; }
        .step { color: #c4c4c4; margin: 1rem 0 0.5rem; }
        button { background: #1db954; color: #000; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 0.5rem; }
      </style>
    </head>
    <body>
      <h2>✅ Got your refresh token!</h2>
      <p class="step">1. Copy the token below:</p>
      <div class="token" id="token">${data.refresh_token}</div>
      <button onclick="navigator.clipboard.writeText('${data.refresh_token}')">Copy to clipboard</button>
      <p class="step">2. Add it to your <strong>.env</strong> file:</p>
      <div class="token">SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</div>
      <p class="step">3. Delete <strong>app/callback/route.ts</strong> — it's no longer needed.</p>
    </body>
    </html>
  `

  return new Response(html, { headers: { "Content-Type": "text/html" } })
}

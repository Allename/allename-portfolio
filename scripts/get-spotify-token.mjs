/**
 * Run once to get your Spotify refresh token.
 * Usage: node scripts/get-spotify-token.mjs
 *
 * Make sure http://127.0.0.1:8888/callback is added in your Spotify app's redirect URIs.
 */

import http from "http"
import { exec } from "child_process"

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
const REDIRECT_URI = "http://127.0.0.1:8888/callback"
const PORT = 8888

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌  Missing NEXT_PUBLIC_SPOTIFY_CLIENT_ID or NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET in env")
  process.exit(1)
}

const scope = "user-read-currently-playing user-read-playback-state"
const authUrl =
  `https://accounts.spotify.com/authorize` +
  `?client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(scope)}`

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`)

  if (url.pathname !== "/callback") {
    res.end("waiting...")
    return
  }

  const code = url.searchParams.get("code")
  const error = url.searchParams.get("error")

  if (error || !code) {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(`<h2 style="font-family:monospace;color:red">Authorization failed: ${error}</h2>`)
    server.close()
    return
  }

  // Exchange code for tokens
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
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

  const data = await tokenRes.json()

  if (!tokenRes.ok || !data.refresh_token) {
    res.writeHead(200, { "Content-Type": "text/html" })
    res.end(`<pre style="font-family:monospace;color:red">${JSON.stringify(data, null, 2)}</pre>`)
    server.close()
    return
  }

  // Success — show the token
  const html = `
    <!DOCTYPE html>
    <html>
    <head><style>
      body { background:#111; color:#fff; font-family:monospace; padding:2rem; }
      h2 { color:#1db954; }
      .box { background:#1f1e1e; padding:1rem; border-radius:8px; word-break:break-all; font-size:13px; margin:0.5rem 0 1rem; }
      button { background:#1db954; color:#000; border:none; padding:0.5rem 1.2rem; border-radius:6px; cursor:pointer; font-weight:bold; }
    </style></head>
    <body>
      <h2>✅ Got your refresh token!</h2>
      <p>Add this line to your <strong>.env</strong> file:</p>
      <div class="box">NEXT_PUBLIC_REFRESH_TOKEN=${data.refresh_token}</div>
      <button onclick="navigator.clipboard.writeText('${data.refresh_token}').then(()=>this.textContent='Copied!')">Copy token</button>
      <p style="color:#c4c4c4;margin-top:2rem;font-size:12px">You can now close this tab and stop the script (Ctrl+C).</p>
    </body>
    </html>`

  res.writeHead(200, { "Content-Type": "text/html" })
  res.end(html)

  console.log("\n✅  Refresh token received!")
  console.log("\nAdd this to your .env:\n")
  console.log(`NEXT_PUBLIC_REFRESH_TOKEN=${data.refresh_token}\n`)

  server.close()
})

server.listen(PORT, "127.0.0.1", () => {
  console.log(`\n🎵  Spotify token helper running on port ${PORT}`)
  console.log(`\nOpening authorization URL in your browser...`)
  console.log(`\nIf it doesn't open automatically, paste this URL manually:\n\n${authUrl}\n`)

  // Try to open the browser automatically
  const opener =
    process.platform === "darwin" ? "open" :
    process.platform === "win32" ? "start" : "xdg-open"
  exec(`${opener} "${authUrl}"`)
})

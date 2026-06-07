const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET!
const REFRESH_TOKEN = process.env.NEXT_PUBLIC_REFRESH_TOKEN!

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    cache: "no-store",
  })

  const data = await res.json()
  return data.access_token
}

export async function GET() {
  try {
    const accessToken = await getAccessToken()

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    )

    // 204 = nothing playing
    if (res.status === 204 || res.status > 400) {
      return Response.json({ isPlaying: false })
    }

    const song = await res.json()

    // Could be an episode or ad — guard for track type
    if (!song || song.currently_playing_type !== "track") {
      return Response.json({ isPlaying: false })
    }

    const isPlaying: boolean = song.is_playing
    const title: string = song.item.name
    const artist: string = song.item.artists.map((a: { name: string }) => a.name).join(", ")
    const album: string = song.item.album.name
    const albumArt: string = song.item.album.images[0]?.url ?? ""
    const songUrl: string = song.item.external_urls.spotify
    const progress: number = song.progress_ms
    const duration: number = song.item.duration_ms

    return Response.json({ isPlaying, title, artist, album, albumArt, songUrl, progress, duration })
  } catch {
    return Response.json({ isPlaying: false })
  }
}

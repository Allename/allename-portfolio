/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface NowPlaying {
  isPlaying: boolean
  title?: string
  artist?: string
  albumArt?: string
  songUrl?: string
  progress?: number
  duration?: number
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.064-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1 5.254 5.254 0 001.828-.6c1.29-.763 2.099-1.86 2.42-3.33.165-.746.2-1.51.207-2.273-.002-4.45-.002-8.9-.002-13.35zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.016-.193c0-1.815 0-3.63-.002-5.443a.932.932 0 00-.02-.187c-.05-.243-.19-.32-.43-.27-.11.023-.218.048-.327.07l-5.616 1.18c-.005 0-.01.003-.02.005-.318.066-.418.168-.418.49-.003 2.055-.002 4.11-.002 6.166v.277c-.022.16-.037.322-.065.482-.15.855-.643 1.386-1.493 1.548-.536.1-1.064.085-1.585-.067-.95-.28-1.54-1.033-1.527-1.905.013-.9.634-1.69 1.596-1.972.35-.1.71-.164 1.068-.234.39-.077.783-.143 1.17-.228.27-.06.44-.229.484-.502a1.56 1.56 0 00.02-.27V5.789c0-.073.003-.147.013-.218.05-.33.232-.45.556-.52 1.287-.27 2.575-.535 3.862-.806l2.44-.51c.067-.014.135-.02.203-.033.41-.083.631.055.637.477.008.24.002.48.002.72v4.19z" />
    </svg>
  )
}

function YoutubeMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
    </svg>
  )
}

// ─── Equalizer bars (animated when playing) ──────────────────────────────────

function Equalizer() {
  return (
    <span className="flex items-end gap-[2px] h-3">
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-sm bg-[#1db954]"
          animate={{ height: ["4px", "12px", "6px", "10px", "4px"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function MusicWidget() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ isPlaying: false })
  const [spotifyHovered, setSpotifyHovered] = useState(false)
  const [loading, setLoading] = useState(false)

  // Lightweight background fetch — only updates the live dot
  async function fetchNowPlaying({ showLoading = false } = {}) {
    if (showLoading) setLoading(true)
    try {
      const res = await fetch("/api/now-playing")
      const data = await res.json()
      setNowPlaying(data)
    } catch {
      setNowPlaying({ isPlaying: false })
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  // On mount + every 60s — keeps the live dot accurate
  useEffect(() => {
    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 60_000)
    return () => clearInterval(interval)
  }, [])

  // Re-fetch with loading state on hover — card always shows fresh data
  function handleSpotifyHover(hovered: boolean) {
    setSpotifyHovered(hovered)
    if (hovered) fetchNowPlaying({ showLoading: true })
  }

  const progress =
    nowPlaying.progress && nowPlaying.duration
      ? (nowPlaying.progress / nowPlaying.duration) * 100
      : 0

  return (
    <div className="fixed right-4 top-1/7 lg:top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3">

      {/* ── Spotify ── */}
      <div
        className="flex items-center gap-2"
        onMouseEnter={() => handleSpotifyHover(true)}
        onMouseLeave={() => handleSpotifyHover(false)}
      >
        {/* Expanded now-playing card */}
        <AnimatePresence>
          {spotifyHovered && (
            <motion.div
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-[#1f1e1e] border border-border rounded-xl p-3 w-64 shadow-xl"
            >
              {loading ? (
                <div className="flex items-center gap-2 py-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              ) : nowPlaying.isPlaying ? (
                <>
                  <div className="flex gap-3 items-center mb-2">
                    {nowPlaying.albumArt && (
                      <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={nowPlaying.albumArt}
                          alt="album art"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{nowPlaying.title}</p>
                        <a
                          href={nowPlaying.songUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-[var(--text-muted)] hover:text-[#1db954] transition-colors"
                          aria-label="Open on Spotify"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] truncate">{nowPlaying.artist}</p>
                    </div>
                    <Equalizer />
                  </div>
                  {/* Progress bar */}
                  <div className="h-0.5 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1db954] rounded-full transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-xs text-[var(--text-muted)] text-center py-1">Not playing anything right now</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Spotify icon button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-full bg-[#1f1e1e] border border-border flex items-center justify-center relative"
          aria-label="Spotify"
        >
          <SpotifyIcon className="w-4 h-4 text-[#1db954]" />
          {/* Live dot */}
          {nowPlaying.isPlaying && (
            <motion.span
              className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#1db954]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>

      {/* ── Apple Music (stub) ── */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Apple Music — coming soon"
        className="w-9 h-9 rounded-full bg-[#1f1e1e] border border-border flex items-center justify-center opacity-50 cursor-not-allowed"
        aria-label="Apple Music"
        disabled
      >
        <AppleMusicIcon className="w-4 h-4 text-[#fc3c44]" />
      </motion.button> */}

      {/* ── YouTube Music (stub) ── */}
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="YouTube Music — coming soon"
        className="w-9 h-9 rounded-full bg-[#1f1e1e] border border-border flex items-center justify-center opacity-50 cursor-not-allowed"
        aria-label="YouTube Music"
        disabled
      >
        <YoutubeMusicIcon className="w-4 h-4 text-[#ff0000]" />
      </motion.button> */}

    </div>
  )
}

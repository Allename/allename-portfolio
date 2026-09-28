"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

function KunaiSvg({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="46"
      viewBox="0 0 24 64"
      fill="none"
      aria-hidden="true"
      style={{
        filter: active
          ? "drop-shadow(0 0 6px rgba(201,42,51,0.7))"
          : "drop-shadow(0 1px 3px rgba(0,0,0,0.6))",
        transition: "filter 0.2s ease",
      }}
    >
      {/* Blade */}
      <path
        d="M12 1 L17 22 C17 30 14.5 35 12 38 C9.5 35 7 30 7 22 Z"
        fill="#c9c5c0"
        stroke="#8a8580"
        strokeWidth="1"
      />
      {/* Guard */}
      <rect x="5" y="37" width="14" height="3.5" rx="1" fill="#4a4542" />
      {/* Handle */}
      <rect x="9.5" y="40" width="5" height="15" rx="2" fill="#2e2a28" />
      {/* Crimson wrap */}
      <rect x="9.5" y="44" width="5" height="2.5" fill="#c92a33" />
      <rect x="9.5" y="49" width="5" height="2.5" fill="#c92a33" />
      {/* Pommel ring */}
      <circle cx="12" cy="59" r="3.5" stroke="#4a4542" strokeWidth="2" fill="none" />
    </svg>
  )
}

export default function KunaiCursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Slight lag makes it feel thrown, not glued
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)")
    if (!fine.matches) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as HTMLElement | null
      setActive(Boolean(target?.closest("a, button, [role='button'], iframe")))
    }
    const leave = () => setVisible(false)

    window.addEventListener("mousemove", move)
    document.documentElement.addEventListener("mouseleave", leave)
    return () => {
      window.removeEventListener("mousemove", move)
      document.documentElement.removeEventListener("mouseleave", leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[10000] pointer-events-none"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        animate={{
          opacity: visible ? 1 : 0,
          scale: active ? 1.25 : 1,
          rotate: active ? 50 : 40,
        }}
        transition={{ duration: 0.2 }}
        className="-translate-x-1/2 -translate-y-1/2"
        style={{ transformOrigin: "60% 55%" }}
      >
        <KunaiSvg active={active} />
      </motion.div>
    </motion.div>
  )
}

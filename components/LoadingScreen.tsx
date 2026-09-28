"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const quotes = [
  "If you want to know who you are, you have to look at your real self and acknowledge what you see.",
  "No single thing is perfect by itself, that's why we're born to attract other things to make up for what we lack",
  "No matter how powerful you become, don't try to shoulder everything alone. If you do, you will surely fail.",
]

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  const activeQuote =
    progress >= 90 ? quotes[2] : progress >= 50 ? quotes[1] : quotes[0]

  useEffect(() => {
    document.documentElement.setAttribute("data-loading", "true")

    // Safety net: never leave the site hidden
    const failsafe = setTimeout(() => {
      setVisible(false)
      document.documentElement.removeAttribute("data-loading")
    }, 15000)

    let current = 0
    const interval = setInterval(() => {
      const speed =
        current < 40 ? 1.4 :
        current < 70 ? 0.55 :
        current < 90 ? 0.28 :
        1.8

      current = Math.min(current + speed, 100)
      setProgress(Math.floor(current))

      if (current >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setVisible(false)
          document.documentElement.removeAttribute("data-loading")
        }, 500)
      }
    }, 50)

    return () => {
      clearInterval(interval)
      clearTimeout(failsafe)
      document.documentElement.removeAttribute("data-loading")
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[10001] bg-[#0b0a0a] flex flex-col items-center justify-center"
        >
          {/* Chibi Itachi */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/itachi.gif"
            alt="Itachi"
            className="h-52 w-auto object-contain select-none"
            draggable={false}
          />

          {/* Bar + quote */}
          <div className="mt-8 w-72 sm:w-80 flex flex-col items-center gap-4">
            {/* Progress bar */}
            <div className="w-full h-[2px] bg-[#333333] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-600 rounded-full origin-left"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.08, ease: "linear" }}
              />
            </div>

            {/* Quote — cycles, attribution stays */}
            <div className="flex flex-col items-center gap-2">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeQuote}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35 }}
                  className="text-center font-display italic text-sm text-[var(--text-muted)]/80 leading-relaxed"
                >
                  &ldquo;{activeQuote}&rdquo;
                </motion.p>
              </AnimatePresence>
              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="not-italic font-mono text-xs tracking-widest uppercase text-[var(--accent-red)]/70"
              >
                — Itachi Uchiha
              </motion.footer>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

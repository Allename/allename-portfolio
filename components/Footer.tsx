"use client"

import { motion } from "framer-motion"
import { Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-24 bg-black overflow-hidden">
      {/* Ambient crimson glow */}
      <div
        className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,42,51,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-10 flex flex-col items-center text-center gap-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs text-[var(--text-muted)] tracking-[0.3em] uppercase"
        >
          Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl tracking-tight"
        >
          Let&apos;s build something{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-red)] to-[#e0555d]">
            worth remembering
          </span>
        </motion.h2>

        <motion.a
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ y: -2 }}
          href="mailto:allename.dev@gmail.com"
          className="flex items-center gap-2 px-6 py-3 rounded border border-[var(--accent-red)]/50 text-sm text-foreground hover:bg-[var(--accent-red)]/10 hover:border-[var(--accent-red)] transition-all duration-200"
        >
          <Mail className="w-4 h-4 text-[var(--accent-red)]" />
          allename.dev@gmail.com
        </motion.a>

        {/* Itachi quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-lg mt-6 pt-6 border-t border-border text-sm italic text-[var(--text-muted)]/70 leading-relaxed"
        >
          &ldquo;Those who forgive themselves, and are able to accept their true nature…
          they are the strong ones.&rdquo;
          <footer className="not-italic mt-2 text-xs tracking-widest uppercase text-[var(--accent-red)]/70">
            — Itachi Uchiha
          </footer>
        </motion.blockquote>

        <div className="red-hairline w-full mt-8 opacity-50" />

        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
          <span className="text-xs opacity-50">
            © {new Date().getFullYear()} Allename Anthony
          </span>
        </div>
      </div>
    </footer>
  )
}

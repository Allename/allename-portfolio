"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

function SharinganIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle cx="20" cy="20" r="18" stroke="#b91c1c" strokeWidth="2" fill="#0d0000" />
      {/* Iris */}
      <circle cx="20" cy="20" r="13" fill="#7f1d1d" opacity="0.6" />
      {/* Pupil */}
      <circle cx="20" cy="20" r="5" fill="#0d0000" />
      {/* Three tomoe — rotated 120° apart */}
      {[0, 120, 240].map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180
        const cx = 20 + 8.5 * Math.cos(rad)
        const cy = 20 + 8.5 * Math.sin(rad)
        return (
          <g key={deg} transform={`rotate(${deg + 90}, ${cx}, ${cy})`}>
            <ellipse cx={cx} cy={cy} rx="2.2" ry="3.2" fill="#0d0000" />
          </g>
        )
      })}
    </svg>
  )
}

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 inset-x-0 z-50 h-16 backdrop-blur-md border-b border-border"
      style={{ backgroundColor: "rgba(31, 30, 30, 0.85)" }}
    >
      <nav className="max-w-5xl mx-auto h-full flex items-center justify-between px-6">
        <Link href="/" className="ring-offset-background rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Avatar className="w-9 h-9">
            <AvatarImage src="/images/logo.JPG" alt="Allename Anthony" />
            <AvatarFallback className="bg-[var(--bg-secondary)] text-xs font-semibold text-foreground">AA</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-muted)] hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  )
}

"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#0b0a0a]/70 border-b border-border"
    >
      {/* Crimson scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-[var(--accent-red)]"
      />

      <nav className="max-w-5xl mx-auto h-16 flex items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Image
            src="/images/itachi.sharingan.svg"
            alt="Sharingan"
            width={28}
            height={28}
            className="sharingan-spin-hover"
            aria-hidden="true"
          />
          <span className="hidden sm:block font-display text-sm tracking-wide text-foreground">
            allename<span className="text-[var(--accent-red)]">.dev</span>
          </span>
        </Link>

        <div className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-muted)] hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  )
}

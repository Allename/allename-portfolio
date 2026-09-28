"use client"

import { motion } from "framer-motion"

interface Props {
  index: string
  title: string
  kanji: string
}

export default function SectionHeading({ index, title, kanji }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex items-baseline gap-4 mb-14"
    >
      <span className="font-mono text-xs text-[var(--accent-red)]">{index}</span>
      <h2 className="font-display text-3xl md:text-5xl tracking-tight">{title}</h2>
      <span className="font-display text-sm md:text-base text-[var(--text-muted)]/60">
        {kanji}
      </span>
      <div className="red-hairline flex-1 self-center opacity-50" />
    </motion.div>
  )
}

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "React Native",
  "TailwindCSS",
  "Redux",
  "Zustand",
  "Framer Motion",
]

export default function Marquee() {
  const row = [...skills, ...skills]
  return (
    <div className="relative border-y border-border overflow-hidden py-5 select-none" aria-hidden="true">
      <div className="marquee-track items-center gap-10">
        {row.map((skill, i) => (
          <span key={i} className="flex items-center gap-10 shrink-0">
            <span className="font-display italic text-lg md:text-xl text-[var(--text-muted)]/80 whitespace-nowrap">
              {skill}
            </span>
            <span className="text-[var(--accent-red)]/70 text-[10px]">◆</span>
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b0a0a] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b0a0a] to-transparent" />
    </div>
  )
}

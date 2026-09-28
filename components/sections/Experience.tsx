"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/SectionHeading"

type EmploymentType = "full-time" | "part-time" | "contract" | "freelance" | "internship"

const jobs = [
  {
    id: "vendorstack",
    company: "Vendorstack",
    role: "Frontend | Mobile Engineer",
    type: "contract" as EmploymentType,
    location: "Remote",
    period: "Mar 2026 to Present",
    kanji: "現",
    blurb:
      "Social commerce platform blending shopping with content creation. Shop, create and share with your circle.",
  },
  {
    id: "afrstakes",
    company: "Afrstakes",
    role: "Frontend Engineer",
    type: "contract" as EmploymentType,
    location: "Remote",
    period: "Jan 2026 to Mar 2026",
    kanji: "投",
    blurb:
      "Structured capital platform connecting African businesses with investors.",
  },
  {
    id: "goldenroz",
    company: "GoldenRoz",
    role: "Frontend Engineer",
    type: "freelance" as EmploymentType,
    location: "Remote",
    period: "Feb 2025 to Dec 2025",
    kanji: "筆",
    blurb:
      "Content platform for managing, editing and organizing blogs and articles on WordPress with ease.",
  },
  {
    id: "request-mechanic",
    company: "Request Mechanic",
    role: "Frontend Engineer",
    type: "full-time" as EmploymentType,
    location: "Remote",
    period: "Jun 2024 to Jan 2025",
    kanji: "車",
    blurb:
      "Autotech platform connecting car owners with verified mechanics, with diagnostics, consultations and service tracking.",
  },
  {
    id: "billboxx",
    company: "Billboxx Technologies",
    role: "Frontend Engineer",
    type: "full-time" as EmploymentType,
    location: "Remote",
    period: "Sept 2023 to May 2024",
    kanji: "請",
    blurb:
      "B2B billing-to-payment platform helping businesses issue invoices, collect payments and reconcile books faster.",
  },
  {
    id: "bazaar",
    company: "Bazaar Technologies",
    role: "Frontend Engineer",
    type: "full-time" as EmploymentType,
    location: "Remote",
    period: "Feb 2023 to Aug 2023",
    kanji: "市",
    blurb:
      "Commerce technology company building storefront and admin experiences powered by backend APIs.",
  },
  {
    id: "bluelight",
    company: "Bluelight Studios",
    role: "Frontend Engineer",
    type: "contract" as EmploymentType,
    location: "Remote",
    period: "Sept 2021 to Jan 2023",
    kanji: "始",
    blurb:
      "Lagos-based startup studio crafting web and mobile products, focused on data-driven applications for global markets.",
  },
]

const typeBadgeClass: Record<EmploymentType, string> = {
  "full-time": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "part-time": "bg-yellow-500/10  text-yellow-400  border-yellow-500/20",
  "contract": "bg-blue-500/10    text-blue-400    border-blue-500/20",
  "freelance": "bg-purple-500/10  text-purple-400  border-purple-500/20",
  "internship": "bg-orange-500/10  text-orange-400  border-orange-500/20",
}

export default function Experience() {
  const [activeId, setActiveId] = useState(jobs[0].id)
  const activeIndex = jobs.findIndex((j) => j.id === activeId)
  const active = jobs[activeIndex]

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Ambient crimson glow, same language as Footer */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-40 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(201,42,51,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <SectionHeading index="01" title="Experience" kanji="経歴" />

        {/* Mobile: plain stacked list, no tabs */}
        <div className="flex flex-col md:hidden">
          {jobs.map((job, i) => (
            <motion.article
              key={job.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.2) }}
              className="relative pl-6 pb-8 last:pb-0"
            >
              {/* Timeline spine */}
              {i < jobs.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-[3px] top-4 bottom-0 w-px bg-border"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute left-0 top-[7px] h-1.5 w-1.5 rotate-45 bg-[var(--accent-red)]"
              />
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
                {job.period}
              </p>
              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                <h3 className="text-[15px] font-semibold text-foreground">
                  {job.role}
                </h3>
                <Badge
                  variant="outline"
                  className={`${typeBadgeClass[job.type]} capitalize text-[10px]`}
                >
                  {job.type}
                </Badge>
              </div>
              <p className="mt-1 text-sm">
                <span className="text-[var(--accent-red)] font-medium">
                  {job.company}
                </span>
                <span className="text-[var(--text-muted)]">
                  {" "}
                  · {job.location}
                </span>
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                {job.blurb}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Desktop: interactive tabs */}
        <div className="hidden md:flex flex-row gap-0">
          {/* Company rail */}
          <div
            role="tablist"
            aria-label="Companies"
            className="flex flex-col w-60 shrink-0"
          >
            {jobs.map((job, i) => {
              const isActive = job.id === activeId
              return (
                <button
                  key={job.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(job.id)}
                  className={`group relative flex items-center gap-3 pl-5 pr-8 py-3.5 text-left transition-colors duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-[var(--text-muted)] hover:text-foreground hover:bg-white/[0.02]"
                  }`}
                >
                  {/* Diamond node, reuses timeline language */}
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span
                      className={`h-2 w-2 rotate-45 border transition-all duration-300 ${
                        isActive
                          ? "border-[var(--accent-red)] bg-[var(--accent-red)]"
                          : "border-[var(--text-muted)]/40 bg-transparent group-hover:border-[var(--accent-red)]/60"
                      }`}
                    />
                    {isActive && (
                      <span className="absolute h-2.5 w-2.5 rotate-45 bg-[var(--accent-red)] opacity-50 blur-[6px]" />
                    )}
                  </span>

                  {/* Active wash */}
                  {isActive && (
                    <motion.span
                      layoutId="exp-active-wash"
                      className="absolute inset-0 bg-[var(--accent-red)]/[0.06] border-l-2 border-[var(--accent-red)]"
                      transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                    />
                  )}

                  <span
                    className={`relative font-mono text-[10px] tracking-widest ${
                      isActive
                        ? "text-[var(--accent-red)]"
                        : "text-[var(--text-muted)]/50"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative text-sm font-medium">
                    <span className={isActive ? undefined : "brush-link"}>
                      {job.company}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Detail panel */}
          <div className="relative flex-1 border-l border-border pl-12 min-h-[300px]">
            {/* Giant outline index watermark */}
            <AnimatePresence mode="wait">
              <motion.span
                key={active.id + "-watermark"}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-outline pointer-events-none select-none absolute -top-8 right-0 font-display text-[7rem] leading-none opacity-40"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative"
              >
                <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase text-[var(--text-muted)]">
                  <span className="h-1 w-1 rotate-45 bg-[var(--accent-red)]" />
                  {active.period}
                </p>

                <div className="mt-3 flex items-start gap-3 flex-wrap">
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {active.role}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`${typeBadgeClass[active.type]} capitalize text-[10px] mt-1`}
                  >
                    {active.type}
                  </Badge>
                </div>

                <p className="mt-2 text-sm">
                  <span className="text-[var(--accent-red)] font-medium">
                    {active.company}
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {" "}
                    · {active.location}
                  </span>
                </p>

                <div className="red-hairline my-6 opacity-60" />

                <p className="max-w-xl text-[15px] text-[var(--text-muted)] leading-relaxed">
                  {active.blurb}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <p className="font-mono text-[11px] tracking-widest text-[var(--text-muted)]/50">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(jobs.length).padStart(2, "0")}
                  </p>
                  <button
                    onClick={() =>
                      setActiveId(jobs[(activeIndex + 1) % jobs.length].id)
                    }
                    className="group flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[var(--text-muted)] hover:text-foreground transition-colors"
                  >
                    Next
                    <span className="text-[var(--accent-red)] transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Vertical kanji rail, mirrors Hero */}
            <span
              aria-hidden="true"
              className="vertical-rl absolute -right-2 top-0 hidden lg:block font-display text-sm tracking-[0.5em] text-[var(--text-muted)]/30 select-none"
            >
              {active.kanji}・{active.company}
            </span>
          </div>
        </div>

        <div className="red-hairline mt-16 opacity-60" />
      </div>
    </section>
  )
}

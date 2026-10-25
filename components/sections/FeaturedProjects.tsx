"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/SectionHeading"
import { projects, FEATURED_COUNT } from "@/lib/projects"

// ─── Card grid (mobile) ───────────────────────────────────────────────────────

const cardContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setScale(containerRef.current.offsetWidth / 1280)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <motion.div
      variants={cardVariant}
      className="relative flex flex-col rounded-lg overflow-hidden border border-border group hover:border-[var(--accent-red)]/40 transition-colors duration-300"
    >
      <span className="absolute top-2 left-3 z-10 font-mono text-[10px] tracking-widest text-[var(--text-muted)]/70 bg-[#0b0a0a]/80 px-1.5 py-0.5 rounded">
        {String(index + 1).padStart(3, "0")}
      </span>
      <div ref={containerRef} className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
        {project.demo && project.demo !== "#" ? (
          <iframe
            src={project.demo}
            title={project.title}
            className="absolute top-0 left-0 border-0 pointer-events-none"
            style={{ width: "1280px", height: "800px", transform: `scale(${scale})`, transformOrigin: "top left" }}
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-xs">No live URL</div>
        )}
      </div>
      <div className="flex flex-col flex-1 gap-3 p-4">
        <h3 className="font-semibold text-foreground text-sm leading-snug">{project.title}</h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary"
              className="text-[8px] px-2 py-0.5 bg-[#171314] text-[var(--text-muted)] border-border group-hover:text-foreground transition-colors rounded uppercase">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-end pt-1">
          {project.demo && project.demo !== "#" && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs border border-border px-3 py-1.5 rounded hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] text-[var(--text-muted)] transition-all duration-200">
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── List preview (desktop) ───────────────────────────────────────────────────

function IframePreview({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setScale(containerRef.current.offsetWidth / 1280)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  return (
    <div ref={containerRef} className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
      {!url || url === "#" ? (
        <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-xs">
          No live URL
        </div>
      ) : (
        <iframe
          src={url}
          title={title}
          className="absolute top-0 left-0 border-0 pointer-events-none"
          style={{
            width: "1280px",
            height: "800px",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      )}
    </div>
  )
}

export default function FeaturedProjects() {
  const [hovered, setHovered] = useState<number | null>(null)
  const featured = projects.slice(0, FEATURED_COUNT)

  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading index="02" title="Featured Projects" kanji="作品" />

        {/* ── Mobile: card grid ── */}
        <motion.div
          variants={cardContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden"
        >
          {featured.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>

        {/* ── Desktop: hover-reveal list ── */}
        <div className="hidden lg:flex gap-10">

          {/* ── Project list ── */}
          <div className="flex-1 min-w-0">
            {featured.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative flex items-start gap-5 py-5 border-b border-border hover:border-[var(--accent-red)]/30 transition-colors duration-300 cursor-default"
              >
                {/* Left accent bar on hover */}
                <motion.span
                  className="absolute -left-6 top-0 bottom-0 w-px bg-[var(--accent-red)]"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Index */}
                <span className="font-mono text-[10px] tracking-widest text-[var(--accent-red)]/50 shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Info + tags */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-[var(--accent-red)] transition-colors duration-200 truncate">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[8px] px-2 py-0.5 bg-[#171314] text-[var(--text-muted)] border-border rounded uppercase"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* External link */}
                {project.demo && project.demo !== "#" && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0 text-[var(--text-muted)] hover:text-[var(--accent-red)] opacity-0 group-hover:opacity-100 transition-all duration-200"
                    aria-label={`Open ${project.title}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Preview pane — desktop only ── */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-[calc(50vh-9rem)]">
              <AnimatePresence mode="wait">
                {hovered !== null ? (
                  <motion.div
                    key={hovered}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-xl overflow-hidden border border-border shadow-2xl"
                  >
                    <IframePreview
                      url={featured[hovered].demo ?? "#"}
                      title={featured[hovered].title}
                    />
                    <div className="px-4 py-3 bg-[#111111] border-t border-border">
                      <p className="text-xs font-semibold text-foreground">{featured[hovered].title}</p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-0.5 line-clamp-1">{featured[hovered].description}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-dashed border-border/40 aspect-[16/10] flex items-center justify-center"
                  >
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]/30">
                      hover to preview
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] hover:text-foreground border border-border hover:border-[var(--accent-red)]/60 px-6 py-3 rounded transition-all duration-300"
          >
            View all projects
            <span className="text-[var(--accent-red)] group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

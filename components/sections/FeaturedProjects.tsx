"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// ─── Toggle preview mode here ─────────────────────────────────────────────────
// "image"   → static screenshot from /public/projects/
// "iframe"  → live site scaled down in a sandboxed iframe
// "browser" → mock browser chrome with animated gradient (always works)
const PREVIEW_MODE: "image" | "iframe" | "browser" | "none" = "iframe"
// ─────────────────────────────────────────────────────────────────────────────

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

const projects = [
  {
    title: "Afristakes",
    description: "Proxy provider website including authentication, dashboard and dynamic features.",
    image: "/projects/intense-proxy-1.jpg",
    tags: ["React", "Typescript", "TailwindCSS", "Tanstack Router", "Zustand", "PusherJs"],
    demo: "https://afristakes.com",
    github: null,
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
  },
  {
    title: "Billboxx Technologies",
    description: "Handles all invoice-related tasks, including issue, payment, and reconciliation, for businesses of all sizes",
    image: "/projects/aape-coin.jpg",
    tags: ["React", "Typescript", "TailwindCSS", "Zustand", "Shadcn"],
    demo: "https://app.billboxx.com",
    github: null,
    gradient: "from-[#0d1b2a] via-[#1b2838] to-[#2d4a6b]",
  },
  {
    title: "Vendorstack",
    description: "Music search application, displays informations about artists such as albums, biography, songs that are available on YouTube and much more using TheAudioDB API.",
    image: "/projects/soundify.jpg",
    tags: ["React", "React Native", "Typescript"],
    demo: "https://www.getvendorstack.com/",
    github: "#",
    gradient: "from-[#0a1a2e] via-[#0f2d4d] to-[#1a4a7a]",
  },
  {
    title: "Request Mechanic",
    description: "A platform that connects automobile users to the nearest automobile experts.",
    image: "/projects/blockchain-explorer.jpg",
    tags: ["React", "Javascript", "TailwindCSS", "Redux"],
    demo: "https://requestmechanic.com",
    github: "#",
    gradient: "from-[#1a0a2e] via-[#2d1b4e] to-[#4a2080]",
  },
  {
    title: "Folawej Laundromat",
    description: "World-class laundry experience with self-service facilities, coin-operated machines, and mobile app integration",
    image: "/projects/gitprofile.jpg",
    tags: ["React", "Typescript", "Redux", "Ionic"],
    demo: "https://folawej.com",
    github: "https://folawej.com",
    gradient: "from-[#0a2e1a] via-[#0f4d2a] to-[#1a7a42]",
  },
  {
    title: "Bluelight Studios",
    description: "Solving user problems through the use of software and technologies",
    image: "/projects/moviedb.jpg",
    tags: ["React.js", "Redux", "TheMovieDB API"],
    demo: "https://www.bluelight.studio",
    github: "#",
    gradient: "from-[#2e0a0a] via-[#4d1515] to-[#7a2020]",
  },
]

// ─── Preview components ───────────────────────────────────────────────────────

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
      />
    </div>
  )
}

function IframePreview({ url, title }: { url: string; title: string }) {
  const isPlaceholder = !url || url === "#"
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0d]">
      {isPlaceholder ? (
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
            transform: "scale(0.25)",
            transformOrigin: "top left",
          }}
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
        />
      )}
    </div>
  )
}

function BrowserPreview({ url, title, gradient }: { url: string; title: string; gradient: string }) {
  const displayUrl = url === "#" ? "localhost:3000" : url.replace("https://", "")
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-t-lg flex flex-col">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2a] shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-2 bg-[#1a1a1a] rounded text-[9px] text-[var(--text-muted)] px-2 py-0.5 truncate font-mono">
          {displayUrl}
        </div>
      </div>
      {/* Viewport */}
      <div className={`flex-1 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <span className="text-white/20 text-lg font-bold tracking-widest uppercase">{title}</span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs text-[var(--text-muted)] tracking-widest uppercase mb-10"
        >
          Featured Projects
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={card}
              className="flex flex-col rounded-lg overflow-hidden border border-border bg-[var(--bg-secondary)] group"
            >
              {/* Preview — swap PREVIEW_MODE above to change */}
              {PREVIEW_MODE === "image" && (
                <ImagePreview src={project.image} alt={project.title} />
              )}
              {PREVIEW_MODE === "iframe" && (
                <IframePreview url={project.demo ?? "#"} title={project.title} />
              )}
              {PREVIEW_MODE === "browser" && (
                <BrowserPreview url={project.demo ?? "#"} title={project.title} gradient={project.gradient} />
              )}

              {/* Body */}
              <div className="flex flex-col flex-1 gap-3 p-4">
                <h3 className="font-semibold text-foreground text-sm leading-snug">{project.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[8px] px-2 py-0.5 bg-[#111111] text-[var(--text-muted)] border-border hover:text-[var(--accent-blue)] transition-colors rounded uppercase"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {project.demo && project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs border border-border px-3 py-1.5 rounded hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] text-[var(--text-muted)] transition-all duration-200"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Live demo
                    </a>
                  )}
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs border border-border px-3 py-1.5 rounded hover:border-[var(--accent-blue)] hover:text-[var(--accent-blue)] text-[var(--text-muted)] transition-all duration-200"
                    >
                      <GithubIcon className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

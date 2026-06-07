"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    title: "Vue Weather APP",
    description: "My first Vue app using OpenWeather API and fetch API with Axios/Libraries for requests or styling.",
    tags: ["Vue.js"],
    demo: "#",
    github: "#",
  },
  {
    title: "Vuewinder",
    description: "Used all what I was able to find publicly that is similar by Twitter's UI and also added the tweet function.",
    tags: ["Vue.js", "TailwindCSS"],
    demo: "#",
    github: "#",
  },
  {
    title: "Mu6icbot",
    description: "Discord music bot using Node.js and Discord's API library to play music through YouTube, added Genius API making the bot capable to pull the lyrics for the current playing song.",
    tags: ["Discord Library", "Node.js", "Genius API", "YouTube API"],
    demo: null,
    github: "#",
  },
  {
    title: "IntenseProxy",
    description: "Proxy provider website including authentication, dashboard and dynamic features.",
    tags: ["React", "Bootstrap", "Styled Components"],
    demo: "#",
    github: "#",
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function MoreProjects() {
  return (
    <section className="py-16 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs text-[var(--text-muted)] tracking-widest uppercase mb-10"
        >
          More Projects
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={item}
              className="flex flex-col gap-3 p-5 rounded-lg border border-border bg-[var(--bg-secondary)] hover:border-[var(--accent-blue)]/40 transition-all duration-300"
            >
              <h3 className="font-semibold text-sm text-foreground">{project.title}</h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[10px] px-2 py-0.5 bg-[#111111] text-[var(--text-muted)] border-border rounded"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                {project.demo && (
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
                {project.github && (
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

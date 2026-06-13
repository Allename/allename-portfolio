"use client"

import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type EmploymentType = "full-time" | "part-time" | "contract" | "freelance" | "internship"

const jobs = [
  {
    id: "vendorstack",
    company: "Vendorstack",
    role: "Frontend | Mobile Engineer",
    type: "contract" as EmploymentType,
    location: "Remote",
    year: 2026,
    monthPeriod: "Mar",
    bullets: [
      "Contracted to improve and refactor the mobile application for smoother user experience",
      'Improved the onboarding and chat features '
    ],
  },
  {
    id: "afrstakes",
    company: "Afrstakes",
    role: "Frontend Engineer",
    type: "contract" as EmploymentType,
    location: "Remote",
    year: 2026,
    monthPeriod: "Jan",
    bullets: [
      "Led a team of frontend engineers to deliver fully functional applications within a short contract window",
      "Implemented features that currently serves 300+ seamlessly",
    ],
  },
  {
    id: "goldenroz",
    company: "GoldenRoz",
    role: "Frontend Engineer",
    type: "freelance" as EmploymentType,
    location: "Remote",
    year: 2025,
    monthPeriod: "Feb",
    bullets: [
      "Managed an application that helps users manage, edit and organize blogs and articles on wordpress with ease.",
    ],
  },
  {
    id: "request-mechanic",
    company: "Request Mechanic",
    role: "Frontend Engineer",
    type: "full-time" as EmploymentType,
    location: "Remote",
    year: 2024,
    monthPeriod: "Jun",
    bullets: [
      "Migrated legacy class-based components to functional React components, enhancing maintainability by 40%.",
      "Contributed to features that added 200 new users by bridging car owners with auto mechanics.",
    ],
  },
  {
    id: "billboxx",
    company: "Billboxx Technologies",
    role: "Frontend Engineer",
    type: "full-time" as EmploymentType,
    location: "Remote",
    year: 2023,
    monthPeriod: "Sept",
    bullets: [
      "Converted email design templates into responsive, user-facing HTML/CSS emails for critical communications.",
      "Worked across multiple features, improving maintainability and leading to a 30% increase in users.",
    ],
  },
  {
    id: "bazaar",
    company: "Bazaar Technologies",
    role: "Frontend Engineer",
    type: "full-time" as EmploymentType,
    location: "Remote",
    year: 2023,
    monthPeriod: "Feb",
    bullets: [
      "Embraced design-driven development to create visually appealing and user-friendly interfaces.",
      "Worked extensively on the admin panel, leveraging backend APIs to handle data retrieval and manipulation.",
    ],
  },
  {
    id: "bluelight",
    company: "Bluelight Studios",
    role: "Frontend Engineer",
    type: "contract" as EmploymentType,
    location: "Remote",
    year: 2021,
    monthPeriod: "Sept",
    bullets: [
      "Worked with the team to build and deliver a series of web and mobile applications and dashboards to track key business metrics, improving user engagement by 20%, and supported more informed decision-making.",
      "Implemented clean architecture patterns, improving scalability and long-term maintainability of client applications.",
    ],
  },
]

const typeBadgeClass: Record<EmploymentType, string> = {
  "full-time":  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "part-time":  "bg-yellow-500/10  text-yellow-400  border-yellow-500/20",
  "contract":   "bg-blue-500/10    text-blue-400    border-blue-500/20",
  "freelance":  "bg-purple-500/10  text-purple-400  border-purple-500/20",
  "internship": "bg-orange-500/10  text-orange-400  border-orange-500/20",
}

// Derive sorted unique years and group jobs under each
const years = [...new Set(jobs.map((j) => j.year))].sort((a, b) => b - a)
const jobsByYear = years.reduce<Record<number, typeof jobs>>((acc, year) => {
  acc[year] = jobs.filter((j) => j.year === year)
  return acc
}, {})

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs text-[var(--text-muted)] tracking-widest uppercase mb-10"
        >
          Experience
        </motion.p>

        <Tabs
          orientation="vertical"
          defaultValue={String(years[0])}
          className="flex flex-col md:flex-row gap-4 md:gap-8"
        >
          <TabsList
            variant="line"
            className="
              !flex-row overflow-x-auto scrollbar-none border-b border-border
              md:!flex-col md:border-b-0 md:border-l md:min-w-[120px] md:items-start
              gap-0 rounded-none bg-transparent p-0 w-full md:w-auto
            "
          >
            {years.map((year) => (
              <TabsTrigger
                key={year}
                value={String(year)}
                className="
                  shrink-0 rounded-none px-4 py-3 text-sm font-normal
                  text-[var(--text-muted)] hover:text-foreground transition-colors cursor-pointer
                  data-active:text-foreground data-active:!bg-secondary
                  border-b-2 border-transparent data-active:border-b-[var(--accent-blue)]
                  md:w-full md:justify-start md:border-b-0
                  md:data-active:border-l-2 md:data-active:border-[var(--accent-blue)] md:data-active:-ml-px
                  [&::after]:hidden
                "
              >
                {year}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 min-h-[200px]">
            {years.map((year) => (
              <TabsContent key={year} value={String(year)} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-6"
                >
                  {jobsByYear[year].map((job, i) => (
                    <div key={job.id}>
                      {/* Divider between multiple jobs in the same year */}
                      {i > 0 && <div className="border-t border-border mb-6" />}

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-foreground">{job.role}</h3>
                            <Badge variant="outline" className={`${typeBadgeClass[job.type]} capitalize`}>
                              {job.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-[var(--accent-blue)]">
                            {job.company} · {job.location}
                          </p>
                        </div>
                        <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                          {job.monthPeriod}
                        </span>
                      </div>

                      <ul className="flex flex-col gap-3">
                        {job.bullets.map((bullet, j) => (
                          <li key={j} className="flex gap-3 text-sm text-[var(--text-muted)]">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-blue)]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>
            ))}
          </div>
        </Tabs>

        <div className="mt-12 border-t border-border" />
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const jobs = [
  {
    id: "billboxx",
    company: "Billboxx Technologies",
    role: "Frontend Engineer (Remote)",
    location: "US · New York",
    period: "Jun 2021 – Present",
    bullets: [
      "Developing screens and UI components for the web application using React and Tailwind.",
      "Fixing UI issues and integrating backend APIs with Redux Saga.",
    ],
  },
  {
    id: "request-mechanic",
    company: "Request Mechanic",
    role: "Frontend Engineer",
    location: "Remote",
    period: "Jan 2021 – Jun 2021",
    bullets: [
      "Built responsive landing pages and dashboard views using Vue.js.",
      "Collaborated with the design team to implement pixel-perfect UI.",
    ],
  },
  {
    id: "freebeings",
    company: "FreeBeings",
    role: "UI Developer",
    location: "Remote",
    period: "Sep 2020 – Jan 2021",
    bullets: [
      "Developed reusable component library for the platform.",
      "Improved performance of key user flows by 30%.",
    ],
  },
  {
    id: "tdf",
    company: "TDF",
    role: "Web Developer Intern",
    location: "Toronto, CA",
    period: "Jun 2020 – Sep 2020",
    bullets: [
      "Maintained and updated WordPress-based marketing websites.",
      "Implemented new feature pages coordinating with the backend team.",
    ],
  },
  {
    id: "upwork",
    company: "Upwork",
    role: "Freelance Developer",
    location: "Remote",
    period: "2019 – Present",
    bullets: [
      "Delivered 20+ web projects for clients across North America and Europe.",
      "Specialised in React, Next.js, and Tailwind CSS.",
    ],
  },
  {
    id: "shoppy",
    company: "Shoppy",
    role: "Junior Frontend Developer",
    location: "Remote",
    period: "Mar 2019 – Dec 2019",
    bullets: [
      "Built e-commerce product pages and checkout flows.",
      "Integrated Stripe payment gateway and third-party shipping APIs.",
    ],
  },
]

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

        <Tabs orientation="vertical" defaultValue="selfbook" className="flex gap-8">
          <TabsList
            variant="line"
            className="flex-col min-w-[130px] items-start gap-0 border-l border-border rounded-none bg-transparent p-0"
          >
            {jobs.map((job) => (
              <TabsTrigger
                key={job.id}
                value={job.id}
                className="w-full justify-start rounded-none px-4 py-3 text-sm font-normal text-[var(--text-muted)] data-active:text-foreground data-active:border-l-2 data-active:border-[var(--accent-blue)] data-active:-ml-px hover:text-foreground transition-colors"
              >
                {job.company}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex-1 min-h-[200px]">
            {jobs.map((job) => (
              <TabsContent key={job.id} value={job.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{job.role}</h3>
                      <p className="text-sm text-[var(--accent-blue)]">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">{job.period}</span>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {job.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[var(--text-muted)]">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--accent-blue)]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
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

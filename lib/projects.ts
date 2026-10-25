export interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  demo: string | null
  github: string | null
  gradient: string
}

export const projects: Project[] = [
  {
    title: "BuildPanda",
    description:
      "Connects estimating, project management, site progress, inspections, milestones, and payments into one powerful construction operating system.",
    image: "/projects/intense-proxy-1.jpg",
    tags: [
      "React",
      "Typescript",
      "TailwindCSS",
      "Zustand",
      "Websocket",
      "Shadcn",
    ],
    demo: "https://buildpanda.io",
    github: null,
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
  },
  {
    title: "Alcarza",
    description:
      "A mobile booking experience that brings property discovery, stay details, availability, and payment into a journey built around finding the right place to stay.",
    image: "/projects/intense-proxy-1.jpg",
    tags: [
      "React",
      "React Native",
      "Typescript",
      "TailwindCSS",
    ],
    demo: "https://alcarza.com",
    github: null,
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
  },
  {
    title: "Afristakes",
    description:
      "Structured capital platform connecting African businesses with investors",
    image: "/projects/intense-proxy-1.jpg",
    tags: [
      "React",
      "Typescript",
      "TailwindCSS",
      "Zustand",
      "PusherJs",
      "Shadcn",
    ],
    demo: "https://afristakes.com",
    github: null,
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
  },
  {
    title: "Billboxx Technologies",
    description:
      "Handles all invoice-related tasks, including issue, payment, and reconciliation, for businesses of all sizes",
    image: "/projects/aape-coin.jpg",
    tags: ["React", "Typescript", "TailwindCSS", "Zustand", "Shadcn"],
    demo: "https://app.billboxx.com",
    github: null,
    gradient: "from-[#0d1b2a] via-[#1b2838] to-[#2d4a6b]",
  },
  {
    title: "Request Mechanic",
    description:
      "A platform that connects automobile users to the nearest automobile experts.",
    image: "/projects/blockchain-explorer.jpg",
    tags: ["React", "Javascript", "TailwindCSS", "Redux"],
    demo: "https://requestmechanic.com",
    github: null,
    gradient: "from-[#1a0a2e] via-[#2d1b4e] to-[#4a2080]",
  },
  {
    title: "Folawej Laundromat",
    description:
      "World-class laundry experience with self-service facilities, coin-operated machines, and mobile app integration",
    image: "/projects/gitprofile.jpg",
    tags: ["React", "Typescript", "Redux", "Ionic"],
    demo: "https://folawej.com",
    github: null,
    gradient: "from-[#0a2e1a] via-[#0f4d2a] to-[#1a7a42]",
  },
  {
    title: "Bluelight Studios",
    description:
      "Solving user problems through the use of software and technologies",
    image: "/projects/moviedb.jpg",
    tags: ["React.js", "TypeScript", "TailwindCSS", "Redux", "Zustand"],
    demo: "https://www.bluelight.studio",
    github: null,
    gradient: "from-[#2e0a0a] via-[#4d1515] to-[#7a2020]",
  },
];

export const FEATURED_COUNT = 3

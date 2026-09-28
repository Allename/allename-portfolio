import Hero from "@/components/sections/Hero"
import Experience from "@/components/sections/Experience"
import FeaturedProjects from "@/components/sections/FeaturedProjects"
import Marquee from "@/components/Marquee"

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Experience />
      <FeaturedProjects />
      {/* <MoreProjects /> */}
    </>
  )
}

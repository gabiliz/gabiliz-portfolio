import ContactSection from '@/components/home/ContactSection'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import Hero from '@/components/home/Hero'
import PathSection from '@/components/home/PathSection'
import StackTicker from '@/components/home/StackTicker'
import StatsBand from '@/components/home/StatsBand'

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBand />
      <StackTicker />
      <FeaturedProjects />
      <PathSection />
      <ContactSection />
    </main>
  )
}

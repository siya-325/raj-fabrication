import { PageShell } from '@/components/layout/PageShell'
import { Hero } from '@/components/sections/home/Hero'
import { AboutPreview } from '@/components/sections/home/AboutPreview'
import { ServicesPreview } from '@/components/sections/home/ServicesPreview'
import { ProjectsPreview } from '@/components/sections/home/ProjectsPreview'
import { ProcessPreview } from '@/components/sections/home/ProcessPreview'
import { WhyChooseUs } from '@/components/sections/home/WhyChooseUs'
import { Reviews } from '@/components/sections/home/Reviews'
import { FAQ } from '@/components/sections/home/FAQ'
import { FinalCTA } from '@/components/sections/home/FinalCTA'

export default function HomePage() {
  return (
    <PageShell navVariant="transparent">
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProjectsPreview />
      <ProcessPreview />
      <WhyChooseUs />
      <Reviews />
      <FAQ />
      <FinalCTA />
    </PageShell>
  )
}

import type { Metadata } from 'next'
import { PageShell } from '@/components/layout/PageShell'
import { ProjectsHero } from '@/components/sections/projects/ProjectsHero'
import { ProjectsGallery } from '@/components/sections/projects/ProjectsGallery'
import { ProjectsCTA } from '@/components/sections/projects/ProjectsCTA'

export const metadata: Metadata = {
  title: 'Our Work & Selected Projects | Raj Fabrication Ahmedabad',
  description: 'View custom gates, structural steelwork, railings, and workshop fabrication completed by Raj Fabrication in Ahmedabad.',
}

export default function ProjectsPage() {
  return (
    <PageShell navVariant="transparent">
      <ProjectsHero />
      <ProjectsGallery />
      <ProjectsCTA />
    </PageShell>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Container } from '@/components/ui/Container'
import { ProjectCard } from '@/components/sections/projects/ProjectCard'
import { ProjectFullscreenModal } from '@/components/sections/projects/ProjectFullscreenModal'
import { cn } from '@/lib/utils'

import {
  portfolioProjects,
  projectCategories,
  type ProjectCategory,
  type ProjectItem,
} from '@/data/projects'

export {
  portfolioProjects,
  projectCategories,
  type ProjectCategory,
  type ProjectItem,
}


export function ProjectsGallery() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All Projects')
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)

  const filteredProjects = activeCategory === 'All Projects'
    ? portfolioProjects
    : portfolioProjects.filter((item) => item.category === activeCategory)

  return (
    <section className="section-space">
      <Container>
        {/* Category filters centered and horizontally scrollable */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="no-scrollbar flex overflow-x-auto pb-2 gap-2.5 scroll-smooth max-w-full">
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => {
                    setActiveCategory(cat)
                    setFullscreenIndex(null)
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center',
                    })
                  }}
                  className={cn(
                    'shrink-0 inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 select-none whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue',
                    isActive
                      ? 'bg-steel-blue text-white shadow-sm border border-steel-blue'
                      : 'bg-surface text-charcoal/80 border border-line hover:border-charcoal/30 hover:bg-surface/80'
                  )}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Gallery grid with smooth animated filtering */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item, idx) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  title={item.title}
                  category={item.category}
                  image={item.image}
                  onClick={() => setFullscreenIndex(idx)}
                  priority={idx < 3}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {fullscreenIndex !== null && (
          <ProjectFullscreenModal
            projects={filteredProjects}
            currentIndex={fullscreenIndex}
            onClose={() => setFullscreenIndex(null)}
            onSelectIndex={(index) => setFullscreenIndex(index)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

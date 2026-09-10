'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { featuredServices } from '@/data/services'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'

export function ServicesPreview() {
  return (
    <section id="services" className="section-space border-y border-line bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            layout="split"
            label="What we do"
            title="Built around your requirement."
            action={
              <Button
                variant="link"
                href="/services"
                rightIcon={<ArrowUpRight size={15} />}
                className="hidden lg:inline-flex text-steel-blue font-mono uppercase tracking-[0.14em] text-xs"
              >
                View all services
              </Button>
            }
          />
        </Reveal>

        {/* Services grid orchestrated with Stagger */}
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredServices.map((service, index) => (
            <StaggerItem key={service.id} className="h-full">
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className="h-full">
                <Card variant="default" className="group flex flex-col h-full overflow-hidden shadow-xs">
                  <Link
                    href={`/services?service=${encodeURIComponent(service.id)}`}
                    className="relative aspect-[4/3] overflow-hidden bg-steel shrink-0 block"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      priority={index === 0}
                      className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.95]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  </Link>
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <SectionLabel tone="steel-blue" indicator>
                      {service.tag}
                    </SectionLabel>
                    <h3 className="mt-4 text-xl sm:text-2xl font-medium tracking-tight text-charcoal">
                      <Link
                        href={`/services?service=${encodeURIComponent(service.id)}`}
                        className="hover:text-steel-blue transition-colors"
                      >
                        {service.title}
                      </Link>
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted text-sm sm:text-base flex-1">
                      {service.description}
                    </p>
                    <div className="mt-6 pt-2">
                      <Button
                        variant="link"
                        href={`/services?service=${encodeURIComponent(service.id)}`}
                        rightIcon={<ArrowUpRight size={14} />}
                        className="text-charcoal font-mono uppercase tracking-[0.14em] text-xs"
                      >
                        Learn more
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Center bottom action button (Mobile & Tablet only) */}
        <div className="mt-10 flex lg:hidden justify-center">
          <Reveal delay={0.2}>
            <Button
              variant="steel-blue"
              size="md"
              href="/services"
              rightIcon={<ArrowUpRight size={15} />}
            >
              View all services
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}


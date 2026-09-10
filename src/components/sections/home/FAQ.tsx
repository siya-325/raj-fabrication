'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronDown, MessageCircle, ArrowUpRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/motion/Reveal'
import { getWhatsAppUrl } from '@/lib/helpers'
import { cn } from '@/lib/utils'

const faqItems = [
  {
    number: '01',
    question: 'Do you offer customised orders?',
    answer:
      'Yes, absolutely. Custom metalwork is our core specialty. Whether you bring architectural drawings, reference photos, or need us to visit your site for on-site measurements, we fabricate mild steel gates, railings, structural frames, and custom fixtures tailored precisely to your requirements.',
  },
  {
    number: '02',
    question: 'Will Raj Fabrication deliver the finished item to my address?',
    answer:
      'Yes. We handle direct transportation and delivery of all finished fabrication structures across Ahmedabad, Gandhinagar, and surrounding industrial belts. Our skilled team also manages complete on-site erection, welding, and alignment for a turnkey handover.',
  },
  {
    number: '03',
    question: 'Can Raj Fabrication create custom products from scratch?',
    answer:
      'Yes. Our workshop craftsmen are experienced in designing, cutting, and assembling metal products from scratch using raw mild steel sections, hollow pipes, and structural plates according to the exact functional and aesthetic specifications of each client.',
  },
  {
    number: '04',
    question: 'What are the three primary fabricating techniques?',
    answer:
      'The three fundamental metal fabrication stages are cutting (shearing, sawing, and precision laser cutting), bending (forming steel profiles and sheets into specified angles), and assembling (structural welding, joint grinding, and protective anti-rust primer coating).',
  },
  {
    number: '05',
    question: 'Does Raj Fabrication perform quality inspections?',
    answer:
      'Yes. Every finished assembly undergoes thorough quality checks for structural stability, weld bead penetration, millimeter-accurate dimensions, smooth joint grinding, and anti-rust surface protection before it leaves our workshop.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const whatsAppUrl = getWhatsAppUrl({
    text: 'Hello Raj Fabrication, I have a question regarding custom fabrication services.',
  })

  return (
    <section id="faq" className="section-space border-t border-line bg-surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 items-start">
          {/* Left Column: Heading and Assistance Card */}
          <div className="space-y-8">
            <Reveal>
              <SectionHeading
                label="Common Queries"
                labelTone="steel-blue"
                title="Frequently asked questions."
                description="Everything you need to know about our fabrication capabilities, custom orders, delivery, and quality standards."
                className="max-w-xl"
              />
            </Reveal>

            <Reveal delay={0.15} className="hidden lg:block">
              <Card variant="default" className="p-6 sm:p-7 border border-line bg-background rounded-lg shadow-xs space-y-4">
                <h3 className="text-xl font-medium tracking-tight text-charcoal">
                  Have a specific fabrication requirement?
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  Send your project sketch, dimensions, or site location directly to our workshop team on WhatsApp for an immediate assessment.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button
                    variant="copper"
                    size="sm"
                    href={whatsAppUrl}
                    target="_blank"
                    rightIcon={<MessageCircle size={15} />}
                  >
                    Chat on WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    href="/contact"
                    rightIcon={<ArrowUpRight size={14} />}
                  >
                    Send inquiry
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="space-y-3.5">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index
              return (
                <Reveal key={item.number} delay={index * 0.08} direction="up" distance={16}>
                  <div
                    className={cn(
                      'rounded-lg border bg-background transition-all duration-300 overflow-hidden shadow-xs',
                      isOpen
                        ? 'border-steel-blue/40 ring-1 ring-steel-blue/15'
                        : 'border-line hover:border-line/80'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-steel-blue/50"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-semibold text-steel-blue shrink-0 tracking-wider">
                          {item.number}
                        </span>
                        <h4 className="text-base sm:text-lg font-medium text-charcoal tracking-tight leading-snug">
                          {item.question}
                        </h4>
                      </div>
                      <div
                        className={cn(
                          'flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-muted transition-transform duration-300',
                          isOpen && 'rotate-180 bg-charcoal text-white border-charcoal'
                        )}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-line/50">
                            <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted pl-7 sm:pl-8">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

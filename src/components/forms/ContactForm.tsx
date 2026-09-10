'use client'

import { useState, type FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { getWhatsAppUrl } from '@/lib/helpers'
import { BUSINESS_INFO } from '@/lib/constants'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'MS fabrication',
    location: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate quick submission
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 600)
  }

  const whatsAppText = `Hello Raj Fabrication, I am ${formData.name || 'interested in a quote'}. ${formData.email ? `Email: ${formData.email}. ` : ''}Requirement: ${formData.service}. Area: ${formData.location || 'Ahmedabad'}. Details: ${formData.message || 'Please provide details.'}`
  const whatsAppUrl = getWhatsAppUrl({ text: whatsAppText })

  if (submitted) {
    return (
      <div className="rounded-lg border border-line bg-surface p-8 text-center sm:p-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-copper/10 text-copper">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="mt-4 text-2xl font-medium tracking-tight text-charcoal">
          Thank you for reaching out!
        </h3>
        <p className="mt-2 text-muted text-base leading-relaxed max-w-md mx-auto">
          We have received your requirement. A representative from {BUSINESS_INFO.name} will call you back shortly.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="copper"
            size="sm"
            href={whatsAppUrl}
            target="_blank"
            rightIcon={<MessageCircle size={16} />}
          >
            Chat on WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitted(false)}
          >
            Send another message
          </Button>
          <Button
            variant="white"
            size="sm"
            href={BUSINESS_INFO.maps}
            target="_blank"
            rightIcon={<ArrowUpRight size={15} />}
          >
            Visit Workshop
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-line bg-surface p-6 sm:p-8 shadow-xs"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
            Your Name <span className="text-copper">*</span>
          </label>
          <input
            id="name"
            required
            type="text"
            placeholder="e.g. Rahul Patel"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
            Phone / WhatsApp Number <span className="text-copper">*</span>
          </label>
          <input
            id="phone"
            required
            type="tel"
            placeholder="e.g. +91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
            Email Address <span className="text-copper">*</span>
          </label>
          <input
            id="email"
            required
            type="email"
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-charcoal mb-2">
            Project Location / Area
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Satellite, Bopal, Vastrapur"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className="block text-sm font-semibold text-charcoal mb-2">
            Required Service
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-charcoal focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
          >
            <option value="MS fabrication">Mild Steel (MS) Fabrication</option>
            <option value="Custom metalwork">Custom Metalwork</option>
            <option value="Welding services">Welding & Repairs</option>
            <option value="Structural steelwork">Structural Steelwork</option>
            <option value="Gates & Railings">Gates & Balcony Railings</option>
            <option value="Not sure / Help me decide">Not sure / Help me decide</option>
            <option value="Other">Other Requirement</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
          Requirement Details & Dimensions
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Briefly describe what you need made, approximate dimensions, or site specifications..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal resize-y"
        />
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          variant="copper"
          size="lg"
          disabled={loading}
          rightIcon={<Send size={16} />}
          className="cursor-pointer"
        >
          {loading ? 'Submitting...' : 'Submit inquiry'}
        </Button>
      </div>
    </form>
  )
}

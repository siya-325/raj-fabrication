'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Send, AlertCircle, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { site } from '@/data/site'
import { getWhatsAppUrl } from '@/lib/helpers'
import {
  validateName,
  validatePhone,
  validateEmail,
  validateLocation,
  validateService,
  validateMessage,
} from '@/lib/validation'

type FieldName = 'name' | 'phone' | 'email' | 'location' | 'service' | 'message'

const INITIAL_FORM_DATA = {
  name: '',
  phone: '',
  email: '',
  location: '',
  service: '',
  message: '',
}

const INITIAL_TOUCHED: Record<FieldName, boolean> = {
  name: false,
  phone: false,
  email: false,
  location: false,
  service: false,
  message: false,
}

export function ContactForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [touched, setTouched] = useState<Record<FieldName, boolean>>(INITIAL_TOUCHED)
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')

  const validateField = (field: FieldName, value: string): string | null => {
    switch (field) {
      case 'name':
        return validateName(value)
      case 'phone':
        return validatePhone(value)
      case 'email':
        return validateEmail(value)
      case 'location':
        return validateLocation(value)
      case 'service':
        return validateService(value)
      case 'message':
        return validateMessage(value)
      default:
        return null
    }
  }

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])
    setErrors((prev) => {
      const next = { ...prev }
      if (error) {
        next[field] = error
      } else {
        delete next[field]
      }
      return next
    })
  }

  const handleChange = (field: FieldName, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (submitError) setSubmitError(null)

    // If already interacted with or currently showing an error, revalidate live while user corrects it
    if (touched[field] || errors[field]) {
      const error = validateField(field, value)
      setErrors((prev) => {
        const next = { ...prev }
        if (error) {
          next[field] = error
        } else {
          delete next[field]
        }
        return next
      })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Prevent multiple submissions while already loading
    if (loading) return

    setSubmitError(null)

    // Mark all fields as touched
    setTouched({
      name: true,
      phone: true,
      email: true,
      location: true,
      service: true,
      message: true,
    })

    // Validate every field at once
    const newErrors: Partial<Record<FieldName, string>> = {}
    const fieldOrder: FieldName[] = ['name', 'phone', 'email', 'location', 'service', 'message']

    for (const field of fieldOrder) {
      const err = validateField(field, formData[field])
      if (err) {
        newErrors[field] = err
      }
    }

    setErrors(newErrors)

    // Focus and scroll to the first invalid field
    const firstInvalidField = fieldOrder.find((field) => newErrors[field])
    if (firstInvalidField) {
      const element = document.getElementById(firstInvalidField)
      if (element) {
        element.focus()
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    // Validation succeeded -> proceed with real API submission
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          website_honey: honeypot,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        if (data.errors && typeof data.errors === 'object') {
          setErrors(data.errors)
        }
        setSubmitError(
          data.error || 'Failed to submit inquiry. Please try again or call our workshop directly.'
        )
        setLoading(false)
        return
      }

      // Success -> navigate to Thank You page
      // Using window.location.assign ensures a genuine page navigation so any analytics tracking
      // (Google Analytics, Ads, Pixels) fires immediately without requiring a manual page refresh
      window.location.assign('/thank-you')
    } catch (err) {
      console.error('Contact form submission error:', err)
      setSubmitError(
        'Unable to connect right now. Please call or message us directly on WhatsApp.'
      )
      setLoading(false)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg border border-line bg-surface p-6 sm:p-8 shadow-xs"
    >
      {/* Anti-spam Honeypot field (hidden from human users & screen readers) */}
      <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="website_honey">Leave this field blank</label>
        <input
          id="website_honey"
          type="text"
          name="website_honey"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50/90 p-4 text-sm text-red-800"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-red-600" />
            <div className="flex-1 space-y-2">
              <p className="font-semibold text-red-900">{submitError}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`tel:${site.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-900 border border-red-200 shadow-2xs hover:bg-red-50 transition-colors"
                >
                  <Phone size={13} /> Call {site.phone}
                </a>
                <a
                  href={getWhatsAppUrl({
                    text: 'Hello Raj Fabrication, I am reaching out regarding a project.',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={13} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
            Your Name <span className="text-copper">*</span>
          </label>
          <input
            id="name"
            type="text"
            maxLength={100}
            placeholder="e.g. Rahul Patel"
            value={formData.name}
            onChange={(e) => {
              // Prevent multiple consecutive spaces
              const cleaned = e.target.value.replace(/\s{2,}/g, ' ')
              handleChange('name', cleaned)
            }}
            onBlur={() => handleBlur('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={cn(
              'w-full rounded-xl border bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-1 transition-colors',
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-line focus:border-charcoal focus:ring-charcoal'
            )}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
            Phone / WhatsApp Number <span className="text-copper">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            maxLength={17}
            placeholder="e.g. +91 98765 43210"
            value={formData.phone}
            onChange={(e) => {
              // Restrict typed characters to valid phone characters: digits, +, spaces, hyphens
              const val = e.target.value
              if (/^[0-9+\s-]*$/.test(val)) {
                handleChange('phone', val)
              }
            }}
            onBlur={() => handleBlur('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={cn(
              'w-full rounded-xl border bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-1 transition-colors',
              errors.phone
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-line focus:border-charcoal focus:ring-charcoal'
            )}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
            Email Address <span className="text-copper">*</span>
          </label>
          <input
            id="email"
            type="email"
            maxLength={254}
            placeholder="e.g. rahul@example.com"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={cn(
              'w-full rounded-xl border bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-1 transition-colors',
              errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-line focus:border-charcoal focus:ring-charcoal'
            )}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-charcoal mb-2">
            Project Location / Area
          </label>
          <input
            id="location"
            type="text"
            maxLength={150}
            placeholder="e.g. Satellite, Bopal, Vastrapur"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            onBlur={() => handleBlur('location')}
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? 'location-error' : undefined}
            className={cn(
              'w-full rounded-xl border bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-1 transition-colors',
              errors.location
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-line focus:border-charcoal focus:ring-charcoal'
            )}
          />
          {errors.location && (
            <p id="location-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.location}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="service" className="block text-sm font-semibold text-charcoal mb-2">
            Required Service <span className="text-copper">*</span>
          </label>
          <select
            id="service"
            value={formData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            onBlur={() => handleBlur('service')}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? 'service-error' : undefined}
            className={cn(
              'w-full rounded-xl border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-1 transition-colors',
              !formData.service ? 'text-muted/60' : 'text-charcoal',
              errors.service
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-line focus:border-charcoal focus:ring-charcoal'
            )}
          >
            <option value="" disabled>Select a required service</option>
            <option value="MS fabrication">Mild Steel (MS) Fabrication</option>
            <option value="Custom metalwork">Custom Metalwork</option>
            <option value="Welding services">Welding & Repairs</option>
            <option value="Structural steelwork">Structural Steelwork</option>
            <option value="Gates & Railings">Gates & Balcony Railings</option>
            <option value="Not sure / Help me decide">Not sure / Help me decide</option>
            <option value="Other">Other Requirement</option>
          </select>
          {errors.service && (
            <p id="service-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
              {errors.service}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
          Requirement Details & Dimensions
        </label>
        <textarea
          id="message"
          rows={4}
          maxLength={1000}
          placeholder="Briefly describe what you need made, approximate dimensions, or site specifications..."
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={cn(
            'w-full rounded-xl border bg-background px-4 py-3 text-sm text-charcoal placeholder:text-muted/60 focus:outline-none focus:ring-1 resize-y transition-colors',
            errors.message
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-line focus:border-charcoal focus:ring-charcoal'
          )}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600">
            {errors.message}
          </p>
        )}
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

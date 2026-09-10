import { BUSINESS_INFO } from './constants'

/**
 * Strips all non-digit characters except a leading plus sign.
 */
export function cleanPhoneNumber(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

/**
 * Formats a 10-digit Indian phone number into readable format: +91 98765 43210
 */
export function formatPhoneNumber(phone: string): string {
  let digits = phone.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
  }
  return phone
}

/**
 * Builds a direct WhatsApp click-to-chat URL with optional prefilled message text.
 */
export function getWhatsAppUrl({
  phone = BUSINESS_INFO.whatsapp,
  text = '',
}: {
  phone?: string
  text?: string
} = {}): string {
  let digits = cleanPhoneNumber(phone).replace(/^\+/, '')
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1)
  }
  const cleanPhone = digits.startsWith('91') ? digits : `91${digits}`
  const encodedText = text ? encodeURIComponent(text.trim()) : ''

  return `https://wa.me/${cleanPhone}${encodedText ? `?text=${encodedText}` : ''}`
}

/**
 * Converts strings to URL-safe kebab-case slugs (e.g. "MS Fabrication" -> "ms-fabrication").
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Truncates long text gracefully with an ellipsis.
 */
export function truncateText(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

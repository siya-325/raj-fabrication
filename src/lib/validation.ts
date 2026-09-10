/**
 * Client-side form validation rules and constraints for Raj Fabrication
 */

export const VALID_SERVICES = [
  'MS fabrication',
  'Custom metalwork',
  'Welding services',
  'Structural steelwork',
  'Gates & Railings',
  'Not sure / Help me decide',
  'Other',
] as const

export type ValidService = (typeof VALID_SERVICES)[number]

/**
 * 1. YOUR NAME *
 * - Required field.
 * - Accept only letters, spaces, and common name characters such as apostrophes (') and hyphens (-).
 * - Do not allow numbers.
 * - Do not allow special characters such as @, #, $, %, etc.
 * - Trim leading and trailing spaces.
 * - Do not allow the input to consist only of spaces.
 * - Minimum length: 2 characters.
 * - Maximum length: 100 characters.
 */
export function validateName(value: string): string | null {
  if (!value) {
    return 'Please enter your name.'
  }

  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return 'Please enter your name.'
  }

  // Reject numbers and disallowed special characters (@, #, $, %, etc.)
  // Only letters, spaces, hyphens, and apostrophes are allowed
  const validCharsRegex = /^[\p{L}\s'-]+$/u
  if (!validCharsRegex.test(trimmed)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes.'
  }

  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters.'
  }

  if (trimmed.length > 100) {
    return 'Name cannot exceed 100 characters.'
  }

  return null
}

/**
 * 2. PHONE / WHATSAPP NUMBER *
 * - Required field.
 * - Accept valid Indian phone numbers.
 * - Allow the user to enter the number with or without the +91 country code.
 * - Also allow spaces or hyphens while typing, but validate the actual digits correctly.
 * - After removing +91, spaces, and hyphens, the mobile number must contain exactly 10 digits.
 * - The 10-digit Indian mobile number must start with 6, 7, 8, or 9.
 * - Do not allow alphabetic characters.
 * - Do not allow more than a valid Indian phone number length.
 */
export function validatePhone(value: string): string | null {
  if (!value) {
    return 'Please enter your phone number.'
  }

  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return 'Please enter your phone number.'
  }

  // Reject alphabetic characters
  if (/[a-zA-Z]/.test(trimmed)) {
    return 'Please enter a valid 10-digit Indian mobile number.'
  }

  // Reject any character that is not a digit, leading +, space, or hyphen
  if (!/^[0-9+\s-]+$/.test(trimmed)) {
    return 'Please enter a valid 10-digit Indian mobile number.'
  }

  // If '+' is present, it must be the very first character and appear only once
  if (trimmed.includes('+')) {
    if (!trimmed.startsWith('+') || (trimmed.match(/\+/g) || []).length > 1) {
      return 'Please enter a valid 10-digit Indian mobile number.'
    }
  }

  // Extract pure digits
  const digits = trimmed.replace(/\D/g, '')

  let tenDigitNumber = ''

  if (trimmed.startsWith('+91')) {
    // With +91 prefix, total digits must be 12 starting with 91
    if (digits.startsWith('91') && digits.length === 12) {
      tenDigitNumber = digits.slice(2)
    } else {
      return 'Please enter a valid 10-digit Indian mobile number.'
    }
  } else if (digits.length === 12 && digits.startsWith('91')) {
    // 91 followed by 10 digits
    tenDigitNumber = digits.slice(2)
  } else if (digits.length === 11 && digits.startsWith('0')) {
    // 0 followed by 10 digits
    tenDigitNumber = digits.slice(1)
  } else if (digits.length === 10) {
    tenDigitNumber = digits
  } else {
    return 'Please enter a valid 10-digit Indian mobile number.'
  }

  // The 10-digit Indian mobile number must start with 6, 7, 8, or 9
  if (!/^[6-9]\d{9}$/.test(tenDigitNumber)) {
    return 'Please enter a valid 10-digit Indian mobile number.'
  }

  return null
}

/**
 * 3. EMAIL ADDRESS *
 * - Required field.
 * - Trim leading and trailing spaces.
 * - Validate using a proper email validation pattern.
 * - Must contain a valid local part, @ symbol, and domain.
 * - Reject clearly invalid formats like:
 *   - rahul@
 *   - @gmail.com
 *   - rahul@gmail
 *   - rahul gmail.com
 */
export function validateEmail(value: string): string | null {
  if (!value) {
    return 'Please enter your email address.'
  }

  const trimmed = value.trim()
  if (trimmed.length === 0) {
    return 'Please enter your email address.'
  }

  // RFC-compliant email pattern requiring valid local part, @, domain labels, and >=2 char TLD
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/

  if (!emailRegex.test(trimmed) || trimmed.includes('..')) {
    return 'Please enter a valid email address.'
  }

  if (trimmed.length > 254) {
    return 'Please enter a valid email address.'
  }

  return null
}

/**
 * 4. PROJECT LOCATION / AREA
 * - Optional field.
 * - The form should still submit successfully if this field is empty.
 * - Trim leading and trailing spaces.
 * - Maximum length: 150 characters.
 * - Do not allow the value to consist only of spaces.
 * - Allow normal location-related characters including letters, numbers, spaces, commas, periods, hyphens, and slashes.
 */
export function validateLocation(value: string): string | null {
  if (!value || value.length === 0) {
    return null
  }

  if (value.trim().length === 0) {
    return 'Location cannot consist only of spaces.'
  }

  const trimmed = value.trim()

  if (trimmed.length > 150) {
    return 'Location cannot exceed 150 characters.'
  }

  const locationRegex = /^[\p{L}0-9\s,.\-\/'()#&]+$/u
  if (!locationRegex.test(trimmed)) {
    return 'Location contains invalid characters.'
  }

  return null
}

/**
 * 5. REQUIRED SERVICE
 * - Required field.
 * - User must select a valid service option from the existing dropdown options.
 * - Do not allow an empty/default placeholder value to be submitted.
 */
export function validateService(value: string): string | null {
  if (!value || !value.trim()) {
    return 'Please select a required service.'
  }

  if (!VALID_SERVICES.includes(value as any)) {
    return 'Please select a required service.'
  }

  return null
}

/**
 * 6. REQUIREMENT DETAILS & DIMENSIONS
 * - Optional field.
 * - The form should submit successfully if this field is empty.
 * - Trim unnecessary leading and trailing spaces.
 * - Do not allow the value to consist only of spaces.
 * - Maximum length: 1000 characters.
 * - Allow normal text, numbers, dimensions, units, and common punctuation.
 */
export function validateMessage(value: string): string | null {
  if (!value || value.length === 0) {
    return null
  }

  if (value.trim().length === 0) {
    return 'Requirement details cannot consist only of spaces.'
  }

  const trimmed = value.trim()

  if (trimmed.length > 1000) {
    return 'Requirement details cannot exceed 1000 characters.'
  }

  return null
}

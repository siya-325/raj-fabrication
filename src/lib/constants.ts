/**
 * Central motion easing curves and animation presets.
 * Architectural cubic-bezier provides natural deceleration with solid, premium weight.
 */
export const EASE_ARCHITECTURAL = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

export const MOTION_TRANSITION = {
  duration: 0.65,
  ease: EASE_ARCHITECTURAL,
} as const

/**
 * Site & Business Information
 */
export const BUSINESS_INFO = {
  name: 'Raj Fabrication',
  shortName: 'RF',
  established: '2012',
  location: 'Satellite, Ahmedabad',
  address: 'Shop No. 7180, Opposite Super Society, Behind ISRO House, Ramdevnagar Road, Satellite – 380015',
  pincode: '380015',
  city: 'Ahmedabad',
  state: 'Gujarat',
  country: 'India',
  phone: '+91 98250 00000',
  whatsapp: '+91 98250 00000',
  instagram: 'https://www.instagram.com/rajfabrication015/',
  instagramHandle: '@rajfabrication015',
  maps: 'https://www.google.com/maps/place/Raj+Fabrication/@23.0164302,72.4935926,17z',
  hours: {
    weekdays: 'Monday – Saturday: 9:00 AM – 8:00 PM',
    sunday: 'Sunday: By prior appointment',
  },
  brandAccent: '#D08A27',
} as const

/**
 * SEO & Meta defaults
 */
export const SITE_META = {
  title: 'Raj Fabrication | Custom Metalwork & MS Fabrication Ahmedabad',
  description: 'Custom fabrication, welding, and practical mild steel metalwork for homes, businesses, and industrial needs in Satellite, Ahmedabad.',
  siteUrl: 'https://rajfabrication.in',
  locale: 'en_IN',
} as const

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
  phone: '08393889380',
  whatsapp: '08393889380',
  instagram: 'https://www.instagram.com/rajfabrication015/',
  instagramHandle: '@rajfabrication015',
  googleProfile: 'https://maps.app.goo.gl/6rZBTfmWanzRZqcWA',
  justdial: 'https://www.justdial.com/Ahmedabad/Raj-Fabrication/079PXX79-XX79-131119130904-M1S2_BZDET',
  maps: 'https://maps.app.goo.gl/6rZBTfmWanzRZqcWA',
  hours: {
    weekdays: 'Monday – Sunday: 9:00 AM – 9:00 PM',
    sunday: 'Monday – Sunday: 9:00 AM – 9:00 PM',
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

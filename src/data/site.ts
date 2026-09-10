export const site = {
  name: 'Raj Fabrication',
  location: 'Satellite, Ahmedabad',
  address: 'Shop No. 7180, Opposite Super Society, Behind ISRO House, Ramdevnagar Road, Satellite – 380015',
  email: 'rajfabrication015@gmail.com',
  phone: '+91 98250 00000',
  instagram: 'https://www.instagram.com/rajfabrication015/',
  maps: 'https://www.google.com/maps/place/Raj+Fabrication/@23.0164302,72.4935926,17z',
  established: '2012',
  hours: 'Monday – Saturday: 9:00 AM – 8:00 PM',
} as const

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const


export const processSteps = [
  { number: '01', title: 'Understand', text: 'We listen to the requirement, assess the space, and align on the right material and finish.' },
  { number: '02', title: 'Fabricate', text: 'Every piece is measured, cut, joined, and finished with attention to strength and detail.' },
  { number: '03', title: 'Deliver', text: 'A dependable finished solution, ready for the space it was made for.' },
] as const

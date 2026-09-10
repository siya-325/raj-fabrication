export const site = {
  name: 'Raj Fabrication',
  location: 'Satellite, Ahmedabad',
  address: 'Shop No. 7180, Opposite Super Society, Behind ISRO House, Ramdevnagar Road, Satellite – 380015',
  email: 'rajfabrication015@gmail.com',
  phone: '08393889380',
  instagram: 'https://www.instagram.com/rajfabrication015/',
  googleProfile: 'https://maps.app.goo.gl/6rZBTfmWanzRZqcWA',
  justdial: 'https://www.justdial.com/Ahmedabad/Raj-Fabrication/079PXX79-XX79-131119130904-M1S2_BZDET',
  maps: 'https://maps.app.goo.gl/6rZBTfmWanzRZqcWA',
  established: '2012',
  hours: 'Monday – Sunday: 9:00 AM – 9:00 PM',
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

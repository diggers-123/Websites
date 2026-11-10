/**
 * MUDDY PAWS DOG GROOMING — Harrogate. FICTIONAL demonstration data.
 * Grooming prices are by dog size; see `sizes` and `services` below.
 */
import { defineSite, hours } from '@site/core';

export const site = defineSite({
  slug: 'muddy-paws',
  name: 'Muddy Paws Dog Grooming',
  tagline: 'Gentle dog grooming in Harrogate',
  isFictional: true,
  owner: { name: 'Beth Clarkson', title: 'Owner & groomer' },
  founded: 2019,
  phone: '01423 880 316',
  phoneHref: '+441423880316',
  email: 'woof@muddypaws.example.co.uk',
  address: { line1: '22 Cold Bath Road', town: 'Harrogate', county: 'North Yorkshire', postcode: 'HG2 0NA', lat: 53.9906, lng: -1.5445 },
  serviceAreas: ['Harrogate', 'Knaresborough', 'Pannal', 'Killinghall', 'Ripon', 'Wetherby', 'Boroughbridge'],
  postcodePrefixes: ['HG', 'LS22', 'LS23', 'YO51'],
  hours: hours({ mon: null, tue: ['08:30', '17:00'], wed: ['08:30', '17:00'], thu: ['08:30', '18:30'], fri: ['08:30', '17:00'], sat: ['08:00', '15:00'], sun: null }),
  social: { instagram: 'https://instagram.com/', facebook: 'https://facebook.com/', google: 'https://maps.google.com/' },
  nav: [
    { label: 'Grooms & prices', href: '/services' },
    { label: 'Puppy\'s first groom', href: '/puppies' },
    { label: 'About Beth', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
  footerNav: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms & cancellations', href: '/terms' },
    { label: 'Image credits', href: '/credits' },
  ],
  primaryCta: { label: 'Book a groom', href: '/book' },
  secondaryCta: { label: 'See prices', href: '/services' },
  services: [
    { slug: 'full-groom', name: 'Full groom', summary: 'Bath, blow-dry, full clip or scissor styling, nails, ears, and a sanitary trim. The works.', price: 'From £38', pricePence: 3800, durationMins: 120, bookable: true, includes: ['Warm bath & conditioner', 'Blow-dry & brush-out', 'Clip or scissor style', 'Nails, ears, pads', 'Bandana or bow'] },
    { slug: 'bath-and-tidy', name: 'Bath & tidy', summary: 'Bath, dry, brush-out and a tidy of face, feet and bottom. No full clip.', price: 'From £26', pricePence: 2600, durationMins: 75, bookable: true, includes: ['Warm bath & conditioner', 'Blow-dry & brush-out', 'Face, feet & sanitary tidy', 'Nails'] },
    { slug: 'puppy-intro', name: 'Puppy introduction', summary: 'For under-6-months. A short, gentle first visit: bath, dry, a little trim, lots of treats.', price: '£22', pricePence: 2200, durationMins: 45, bookable: true, includes: ['Gentle bath & dry', 'Nail trim', 'Face & feet tidy', 'Getting used to the clippers (off)'] },
    { slug: 'deshed', name: 'De-shed treatment', summary: 'For double-coated dogs that are leaving themselves all over your sofa. Bath, de-shed shampoo, high-velocity dry and a serious brush-out.', price: 'From £34', pricePence: 3400, durationMins: 90, bookable: true, includes: ['De-shed shampoo', 'High-velocity blow-out', 'Undercoat rake', 'Nails'] },
    { slug: 'hand-strip', name: 'Hand stripping', summary: 'For wire-coated breeds — terriers, spaniels, schnauzers. Keeps the coat\'s texture and colour.', price: 'From £48', pricePence: 4800, durationMins: 150, bookable: true, includes: ['Hand strip', 'Bath & dry', 'Nails, ears, pads'] },
    { slug: 'nails', name: 'Nail trim', summary: 'Walk in, nails done, walk out. Ten minutes.', price: '£10', pricePence: 1000, durationMins: 15, bookable: true, includes: ['Nail clip & file'] },
  ],
  team: [
    { name: 'Beth Clarkson', role: 'Owner & groomer', bio: 'City & Guilds Level 3 (fictional), eight years grooming, and a soft spot for anxious dogs. Trained with a behaviourist so nervous first-timers get the slow version.', image: { src: 'groomer', alt: 'Beth holding a scruffy border terrier in the salon' } },
  ],
  testimonials: [
    { quote: 'Our cockapoo used to shake at the word "groomer". Now he drags me through the door. Beth is magic.', name: 'Hannah L.', context: 'Harrogate · Cockapoo', rating: 5, source: 'google' },
    { quote: 'Honest about what my spaniel\'s coat could and couldn\'t do, and the result was better than the photo I brought.', name: 'Richard T.', context: 'Knaresborough · Springer', rating: 5, source: 'google' },
    { quote: 'Booked online at 10pm, confirmed by morning, dog back smelling of coconut by lunch. Easy.', name: 'Priya M.', context: 'Pannal · Labrador', rating: 5, source: 'facebook' },
    { quote: 'The de-shed is worth every penny. I\'ve hoovered once this week instead of daily.', name: 'Gemma W.', context: 'Ripon · Golden retriever', rating: 5, source: 'google' },
  ],
  faqs: [
    { q: 'How much will my dog\'s groom cost?', a: 'Prices depend on size and coat. The booking page gives you an exact price once you pick a size and service; the services page shows the full table. Severely matted coats may need extra time — we will always ring you before doing anything that changes the price.' },
    { q: 'How long does a groom take?', a: 'A full groom is around two hours for a medium dog; a bath & tidy about 75 minutes. We text you when they are nearly ready rather than asking you to wait in the car.' },
    { q: 'My dog is nervous. Can you help?', a: 'Yes — it is a speciality. We book nervous dogs into quieter slots, go slowly, and sometimes split a first groom over two short visits. Tell us when you book.' },
    { q: 'Can I stay with my dog?', a: 'Most dogs are calmer without their owner watching, honestly. But for the first ten minutes, or for puppies, you are welcome to stay.' },
    { q: 'How often should my dog be groomed?', a: 'Every 6–8 weeks for most clipped coats; every 4–6 for poodle crosses with thick coats; every 8–12 for short-coated dogs who just need a bath and nails. We can set up a repeat booking.' },
    { q: 'What if my dog is matted?', a: 'We will never de-mat a dog painfully. If the coat is too matted to brush out humanely, we will recommend a short clip and ring you first. Matting adds £5–£15 depending on time.' },
    { q: 'Do you need vaccination records?', a: 'We ask that dogs are up to date with vaccinations (or titre-tested) and free of fleas. No need to bring paperwork; just tick the box when booking.' },
    { q: 'Where can I park?', a: 'Free on-street parking on Cold Bath Road for up to two hours, and a loading bay outside for drop-offs.' },
  ],
  forms: { provider: 'demo', honeypot: '_gotcha', notifyEmail: 'woof@muddypaws.example.co.uk' },
  booking: {
    provider: 'demo',
    slotIntervalMins: 30,
    horizonDays: 42,
    minNoticeHours: 12,
    closedDates: ['2026-12-24', '2026-12-25', '2026-12-26', '2027-01-01'],
    policy: 'Please give 24 hours notice to cancel or move an appointment. Late cancellations and no-shows are charged 50% of the groom.',
  },
  seo: {
    siteUrl: 'https://muddypaws.example.co.uk',
    titleTemplate: '%s · Muddy Paws Dog Grooming Harrogate',
    defaultDescription: 'Gentle, professional dog grooming in Harrogate. Full grooms from £38, bath & tidy from £26, puppy introductions, de-shedding and hand stripping. Book online with prices by dog size.',
    ogImage: '/og.jpg',
    schemaType: 'PetGroomer' as string,
    priceRange: '££',
    keywords: ['dog groomer Harrogate', 'dog grooming Harrogate', 'puppy groom Harrogate', 'dog groomer Knaresborough'],
  },
  legal: { legalName: 'Beth Clarkson trading as Muddy Paws Dog Grooming', entityType: 'sole-trader', policiesReviewed: '2026-11-10' },
  credentials: [
    { label: 'City & Guilds Level 3', detail: 'Dog grooming (fictional)', fictional: true },
    { label: 'Canine first aid', detail: 'Certified (fictional)', fictional: true },
    { label: 'Fully insured', detail: 'Salon & handling', fictional: true },
  ],
});

/** Dog size bands. `multiplier` scales the base (medium) price; `example` is for the illustrated picker. */
export const sizes = [
  { slug: 'xs', name: 'Tiny', weight: 'Under 6 kg', examples: 'Chihuahua, Yorkie, Pomeranian', multiplier: 0.8, mins: 0.75 },
  { slug: 's', name: 'Small', weight: '6–12 kg', examples: 'Cavapoo, Westie, Dachshund', multiplier: 0.9, mins: 0.9 },
  { slug: 'm', name: 'Medium', weight: '12–25 kg', examples: 'Cockapoo, Spaniel, Border collie', multiplier: 1, mins: 1 },
  { slug: 'l', name: 'Large', weight: '25–40 kg', examples: 'Labrador, Golden retriever, Goldendoodle', multiplier: 1.25, mins: 1.2 },
  { slug: 'xl', name: 'Giant', weight: 'Over 40 kg', examples: 'Newfoundland, Bernese, Great Dane', multiplier: 1.6, mins: 1.4 },
] as const;

export type SizeSlug = (typeof sizes)[number]['slug'];

/** Coat types affect time and price for clipped grooms. */
export const coats = [
  { slug: 'short', name: 'Short & smooth', examples: 'Lab, Staffie, Beagle', extraPence: 0 },
  { slug: 'double', name: 'Double / thick', examples: 'Collie, Retriever, Husky', extraPence: 400 },
  { slug: 'curly', name: 'Curly / wool', examples: 'Poodle crosses, Bichon', extraPence: 600 },
  { slug: 'wire', name: 'Wire', examples: 'Terriers, Schnauzer', extraPence: 300 },
  { slug: 'silky', name: 'Long & silky', examples: 'Spaniel, Shih Tzu, Yorkie', extraPence: 400 },
] as const;

export const addons = [
  { slug: 'teeth', name: 'Teeth clean', pricePence: 600, mins: 10 },
  { slug: 'paw-balm', name: 'Paw & nose balm', pricePence: 400, mins: 5 },
  { slug: 'flea', name: 'Flea treatment bath', pricePence: 800, mins: 10 },
  { slug: 'blueberry', name: 'Blueberry facial', pricePence: 500, mins: 10 },
] as const;

/** Price (pence) for a service at a size with a coat. Flat-price services ignore size/coat. */
export function groomPrice(serviceSlug: string, sizeSlug: SizeSlug, coatSlug?: string): number {
  const svc = site.services.find((s) => s.slug === serviceSlug)!;
  const size = sizes.find((s) => s.slug === sizeSlug)!;
  if (!svc.price?.startsWith('From')) return svc.pricePence!;
  const coat = coats.find((c) => c.slug === coatSlug);
  const base = Math.round((svc.pricePence! * size.multiplier) / 100) * 100;
  return base + (coat?.extraPence ?? 0);
}
export function groomMins(serviceSlug: string, sizeSlug: SizeSlug): number {
  const svc = site.services.find((s) => s.slug === serviceSlug)!;
  const size = sizes.find((s) => s.slug === sizeSlug)!;
  if (!svc.price?.startsWith('From')) return svc.durationMins!;
  return Math.round((svc.durationMins! * size.mins) / 15) * 15;
}

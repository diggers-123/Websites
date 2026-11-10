/**
 * CINDER & SALT — wood-fired pizza event catering, Norwich. FICTIONAL demonstration data.
 * Pricing rules used by the quote calculator live in `pricing` below.
 */
import { defineSite, hours } from '@site/core';

export const site = defineSite({
  slug: 'cinder-and-salt',
  name: 'Cinder & Salt',
  tagline: 'Wood-fired pizza for weddings, parties & events across Norfolk',
  isFictional: true,
  owner: { name: 'Jack & Rosa Mellor', title: 'Founders' },
  founded: 2018,
  phone: '01603 920 144',
  phoneHref: '+441603920144',
  email: 'hello@cinderandsalt.example.co.uk',
  address: { line1: 'Unit 4, Hethel Engineering Yard', line2: 'Potash Lane', town: 'Norwich', county: 'Norfolk', postcode: 'NR14 8FB', lat: 52.56, lng: 1.18 },
  serviceAreas: ['Norwich', 'Great Yarmouth', 'King\'s Lynn', 'Cromer', 'Holt', 'Diss', 'Thetford', 'Bury St Edmunds', 'Ipswich', 'Cambridge'],
  postcodePrefixes: ['NR', 'IP', 'PE', 'CB', 'CO'],
  hours: hours({ mon: ['09:00', '17:00'], tue: ['09:00', '17:00'], wed: ['09:00', '17:00'], thu: ['09:00', '17:00'], fri: ['09:00', '17:00'], sat: null, sun: null }),
  social: { instagram: 'https://instagram.com/', facebook: 'https://facebook.com/', tiktok: 'https://tiktok.com/', google: 'https://maps.google.com/' },
  nav: [
    { label: 'Events', href: '/events' },
    { label: 'Menu', href: '/menu' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Image credits', href: '/credits' },
  ],
  primaryCta: { label: 'Get an event quote', href: '/quote' },
  secondaryCta: { label: 'See the menu', href: '/menu' },
  services: [
    { slug: 'the-feast', name: 'The Feast', category: 'Packages', summary: 'Unlimited wood-fired pizza for two hours. Five from the menu, served slice by slice as fast as the oven goes.', price: '£16.50 / head', pricePence: 1650, includes: ['Unlimited pizza for 2 hours', 'Choose 5 pizzas', 'Vegan & gluten-free options', 'Napkins, plates, the lot'] },
    { slug: 'feast-and-sides', name: 'Feast + Sides', category: 'Packages', summary: 'The Feast, plus bowls of rocket & parmesan salad, slaw and garlic flatbreads on the tables.', price: '£19.50 / head', pricePence: 1950, includes: ['Everything in The Feast', 'Rocket & parmesan salad', 'Fennel slaw', 'Garlic & rosemary flatbreads'] },
    { slug: 'the-full-works', name: 'The Full Works', category: 'Packages', summary: 'Feast, sides, and wood-fired desserts — chocolate calzone and baked peaches with mascarpone.', price: '£23 / head', pricePence: 2300, includes: ['Everything in Feast + Sides', 'Chocolate & mascarpone calzone', 'Fire-baked peaches', 'Extra half hour of service'] },
  ],
  team: [
    { name: 'Jack Mellor', role: 'Oven, dough, logistics', bio: 'Ex-restaurant chef who got tired of walls. Builds the fire at 2pm for a 7pm service and will not be rushed.' },
    { name: 'Rosa Mellor', role: 'Menus, bookings, the front', bio: 'Runs the queue, the music and the spreadsheet. If you email us, you are talking to Rosa.' },
  ],
  testimonials: [
    { quote: 'Two hundred guests, zero queue drama, and people still talk about the nduja one. Best decision of the wedding.', name: 'Ellie & Tom', context: 'Wedding, Godwick Barns', rating: 5, source: 'google' },
    { quote: 'They turned up, lit the fire, fed sixty of us in the rain and left the field cleaner than they found it.', name: 'Mark P.', context: '50th birthday, Holt', rating: 5, source: 'facebook' },
    { quote: 'Booked them for our summer party three years running. The team asks for them by name now.', name: 'Sarah K.', context: 'Corporate, Norwich Research Park', rating: 5, source: 'google' },
    { quote: 'Properly good pizza — the crust is the real thing. And the vegan one didn\'t feel like an afterthought.', name: 'Dan W.', context: 'Festival, Wymondham', rating: 5, source: 'google' },
  ],
  faqs: [
    { q: 'How many people can you feed?', a: 'One oven serves up to 120 guests comfortably in two hours; two ovens up to 250. For bigger events we bring a third oven and a longer service window. Our minimum is 30 guests or the minimum spend, whichever is higher.' },
    { q: 'What do you need from the venue?', a: 'A flat, firm spot about 6 × 4 metres for the trailer, and vehicle access to it. No power, no water, no gas — the oven runs on seasoned oak we bring. We do need the venue\'s permission for open fire, which almost all give.' },
    { q: 'Do you do vegan and gluten-free?', a: 'Always, at no extra charge. Vegan mozzarella and a dedicated gluten-free base cooked on a separate board and peel. Tell us numbers a week before.' },
    { q: 'How does the quote work?', a: 'The calculator on the quote page gives you an estimate from guest numbers, package, extras and travel. We confirm the exact price by email within one working day. A 25% deposit holds the date; the balance is due 14 days before.' },
    { q: 'What happens if it rains?', a: 'We cook in it. The trailer has an awning for the serving hatch; your guests will want cover for queuing and eating, which is worth planning for anyway in Norfolk.' },
    { q: 'How far will you travel?', a: 'Travel is free within 20 miles of Norwich and charged per mile beyond that, up to about 60 miles — Norfolk, north Suffolk and the edge of Cambridgeshire. Further is possible for larger bookings.' },
    { q: 'Can you do a late-night snack rather than the main meal?', a: 'Yes — an "Evening Feast" from 9pm for weddings is one of our most popular slots. Same per-head pricing, shorter service, fewer pizzas per head assumed.' },
    { q: 'Are you insured and food-hygiene rated?', a: 'Public liability insured to £5m and rated 5 by the local authority (fictional details for this demonstration site). Certificates available on request.' },
  ],
  forms: { provider: 'demo', honeypot: '_gotcha', notifyEmail: 'hello@cinderandsalt.example.co.uk' },
  booking: {
    provider: 'demo',
    closedDates: ['2026-12-24', '2026-12-25', '2026-12-26', '2026-12-31', '2027-01-01'],
    policy: 'A 25% deposit secures your date. Balance due 14 days before the event. Cancellations more than 60 days out are refunded in full minus the deposit.',
  },
  seo: {
    siteUrl: 'https://cinderandsalt.example.co.uk',
    titleTemplate: '%s · Cinder & Salt Wood-Fired Pizza, Norwich',
    defaultDescription: 'Wood-fired pizza catering for weddings, parties, corporate events and festivals across Norfolk and Suffolk. Unlimited pizza packages from £16.50 a head. Instant online estimate.',
    ogImage: '/og.jpg',
    schemaType: 'FoodEstablishment',
    priceRange: '££',
    keywords: ['wood fired pizza catering Norfolk', 'pizza van wedding Norwich', 'mobile pizza catering Suffolk', 'event catering Norwich'],
  },
  legal: { legalName: 'Cinder & Salt Catering Ltd', entityType: 'limited-company', companyNumber: '00000000 (fictional)', policiesReviewed: '2026-11-10' },
  credentials: [
    { label: '5★ food hygiene', detail: 'Local authority rating', fictional: true },
    { label: '£5m public liability', detail: 'Fully insured', fictional: true },
    { label: '400+ events', detail: 'Since 2018' },
  ],
});

/** Pricing rules for the quote calculator. All amounts in pence. */
export const pricing = {
  packages: site.services.map((s) => ({ slug: s.slug, name: s.name, perHead: s.pricePence!, summary: s.summary })),
  minGuests: 30,
  maxGuests: 300,
  /** Minimum spend (pence) by day type. */
  minSpend: { weekend: 95000, weekday: 75000 },
  /** Peak uplift (fraction) for Saturdays in these months (0-based). */
  peakMonths: [4, 5, 6, 7, 8],
  peakUplift: 0.1,
  extras: [
    { slug: 'extra-hour', name: 'Extra hour of service', price: 18000, perHead: false, note: 'Keeps the oven going for a third hour' },
    { slug: 'grazing', name: 'Antipasti grazing table', price: 600, perHead: true, note: 'Cured meats, cheeses, olives, focaccia' },
    { slug: 'evening', name: 'Evening Feast (from 9pm)', price: 900, perHead: true, note: 'Late-night slot for weddings; priced per evening guest' },
    { slug: 'second-oven', name: 'Second oven', price: 25000, perHead: false, note: 'Added automatically over 120 guests' },
  ],
  /** Travel: free radius (miles) from Norwich, then per mile. Distances approximated by postcode area. */
  travel: {
    freeMiles: 20,
    perMile: 120,
    maxMiles: 60,
    /** Rough one-way miles from Norwich by outward postcode district prefix. */
    areas: { NR: 10, IP: 35, PE: 45, CB: 60, CO: 60 } as Record<string, number>,
  },
  depositRate: 0.25,
};

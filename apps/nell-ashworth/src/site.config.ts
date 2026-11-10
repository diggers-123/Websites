/**
 * NELL ASHWORTH PHOTOGRAPHY — Edinburgh. FICTIONAL demonstration data.
 * `bookedDates` powers the demo date-availability check.
 */
import { defineSite, hours } from '@site/core';

export const site = defineSite({
  slug: 'nell-ashworth',
  name: 'Nell Ashworth Photography',
  tagline: 'Documentary wedding & family photography, Edinburgh',
  isFictional: true,
  owner: { name: 'Nell Ashworth', title: 'Photographer' },
  founded: 2016,
  phone: '0131 516 0442',
  phoneHref: '+441315160442',
  email: 'hello@nellashworth.example.co.uk',
  address: { line1: 'Studio 3, Albion Business Centre', line2: '78 Albion Road', town: 'Edinburgh', county: 'Midlothian', postcode: 'EH7 5QZ', lat: 55.9598, lng: -3.1664 },
  serviceAreas: ['Edinburgh', 'Leith', 'East Lothian', 'Fife', 'the Borders', 'Glasgow', 'Perthshire', 'the Highlands', 'anywhere, honestly'],
  hours: hours({ mon: ['10:00', '17:00'], tue: ['10:00', '17:00'], wed: ['10:00', '17:00'], thu: ['10:00', '17:00'], fri: ['10:00', '15:00'], sat: null, sun: null }),
  social: { instagram: 'https://instagram.com/', pinterest: 'https://pinterest.com/', google: 'https://maps.google.com/' },
  nav: [
    { label: 'Weddings', href: '/weddings' },
    { label: 'Families', href: '/families' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Journal', href: '/journal' },
  ],
  footerNav: [
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Image credits', href: '/credits' },
  ],
  primaryCta: { label: 'Check your date', href: '/check-your-date' },
  secondaryCta: { label: 'See the work', href: '/portfolio' },
  services: [
    { slug: 'wedding-full-day', name: 'Full day', category: 'Weddings', summary: 'Getting ready to the last dance. Ten hours, one photographer, every honest moment.', price: 'From £2,400', pricePence: 240000, includes: ['Up to 10 hours', 'Pre-wedding walk & chat', '600+ edited photographs', 'Online gallery for 2 years', 'Print rights', 'Sneak peek within 48 hours'] },
    { slug: 'wedding-half-day', name: 'Half day', category: 'Weddings', summary: 'Ceremony, drinks and the first hour of the party. Six hours for smaller or shorter days.', price: 'From £1,500', pricePence: 150000, includes: ['Up to 6 hours', '350+ edited photographs', 'Online gallery', 'Print rights'] },
    { slug: 'wedding-elopement', name: 'Elopement & registry', category: 'Weddings', summary: 'Two hours for the two of you (and whoever you bring). Registry office, hilltop, pub — up to you.', price: 'From £650', pricePence: 65000, includes: ['Up to 2 hours', '150+ edited photographs', 'Online gallery'] },
    { slug: 'family-session', name: 'Family session', category: 'Families', summary: 'An hour and a half at home, the beach or the park. No posing. Bring snacks.', price: '£320', pricePence: 32000, durationMins: 90, bookable: true, includes: ['90 minutes', '60+ edited photographs', 'Online gallery', 'Print rights'] },
    { slug: 'newborn-at-home', name: 'Newborn at home', category: 'Families', summary: 'The first weeks, as they are. Two unhurried hours at home, naps included.', price: '£380', pricePence: 38000, durationMins: 120, bookable: true, includes: ['2 hours at home', '70+ edited photographs', 'Online gallery', 'Print rights'] },
    { slug: 'portrait-session', name: 'Portrait session', category: 'Portraits', summary: 'For people who need a photograph of themselves that looks like them. One hour, on location.', price: '£260', pricePence: 26000, durationMins: 60, bookable: true, includes: ['60 minutes', '25+ edited photographs', 'Online gallery'] },
  ],
  team: [{ name: 'Nell Ashworth', role: 'Photographer', bio: 'Trained as a photojournalist, shot news for six years, then realised weddings had better stories. Two hundred weddings in, still the quietest person in the room.', image: { src: 'nell', alt: 'Nell Ashworth with a rangefinder camera in a stairwell' } }],
  testimonials: [
    { quote: 'We barely noticed Nell all day. Then the photos arrived and we noticed everything.', name: 'Catriona & Ewan', context: 'Wedding, Edinburgh, June 2025', rating: 5, source: 'google' },
    { quote: 'She photographed my dad crying before the ceremony. I didn\'t know it had happened. It\'s the best photo I own.', name: 'Rosie M.', context: 'Wedding, Fife', rating: 5, source: 'direct' },
    { quote: 'The family session was chaos — rain, a toddler meltdown, a dog in the sea. The photos are joyful. I don\'t know how.', name: 'Amira & Tom', context: 'Family, Portobello', rating: 5, source: 'google' },
    { quote: 'No "look here, smile", not once. Just real pictures of our actual wedding.', name: 'Jess & Hannah', context: 'Wedding, Leith', rating: 5, source: 'direct' },
  ],
  faqs: [
    { q: 'What does "documentary" actually mean?', a: 'I photograph what happens rather than arranging it. No lists of group shots that take an hour, no posing in doorways. If you want a few family groups, we do them in ten minutes and get back to the day. The result is photographs of your wedding, not a wedding.' },
    { q: 'Do you shoot in colour?', a: 'Yes — you receive both. I lean towards black and white for the moments and colour for the place, and the gallery lets you choose.' },
    { q: 'How far ahead should we book?', a: 'Saturdays from May to September go 12–18 months ahead. Weekdays, winter and elopements are much more flexible. Check your date — the calendar is live.' },
    { q: 'Do you travel?', a: 'All of Scotland at no extra charge beyond travel costs over 60 miles from Edinburgh; the rest of the UK and abroad by arrangement.' },
    { q: 'When do we get the photos?', a: 'A sneak peek of 20–30 within 48 hours; the full gallery within six weeks (two for family sessions).' },
    { q: 'What if it rains?', a: 'It\'s Scotland. Rain makes better photographs than sun does — honestly. Bring a good coat.' },
    { q: 'Can we have the unedited files?', a: 'No, sorry — the editing is half the work and the photographs are not finished without it. You get every usable frame, edited.' },
  ],
  forms: { provider: 'demo', honeypot: '_gotcha', notifyEmail: 'hello@nellashworth.example.co.uk' },
  booking: { provider: 'demo', policy: 'A £500 deposit secures a wedding date; family sessions are paid in full at booking and can be moved once free of charge.' },
  seo: {
    siteUrl: 'https://nellashworth.example.co.uk',
    titleTemplate: '%s · Nell Ashworth Photography, Edinburgh',
    defaultDescription: 'Documentary wedding and family photographer in Edinburgh. Honest, unposed photographs across Scotland. Weddings from £1,500, family sessions £320. Check your date online.',
    ogImage: '/og.jpg',
    schemaType: 'ProfessionalService',
    priceRange: '£££',
    keywords: ['documentary wedding photographer Edinburgh', 'wedding photographer Scotland', 'family photographer Edinburgh', 'newborn photographer Edinburgh'],
  },
  legal: { legalName: 'Nell Ashworth trading as Nell Ashworth Photography', entityType: 'sole-trader', policiesReviewed: '2026-11-10' },
  credentials: [
    { label: '200+ weddings', detail: 'Since 2016' },
    { label: 'Fully insured', detail: 'Public liability & equipment (fictional)', fictional: true },
    { label: 'Backed up thrice', detail: 'Two cards in camera, cloud by midnight' },
  ],
});

/**
 * Demo booked dates (YYYY-MM-DD). In production, replace with a fetch from the photographer's
 * calendar (e.g. a public iCal feed parsed at build time, or Cal.com availability).
 */
export const bookedDates = [
  '2027-05-01', '2027-05-08', '2027-05-15', '2027-05-22', '2027-05-29', '2027-06-05', '2027-06-12', '2027-06-19', '2027-06-26', '2027-07-03', '2027-07-10', '2027-07-17', '2027-07-31', '2027-08-07', '2027-08-14', '2027-08-21', '2027-08-28', '2027-09-04', '2027-09-11', '2027-09-25', '2027-10-02', '2027-10-16', '2026-12-05', '2026-12-12', '2026-12-19', '2027-02-14', '2027-03-20', '2027-04-10', '2027-04-24',
];
/** Dates Nell never works. */
export const blackoutDates = ['2026-12-24', '2026-12-25', '2026-12-26', '2026-12-31', '2027-01-01'];

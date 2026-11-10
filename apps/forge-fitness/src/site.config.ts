/**
 * FORGE PERSONAL TRAINING — Cardiff. FICTIONAL demonstration data.
 */
import { defineSite, hours } from '@site/core';

export const site = defineSite({
  slug: 'forge-fitness',
  name: 'Forge Personal Training',
  tagline: 'Personal training & small-group strength, Cardiff',
  isFictional: true,
  owner: { name: 'Marcus Reid', title: 'Coach & founder' },
  founded: 2017,
  phone: '029 2167 4410',
  phoneHref: '+442921674410',
  email: 'marcus@forgept.example.co.uk',
  address: { line1: 'Unit 7, Tyndall Street Studios', town: 'Cardiff', county: 'South Glamorgan', postcode: 'CF10 4BB', lat: 51.4725, lng: -3.1662 },
  serviceAreas: ['Cardiff Bay', 'Grangetown', 'Penarth', 'Roath', 'Canton', 'Pontcanna', 'Online — anywhere'],
  hours: hours({ mon: ['06:00', '20:00'], tue: ['06:00', '20:00'], wed: ['06:00', '20:00'], thu: ['06:00', '20:00'], fri: ['06:00', '18:00'], sat: ['08:00', '13:00'], sun: null }),
  social: { instagram: 'https://instagram.com/', youtube: 'https://youtube.com/', google: 'https://maps.google.com/' },
  nav: [
    { label: 'Personal training', href: '/personal-training' },
    { label: 'Small group', href: '/small-group' },
    { label: 'Online', href: '/online' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Timetable', href: '/timetable' },
    { label: 'Results', href: '/results' },
    { label: 'About', href: '/about' },
  ],
  footerNav: [
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Image credits', href: '/credits' },
  ],
  primaryCta: { label: 'Book a free consult', href: '/book' },
  secondaryCta: { label: 'See pricing', href: '/pricing' },
  services: [
    { slug: 'free-consult', name: 'Free consultation', category: 'Start here', summary: 'Thirty minutes in the studio or on a call. Where you are, where you want to be, and an honest plan to get there.', price: 'Free', pricePence: 0, durationMins: 30, bookable: true, includes: ['Movement screen', 'Goal setting', 'Plan outline', 'No hard sell'] },
    { slug: 'pt-single', name: '1:1 session', category: 'Personal training', summary: 'One hour, one coach, one plan that\'s actually yours.', price: '£55', pricePence: 5500, durationMins: 60, includes: ['60 minutes', 'Programme in the app', 'Message support'] },
    { slug: 'pt-block-10', name: '10-session block', category: 'Personal training', summary: 'Ten sessions, valid 12 weeks. The one most people choose.', price: '£480', pricePence: 48000, durationMins: 60, includes: ['10 × 60 min', 'Programme in the app', 'Nutrition check-in', 'Message support'] },
    { slug: 'pt-block-20', name: '20-session block', category: 'Personal training', summary: 'Twenty sessions, valid 24 weeks. For a proper transformation.', price: '£880', pricePence: 88000, durationMins: 60, includes: ['20 × 60 min', 'Programme in the app', 'Monthly body comp', 'Nutrition coaching', 'Priority booking'] },
    { slug: 'small-group', name: 'Small group (max 6)', category: 'Small group', summary: 'Coached strength sessions, six people max, fixed timetable. The atmosphere of a class, the attention of PT.', price: '£15 / session', pricePence: 1500, durationMins: 55, includes: ['55 minutes', 'Max 6 people', 'Progressive programme', 'Book via timetable'] },
    { slug: 'small-group-unlimited', name: 'Small group — unlimited', category: 'Small group', summary: 'As many timetable sessions as you like, monthly rolling.', price: '£95 / month', pricePence: 9500, includes: ['Unlimited sessions', 'App access', 'Cancel any time'] },
    { slug: 'online', name: 'Online coaching', category: 'Online', summary: 'Your programme, your gym, weekly check-ins with Marcus. Anywhere in the UK.', price: '£120 / month', pricePence: 12000, includes: ['Personal programme', 'Weekly video check-in', 'Form review on request', 'Nutrition targets'] },
  ],
  team: [{ name: 'Marcus Reid', role: 'Coach & founder', bio: 'Level 4 strength & conditioning (fictional), ex-semi-pro rugby, ten years coaching everyone from first-timers to masters powerlifters. Big on technique, allergic to nonsense.', image: { src: 'coach', alt: 'Marcus, arms crossed, in the studio' } }],
  testimonials: [
    { quote: 'Twelve weeks: deadlift from the bar to 100 kg, back pain gone, and I actually like training now.', name: 'Sian E.', context: '12-week PT block · Penarth', rating: 5, source: 'google' },
    { quote: 'The small group is the best £15 I spend each week. Six of us, proper coaching, no ego.', name: 'Dafydd P.', context: 'Small group · Roath', rating: 5, source: 'google' },
    { quote: 'Fifty-three, never lifted a weight. Marcus made it feel normal within two sessions.', name: 'Helen W.', context: 'PT · Cardiff Bay', rating: 5, source: 'google' },
    { quote: 'Online coaching from Swansea. Weekly check-ins keep me honest; the programme keeps me progressing.', name: 'Tom R.', context: 'Online · Swansea', rating: 5, source: 'direct' },
  ],
  faqs: [
    { q: 'I\'ve never trained before. Is this for me?', a: 'Yes — most clients start exactly there. The free consult is a chat and a few simple movements, not a fitness test. Sessions are built around what you can do today.' },
    { q: 'What happens in the free consult?', a: 'Thirty minutes. We talk about what you want, I watch you squat, hinge and push with no load, and we agree a plan. If PT isn\'t right for you, I\'ll say so and point you at small group or online.' },
    { q: 'Where are you?', a: 'A private studio on Tyndall Street, five minutes from Cardiff Central. Free parking on site. Small-group outdoor sessions run on the Bay waterfront in summer.' },
    { q: 'How often should I train?', a: 'Two coached sessions a week is the sweet spot for most people. One PT plus one small group is a popular combination at £70/week.' },
    { q: 'Do blocks expire?', a: 'Ten sessions are valid for 12 weeks, twenty for 24 weeks. Holidays and injuries pause the clock — just tell me.' },
    { q: 'What\'s your cancellation policy?', a: 'Twenty-four hours notice for PT; two hours for small group. Late cancellations use the session.' },
    { q: 'Do you do nutrition?', a: 'Targets and habits, yes — calories, protein, the basics done consistently. I\'m not a dietitian and will refer you if you need one.' },
  ],
  forms: { provider: 'demo', honeypot: '_gotcha', notifyEmail: 'marcus@forgept.example.co.uk' },
  booking: { provider: 'demo', slotIntervalMins: 30, horizonDays: 21, minNoticeHours: 3, closedDates: ['2026-12-25', '2026-12-26', '2027-01-01'], policy: 'Consultations are free; please give 24 hours notice if you can\'t make it.' },
  seo: {
    siteUrl: 'https://forgept.example.co.uk',
    titleTemplate: '%s · Forge Personal Training, Cardiff',
    defaultDescription: 'Personal trainer in Cardiff Bay. 1:1 strength coaching from £55, small-group sessions £15, online coaching £120/month. Book a free 30-minute consultation.',
    ogImage: '/og.jpg',
    schemaType: 'HealthClub',
    priceRange: '££',
    keywords: ['personal trainer Cardiff', 'personal training Cardiff Bay', 'small group training Cardiff', 'online coaching Wales'],
  },
  legal: { legalName: 'Marcus Reid trading as Forge Personal Training', entityType: 'sole-trader', policiesReviewed: '2026-11-10' },
  credentials: [
    { label: 'Level 4 S&C', detail: 'Qualified coach (fictional)', fictional: true },
    { label: 'Fully insured', detail: 'PT & studio (fictional)', fictional: true },
    { label: '600+ clients', detail: 'Since 2017' },
    { label: 'First aid', detail: 'Certified (fictional)', fictional: true },
  ],
});

/** Weekly small-group timetable. */
export const timetable: { day: string; sessions: { time: string; name: string; focus: string; where: 'Studio' | 'Bay' }[] }[] = [
  { day: 'Monday', sessions: [{ time: '06:30', name: 'Early Strength', focus: 'Squat & press', where: 'Studio' }, { time: '12:15', name: 'Lunch Lift', focus: 'Full body, 45 min', where: 'Studio' }, { time: '18:00', name: 'Strength', focus: 'Deadlift & pull', where: 'Studio' }] },
  { day: 'Tuesday', sessions: [{ time: '06:30', name: 'Conditioning', focus: 'Sled, rower, carries', where: 'Studio' }, { time: '18:00', name: 'Beginners Strength', focus: 'Learn the lifts', where: 'Studio' }, { time: '19:00', name: 'Strength', focus: 'Squat & press', where: 'Studio' }] },
  { day: 'Wednesday', sessions: [{ time: '06:30', name: 'Early Strength', focus: 'Hinge & row', where: 'Studio' }, { time: '12:15', name: 'Lunch Lift', focus: 'Full body, 45 min', where: 'Studio' }, { time: '18:00', name: 'Strength', focus: 'Bench & pull-ups', where: 'Studio' }] },
  { day: 'Thursday', sessions: [{ time: '06:30', name: 'Conditioning', focus: 'Intervals', where: 'Studio' }, { time: '18:00', name: 'Beginners Strength', focus: 'Learn the lifts', where: 'Studio' }, { time: '19:00', name: 'Strength', focus: 'Deadlift & press', where: 'Studio' }] },
  { day: 'Friday', sessions: [{ time: '06:30', name: 'Early Strength', focus: 'Squat & carries', where: 'Studio' }, { time: '12:15', name: 'Lunch Lift', focus: 'Full body, 45 min', where: 'Studio' }] },
  { day: 'Saturday', sessions: [{ time: '08:30', name: 'Bay Session', focus: 'Outdoor sled & ropes (Apr–Oct)', where: 'Bay' }, { time: '10:00', name: 'Open Strength', focus: 'Your programme, coached', where: 'Studio' }] },
];

export const results = [
  { stat: '600+', label: 'clients coached since 2017' },
  { stat: '92%', label: 'of block clients rebook' },
  { stat: '12', label: 'weeks to a first 100 kg deadlift, on average' },
  { stat: '6', label: 'people max in a small group' },
];

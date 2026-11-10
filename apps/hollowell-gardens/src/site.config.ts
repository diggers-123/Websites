/**
 * HOLLOWELL GARDEN DESIGN — single source of truth for business content.
 * All details are FICTIONAL demonstration data. See README.md for customisation.
 */
import { defineSite, hours } from '@site/core';

export const site = defineSite({
  slug: 'hollowell-gardens',
  name: 'Hollowell Garden Design',
  tagline: 'Garden design & landscaping in the Cotswolds',
  isFictional: true,
  owner: { name: 'Anna Hollowell', title: 'Garden designer' },
  founded: 2014,
  phone: '01453 490 217',
  phoneHref: '+441453490217',
  email: 'studio@hollowellgardens.example.co.uk',
  address: {
    line1: 'The Old Dairy, Painswick Road',
    town: 'Stroud',
    county: 'Gloucestershire',
    postcode: 'GL6 7QA',
    lat: 51.766,
    lng: -2.19,
  },
  serviceAreas: ['Stroud', 'Painswick', 'Nailsworth', 'Cheltenham', 'Cirencester', 'Tetbury', 'Gloucester', 'Bath', 'Malmesbury', 'Chipping Norton'],
  postcodePrefixes: ['GL', 'BA', 'SN', 'OX', 'WR'],
  hours: hours({ mon: ['09:00', '17:30'], tue: ['09:00', '17:30'], wed: ['09:00', '17:30'], thu: ['09:00', '17:30'], fri: ['09:00', '16:00'], sat: null, sun: null }),
  social: { instagram: 'https://instagram.com/', pinterest: 'https://pinterest.com/', google: 'https://maps.google.com/' },
  nav: [
    { label: 'Gardens', href: '/gardens' },
    { label: 'Services', href: '/services' },
    { label: 'Process', href: '/process' },
    { label: 'Journal', href: '/journal' },
    { label: 'About', href: '/about' },
  ],
  footerNav: [
    { label: 'Areas covered', href: '/areas' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Image credits', href: '/credits' },
  ],
  primaryCta: { label: 'Book a consultation', href: '/contact' },
  secondaryCta: { label: 'See the gardens', href: '/gardens' },
  services: [
    {
      slug: 'garden-design',
      name: 'Garden design',
      summary: 'A complete design for a new or reworked garden — from survey to a plan your builders can price and build.',
      description: [
        'Full garden design is for when the bones of the garden need to change: levels, terraces, paths, where you sit and where you look. It starts with a measured survey and a long conversation about how you actually use the garden, and ends with a scaled master plan, construction drawings and a planting plan.',
        'I design gardens from small town plots to several acres, always with the same aim — a garden that looks like it was always meant to be there, and that gets better every year rather than peaking on handover day.',
      ],
      price: 'From £2,400',
      pricePence: 240000,
      includes: ['Measured site survey', 'Concept design & mood boards', 'Scaled master plan', 'Construction drawings', 'Planting plan & schedule', 'Contractor tender support'],
      image: { src: 'pool', alt: 'A sunken terrace and reflecting pool at a Cotswold farmhouse' },
      faqs: [
        { q: 'How long does a design take?', a: 'Typically 8–12 weeks from survey to final drawings, depending on the size of the garden and how quickly decisions can be made at each stage.' },
        { q: 'Do you build the garden too?', a: 'I work with two trusted landscape contractors and manage the build on your behalf (see Landscaping & build). You are also free to take the drawings to your own contractor.' },
      ],
    },
    {
      slug: 'planting-design',
      name: 'Planting design',
      summary: 'For gardens whose structure works but whose borders don\'t. A planting plan, plant sourcing and setting out.',
      description: [
        'Many gardens don\'t need rebuilding — they need better planting. A planting design takes your existing beds (or newly built ones) and gives them a scheme with structure for winter, a long season of flower and a plant palette that suits your soil, light and appetite for maintenance.',
        'I source plants from specialist nurseries, set them out on site myself and hand over a plant list with a maintenance calendar.',
      ],
      price: 'From £850',
      pricePence: 85000,
      includes: ['Site & soil assessment', 'Planting plan to scale', 'Plant schedule & sourcing', 'Setting out on site', 'Seasonal maintenance notes'],
      image: { src: 'seedheads', alt: 'Backlit seed heads and grasses in autumn' },
    },
    {
      slug: 'landscaping-and-build',
      name: 'Landscaping & build',
      summary: 'Construction of the design by our regular contractors, with the designer on site through the build.',
      description: [
        'The quality of a garden is decided on site: how the levels are set, how the stone is laid, how the soil is prepared. I project-manage builds for the gardens I design, visiting at every key stage and making the hundred small decisions that drawings can\'t.',
        'Builds are carried out by Cotswold landscape contractors I have worked with for years. You get one point of contact, one programme and one invoice schedule.',
      ],
      price: 'Projects from £15,000',
      includes: ['Contractor selection & tender', 'Programme & budget management', 'Site visits at every stage', 'Snagging & handover', 'First-year aftercare visit'],
      image: { src: 'build', alt: 'Landscapers building a dry-stone wall and laying paving' },
    },
    {
      slug: 'garden-consultation',
      name: 'Garden consultation',
      summary: 'A two-hour visit, a walk round, and a written set of recommendations. The right first step for most gardens.',
      description: [
        'A consultation is a half-day of my time: we walk the garden together, talk about what works and what doesn\'t, and I follow up with written notes, sketches where useful and a list of priorities — whether that is a full redesign or a few well-chosen changes.',
        'The consultation fee is deducted from the design fee if you go on to commission a design within six months.',
      ],
      price: '£295',
      pricePence: 29500,
      durationMins: 120,
      includes: ['Two-hour site visit', 'Written recommendations within 7 days', 'Sketch ideas where helpful', 'Fee credited against a design commission'],
      image: { src: 'designer', alt: 'Anna Hollowell surveying a garden with notebook and tape' },
    },
  ],
  team: [
    {
      name: 'Anna Hollowell',
      role: 'Garden designer & founder',
      bio: 'Trained in horticulture before design, which shows: the plants always come first. Fourteen years designing gardens in the Cotswolds, from courtyards in Stroud to farmhouse gardens above Painswick.',
      image: { src: 'designer', alt: 'Anna Hollowell on site' },
    },
  ],
  testimonials: [
    { quote: 'Anna understood the garden before we did. Two years on, it still surprises us every month.', name: 'Helen & Mark D.', context: 'Farmhouse garden, Painswick', rating: 5, source: 'direct' },
    { quote: 'We expected drawings. We got a garden that works in February as well as June, and a build that ran to the week.', name: 'James T.', context: 'Town garden, Cheltenham', rating: 5, source: 'google' },
    { quote: 'The consultation alone saved us from spending thousands in the wrong places.', name: 'Priya S.', context: 'Consultation, Nailsworth', rating: 5, source: 'google' },
    { quote: 'Calm, practical and completely on top of the contractors. The planting is extraordinary.', name: 'Rosalind W.', context: 'Walled garden, Tetbury', rating: 5, source: 'direct' },
  ],
  faqs: [
    { q: 'What does a garden design cost?', a: 'Design fees start at £2,400 for a town garden and are quoted after a consultation. As a rough guide, allow 8–12% of the build budget for design and project management. Build costs for a complete garden typically start at £15,000 and most of my projects fall between £30,000 and £120,000.' },
    { q: 'Where do you work?', a: 'Mostly within 30 miles of Stroud: Gloucestershire, the Cotswolds, Bath and north Wiltshire. Further afield is possible for larger projects — ask.' },
    { q: 'How far ahead are you booked?', a: 'Consultations within two to three weeks. Design commissions usually start four to eight weeks after a consultation. Builds are scheduled by the contractors and are typically three to six months out, so a garden for next summer should start its design this autumn.' },
    { q: 'Can you work with my own builder?', a: 'Yes. The drawings are detailed enough for any competent landscape contractor to price and build from, and I can visit at key stages on an hourly basis.' },
    { q: 'Do you do maintenance?', a: 'No, but every planting plan comes with a maintenance calendar, and I can recommend gardeners locally. I offer an optional first-year aftercare visit.' },
    { q: 'Do you design wildlife and low-maintenance gardens?', a: 'Most gardens I design are both, by default: naturalistic planting, water where possible, and no plant that needs weekly attention unless you want it.' },
  ],
  forms: { provider: 'demo', honeypot: '_gotcha', notifyEmail: 'studio@hollowellgardens.example.co.uk' },
  booking: { provider: 'demo', policy: 'Consultation visits are arranged by phone or email once your request is received — usually within two working days.' },
  seo: {
    siteUrl: 'https://hollowellgardens.example.co.uk',
    titleTemplate: '%s · Hollowell Garden Design, Stroud',
    defaultDescription:
      'Garden designer in Stroud, Gloucestershire. Considered garden design, planting design and managed landscaping across the Cotswolds, Cheltenham, Cirencester and Bath. Book a consultation.',
    ogImage: '/og.jpg',
    schemaType: 'LandscapeArchitect',
    priceRange: '£££',
    keywords: ['garden designer Stroud', 'garden design Cotswolds', 'planting design Gloucestershire', 'landscaping Cheltenham', 'garden designer Cirencester'],
  },
  legal: {
    legalName: 'Anna Hollowell trading as Hollowell Garden Design',
    entityType: 'sole-trader',
    policiesReviewed: '2026-11-10',
  },
  credentials: [
    { label: 'Society of Garden Designers', detail: 'Registered member (fictional)', fictional: true },
    { label: 'RHS Level 3', detail: 'Horticulture (fictional)', fictional: true },
    { label: 'Fully insured', detail: 'Professional indemnity & public liability', fictional: true },
  ],
});

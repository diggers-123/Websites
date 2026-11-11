/**
 * LUMEN SKIN STUDIO — Brighton. FICTIONAL demonstration data.
 */
import { defineSite, hours } from '@site/core';

export const site = defineSite({
  slug: 'lumen-skin',
  name: 'Lumen Skin Studio',
  tagline: 'Results-led facials & skin treatments, Brighton',
  isFictional: true,
  owner: { name: 'Amara Osei', title: 'Founder & advanced skin therapist' },
  founded: 2020,
  phone: '01273 920 558',
  phoneHref: '+441273920558',
  email: 'hello@lumenskin.example.co.uk',
  address: { line1: 'First floor, 41 Gardner Street', line2: 'North Laine', town: 'Brighton', county: 'East Sussex', postcode: 'BN1 1UN', lat: 50.8245, lng: -0.1404 },
  serviceAreas: ['Brighton', 'Hove', 'North Laine', 'Kemptown', 'Lewes', 'Shoreham', 'Worthing'],
  hours: hours({ mon: null, tue: ['10:00', '19:00'], wed: ['10:00', '19:00'], thu: ['10:00', '20:00'], fri: ['10:00', '18:00'], sat: ['09:00', '17:00'], sun: null }),
  social: { instagram: 'https://instagram.com/', tiktok: 'https://tiktok.com/', google: 'https://maps.google.com/' },
  nav: [
    { label: 'Treatments', href: '/treatments' },
    { label: 'Skin consultation', href: '/consultation' },
    { label: 'Prices & courses', href: '/prices' },
    { label: 'Results', href: '/results' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ],
  footerNav: [
    { label: 'Contact', href: '/contact' },
    { label: 'Gift vouchers', href: '/contact#vouchers' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Image credits', href: '/credits' },
  ],
  primaryCta: { label: 'Book a treatment', href: '/book' },
  secondaryCta: { label: 'Free skin consultation', href: '/consultation' },
  services: [
    { slug: 'skin-consultation', name: 'Skin consultation', category: 'Start here', summary: 'Thirty minutes with a skin scanner and an honest conversation. Free, no obligation — and the starting point for any course.', price: 'Free', pricePence: 0, durationMins: 30, bookable: true, includes: ['Skin analysis with imaging', 'Concern mapping', 'Written plan with prices', 'Product review (bring your bag)'] },
    { slug: 'signature-facial', name: 'Signature facial', category: 'Facials', summary: 'Deep cleanse, enzyme exfoliation, extraction where needed, LED, massage and a mask matched to your skin on the day.', description: ['The Signature is the facial we build everything else on. It starts with a quick look under magnification so the products are chosen for the skin in front of us, not a menu. Sixty minutes, no hard sell, and you leave with skin that looks like you slept.', 'Good as a monthly reset or the first step before stronger treatments.'], price: '£75', pricePence: 7500, durationMins: 60, bookable: true, includes: ['Double cleanse', 'Enzyme peel', 'Extractions as needed', '10 min LED', 'Facial massage', 'Bespoke mask'] },
    { slug: 'chemical-peel', name: 'Chemical peel', category: 'Resurfacing', summary: 'Medical-grade AHA/BHA peels for texture, pigmentation and breakouts. Graded to your skin; minimal downtime.', description: ['Peels are the most misunderstood treatment in skincare. Done properly they are controlled, comfortable and precise: a glycolic or lactic blend for dullness and fine lines, salicylic for congestion, mandelic for sensitive or darker skin tones.', 'We always start light and build over a course. Expect mild flaking for two to three days after stronger grades; no peeling at all from the gentler ones.'], price: 'From £95', pricePence: 9500, durationMins: 45, bookable: true, includes: ['Consultation & patch test', 'Peel graded to skin', 'Calming LED', 'Aftercare kit', 'SPF applied'] },
    { slug: 'microneedling', name: 'Microneedling', category: 'Resurfacing', summary: 'Collagen induction for scarring, pores, fine lines and texture. The one with the longest-lasting results.', description: ['Thousands of micro-channels in the skin trigger collagen and elastin production over the following weeks. It is the treatment we recommend most for acne scarring and general texture, and results keep building for three months after each session.', 'Numbing cream is applied first. You will be pink for 24–48 hours. A course of three, six weeks apart, is where the real change happens.'], price: '£180', pricePence: 18000, durationMins: 75, bookable: true, includes: ['Numbing', 'Full-face microneedling', 'Growth-factor serum', 'LED', 'Aftercare kit'] },
    { slug: 'led-therapy', name: 'LED light therapy', category: 'Maintenance', summary: 'Twenty minutes under medical-grade red, blue or near-infrared light. Calming, healing, no downtime.', description: ['LED is the quiet achiever: red light for collagen and healing, blue for acne-causing bacteria, near-infrared for inflammation. Twenty minutes, no downtime, lovely on its own and brilliant after peels or needling.', 'Courses of six, used weekly, are where LED earns its keep.'], price: '£35', pricePence: 3500, durationMins: 25, bookable: true, includes: ['Cleanse', '20 min LED', 'Serum & SPF'] },
    { slug: 'dermaplaning', name: 'Dermaplaning', category: 'Maintenance', summary: 'Precise removal of dead skin and vellus hair with a surgical blade. Instant glow; make-up sits like glass.', description: ['A sterile blade held at 45° lifts the top layer of dead skin and the fine vellus hair with it. It is painless, there is no downtime, and products penetrate better for weeks afterwards. Often paired with a light peel or the Signature facial.'], price: '£60', pricePence: 6000, durationMins: 40, bookable: true, includes: ['Cleanse', 'Dermaplaning', 'Hydrating mask', 'SPF'] },
  ],
  team: [{ name: 'Amara Osei', role: 'Founder · advanced skin therapist', bio: 'Level 4 advanced skin therapist (fictional) with eight years in clinic and a background in pharmacology. Opened Lumen in 2020 to do skincare that is honest about what works — and what is just nice.', image: { src: 'facialist', alt: 'Amara in the treatment room' } }],
  testimonials: [
    { quote: 'Three peels and my pigmentation from pregnancy has basically gone. Nobody ever told me it could.', name: 'Lauren D.', context: 'Peel course · Hove', rating: 5, source: 'google' },
    { quote: 'The consultation was the first time someone looked at my skin properly instead of selling me a cream.', name: 'Priya N.', context: 'Consultation · Brighton', rating: 5, source: 'google' },
    { quote: 'Microneedling for ten-year-old acne scars. Six months on, I don\'t wear foundation.', name: 'Jamie K.', context: 'Microneedling course · Kemptown', rating: 5, source: 'google' },
    { quote: 'Bright, clean, no whale music. Amara is clever and funny and my skin is the best it\'s been at 44.', name: 'Rachel S.', context: 'Signature facial · Lewes', rating: 5, source: 'direct' },
  ],
  faqs: [
    { q: 'Which treatment should I book?', a: 'If you are not sure, book the free skin consultation. We scan your skin, talk through what you want, and write a plan with prices. No pressure to book anything.' },
    { q: 'Is there downtime?', a: 'Signature facial, LED and dermaplaning: none. Peels: light flaking for 2–3 days on stronger grades. Microneedling: pink for 24–48 hours. We tell you exactly what to expect before you book.' },
    { q: 'Can I come if I have acne / rosacea / dark skin?', a: 'Yes — these are exactly the skins we work with most. Treatments are chosen and graded for your skin type and tone; mandelic peels and LED are especially good for darker and sensitive skin.' },
    { q: 'What about pregnancy?', a: 'The Signature facial, LED and dermaplaning are fine. We do not do peels or microneedling during pregnancy or breastfeeding.' },
    { q: 'Do I need a patch test?', a: 'For peels and microneedling, yes, 48 hours before your first one. It is included in the free consultation.' },
    { q: 'How do courses work?', a: 'Courses of three or six save 15–20% and are valid for 12 months. Pay in full or split over three months at no extra cost.' },
    { q: 'What is your cancellation policy?', a: 'Twenty-four hours notice to move or cancel. Late cancellations and no-shows are charged 50%. Courses pause for illness — just tell us.' },
    { q: 'Where do I park?', a: 'The Lanes car park (BN1 1NH) is four minutes\' walk. The studio is on the first floor; there is a lift.' },
  ],
  forms: { provider: 'demo', honeypot: '_gotcha', notifyEmail: 'hello@lumenskin.example.co.uk' },
  booking: { provider: 'demo', slotIntervalMins: 15, horizonDays: 42, minNoticeHours: 24, closedDates: ['2026-12-24', '2026-12-25', '2026-12-26', '2026-12-31', '2027-01-01'], policy: 'Twenty-four hours notice to move or cancel; late cancellations are charged 50%.', calcomLink: 'lumen-skin/treatment' },
  seo: {
    siteUrl: 'https://lumenskin.example.co.uk',
    titleTemplate: '%s · Lumen Skin Studio, Brighton',
    defaultDescription: 'Results-led facials, chemical peels, microneedling, LED and dermaplaning in Brighton\'s North Laine. Free skin consultation with imaging. Book online.',
    ogImage: '/og.jpg',
    schemaType: 'BeautySalon',
    priceRange: '££',
    keywords: ['facial Brighton', 'chemical peel Brighton', 'microneedling Brighton', 'skin clinic Brighton', 'skin consultation Brighton'],
  },
  legal: { legalName: 'Lumen Skin Studio Ltd', entityType: 'limited-company', companyNumber: '00000000 (fictional)', policiesReviewed: '2026-11-10' },
  credentials: [
    { label: 'Level 4 advanced skin therapy', detail: 'Qualified (fictional)', fictional: true },
    { label: 'Fully insured', detail: 'Treatment & premises (fictional)', fictional: true },
    { label: 'Medical-grade devices', detail: 'LED, imaging, needling' },
    { label: '5 ★ · 189 reviews', detail: 'Google (fictional)', fictional: true },
  ],
});

/** Course pricing: multiples with a discount, pence. */
export const courses = [
  { slug: 'signature-facial', name: 'Signature facial × 3', price: 19500, saves: 3000 },
  { slug: 'chemical-peel', name: 'Peel course × 3', price: 24500, saves: 4000 },
  { slug: 'microneedling', name: 'Microneedling × 3', price: 46000, saves: 8000 },
  { slug: 'led-therapy', name: 'LED × 6', price: 17500, saves: 3500 },
  { slug: 'dermaplaning', name: 'Dermaplaning × 3', price: 15500, saves: 2500 },
];

export const concerns = ['Breakouts & congestion', 'Pigmentation / dark spots', 'Redness or rosacea', 'Fine lines', 'Scarring', 'Dullness & texture', 'Dryness / dehydration', 'Large pores', 'Sensitivity', 'Not sure — just want better skin'];

/** Results stories (fictional). before/after image keys. */
export const results = [
  { title: 'Post-pregnancy pigmentation', plan: 'Consultation → 3 mandelic peels, 4 weeks apart → LED × 6', months: 4, before: 'before', after: 'after', quote: 'I stopped wearing concealer in month three.' },
  { title: 'Acne scarring, ten years old', plan: 'Consultation → microneedling × 3, 6 weeks apart → Signature monthly', months: 6, before: 'before', after: 'after', quote: 'Texture I\'d given up on. Genuinely different.' },
  { title: 'Dull, tired, forty-four', plan: 'Signature monthly → dermaplaning + light peel quarterly', months: 3, before: 'before', after: 'after', quote: 'People ask if I\'ve been away.' },
];

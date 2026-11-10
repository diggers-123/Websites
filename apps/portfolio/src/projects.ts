/**
 * Portfolio manifest: one entry per site. `status` drives the index (built sites get
 * screenshots + links; planned ones show the brief). Dev URLs are the per-app ports.
 */
export interface Project {
  slug: string;
  name: string;
  industry: string;
  sector: 'Trades & home' | 'Personal care' | 'Food & events' | 'Creative' | 'Health & fitness' | 'Pets' | 'Automotive' | 'Education';
  place: string;
  oneLiner: string;
  conversion: string;
  palette: string[];
  type: string;
  signature: string[];
  devUrl: string;
  liveUrl?: string;
  status: 'built' | 'planned';
  pages?: number;
}

export const projects: Project[] = [
  { slug: 'kingpin-barbers', name: 'Kingpin Barber Co.', industry: 'Barbering', sector: 'Personal care', place: 'Leeds', oneLiner: 'Loud, confident four-chair barbershop with a slot-booking wizard.', conversion: 'Barber → cut → date → time booking wizard', palette: ['#0e0e0e', '#f2efe6', '#d6ff3f'], type: 'Anton · Space Grotesk · JetBrains Mono', signature: ['Poster-stack hero', 'Hazard-stripe dividers', 'Marquee ticker', 'Trading-card barbers'], devUrl: 'http://localhost:4301', status: 'built', pages: 12 },
  { slug: 'hollowell-gardens', name: 'Hollowell Garden Design', industry: 'Garden design & landscaping', sector: 'Trades & home', place: 'Stroud, Cotswolds', oneLiner: 'Editorial, serif-led portfolio for a high-ticket garden designer.', conversion: 'Consultation request with live postcode-area check', palette: ['#efe9dc', '#1f3a2a', '#c9552e'], type: 'Fraunces · Figtree', signature: ['Draw-on-scroll botanicals', 'Irregular editorial grid', 'Before/after slider', 'Giant serif numerals'], devUrl: 'http://localhost:4302', status: 'built', pages: 24 },
  { slug: 'cinder-and-salt', name: 'Cinder & Salt', industry: 'Wood-fired pizza catering', sector: 'Food & events', place: 'Norwich', oneLiner: 'Fire-and-kraft event caterer with a live quote calculator.', conversion: 'Guests × package × extras × travel → instant estimate', palette: ['#1c1a17', '#d8b98a', '#ff5a1f'], type: 'Bricolage Grotesque · Work Sans · Caveat', signature: ['Torn kraft edges', 'Chalkboard menu', 'Hand-written notes', 'Sticky quote tab'], devUrl: 'http://localhost:4303', status: 'built', pages: 17 },
  { slug: 'muddy-paws', name: 'Muddy Paws Dog Grooming', industry: 'Dog grooming', sector: 'Pets', place: 'Harrogate', oneLiner: 'Playful, illustrated groomer with size-based pricing.', conversion: 'Size → coat → groom → time, exact price up front', palette: ['#f2b544', '#1e5f6b', '#ff6b57'], type: 'Fredoka · Nunito', signature: ['Illustrated dog line-up', 'Blob photo masks', 'Speech-bubble reviews', 'Wavy dividers'], devUrl: 'http://localhost:4304', status: 'built', pages: 12 },
  { slug: 'bramley-electrical', name: 'Bramley Electrical', industry: 'Electrician', sector: 'Trades & home', place: 'Sheffield', oneLiner: 'Industrial, safety-yellow tradesperson site with a quote request and emergency lane.', conversion: 'Quote request + emergency call-out', palette: ['#e9e8e3', '#1b1d21', '#ffc800'], type: 'Barlow Condensed · Barlow', signature: ['Label-tag photo annotations', 'Grid-paper sections', 'Fixed-price menu'], devUrl: 'http://localhost:4305', status: 'planned' },
  { slug: 'nell-ashworth', name: 'Nell Ashworth Photography', industry: 'Wedding & family photography', sector: 'Creative', place: 'Edinburgh', oneLiner: 'Monochrome editorial portfolio with a single vermilion accent.', conversion: 'Date-availability enquiry', palette: ['#f7f5f0', '#141414', '#e4472b'], type: 'Instrument Serif · Instrument Sans', signature: ['Type-on-image hero', 'Film-frame captions', 'Hover image-reveal nav'], devUrl: 'http://localhost:4306', status: 'planned' },
  { slug: 'lumen-skin', name: 'Lumen Skin Studio', industry: 'Facials & skin treatments', sector: 'Personal care', place: 'Brighton', oneLiner: 'Bright, science-led skin studio — lilac, plum and tangerine light.', conversion: 'Treatment booking (Cal.com-ready) + consultation', palette: ['#eee6ff', '#3b1c4f', '#ff7a1a'], type: 'Outfit · DM Sans', signature: ['Single-light gradient', 'Circular treatment carousel', 'Results cards'], devUrl: 'http://localhost:4307', status: 'planned' },
  { slug: 'forge-fitness', name: 'Forge Personal Training', industry: 'Personal training', sector: 'Health & fitness', place: 'Cardiff', oneLiner: 'Cobalt and volt, diagonal cuts, giant numerals.', conversion: 'Free consultation booking + timetable', palette: ['#f4f3ee', '#1f3bff', '#e8ff47'], type: 'Archivo Black · Archivo', signature: ['Diagonal hero', 'Weight-plate O', 'Timetable grid', 'Stat count-ups'], devUrl: 'http://localhost:4308', status: 'planned' },
  { slug: 'northgate-garage', name: 'Northgate Motor Works', industry: 'Independent garage & MOT', sector: 'Automotive', place: 'Stockport', oneLiner: 'Job-card UI, reg-plate input, honest prices.', conversion: 'MOT / service slot booking', palette: ['#ffffff', '#0b1f3a', '#e0261c'], type: 'IBM Plex Sans Condensed · Plex Sans · Plex Mono', signature: ['Registration-plate input', 'Status chips', 'Checklist animations'], devUrl: 'http://localhost:4309', status: 'planned' },
  { slug: 'bright-spark', name: 'Bright Spark Tutoring', industry: 'Maths & science tuition', sector: 'Education', place: 'Cambridge & online', oneLiner: 'Exercise-book grid, highlighter swipes, margin notes.', conversion: 'Free assessment call booking', palette: ['#fbfaf6', '#1d2e6b', '#fff048'], type: 'Plus Jakarta Sans · Caveat', signature: ['Grid-paper system', 'Highlighter swipes', 'Sticky-note tabs'], devUrl: 'http://localhost:4310', status: 'planned' },
];

# Business Portfolio & Creative Briefs

Ten fictional UK sole traders / small businesses, each with its own brand, creative direction and
functional requirements. **All businesses, people, addresses, phone numbers, reviews and
credentials are fictional** and are labelled as such inside each site's config.

The ten were selected to (a) cover the industries a UK web studio is most likely to sell to,
(b) demand genuinely different visual languages, and (c) exercise different conversion
mechanics (slot booking, quote calculators, consultation requests, project enquiries).

| # | Slug | Business | Industry | Location | Conversion mechanic | Visual world (one line) |
|---|------|----------|----------|----------|---------------------|--------------------------|
| 1 | `kingpin-barbers` | Kingpin Barber Co. | Barbering | Leeds | Multi-step slot booking (barber → service → date → time) | Black / chartreuse brutalist poster, stencil type, marquee |
| 2 | `hollowell-gardens` | Hollowell Garden Design | Garden design & landscaping | Stroud, Cotswolds | Design consultation request + project enquiry | Deep moss / terracotta / chalk, editorial serif, botanical line art |
| 3 | `bramley-electrical` | Bramley Electrical | Electrician (domestic & commercial) | Sheffield | Quote request + emergency call-out | Safety-yellow / graphite, condensed industrial type, wiring-diagram graphics |
| 4 | `muddy-paws` | Muddy Paws Dog Grooming | Pet grooming | Harrogate | Groom booking with size-based price estimate | Mustard / teal / cocoa, chunky rounded type, custom dog illustrations |
| 5 | `nell-ashworth` | Nell Ashworth Photography | Wedding & family photography | Edinburgh | Date-availability enquiry | Monochrome photography + single vermilion accent, extreme type scale |
| 6 | `cinder-and-salt` | Cinder & Salt Wood-Fired Pizza | Event catering | Norwich | Event quote calculator (guests × menu × date) | Charcoal / flame orange / kraft, hand-drawn marks, chalkboard menu |
| 7 | `lumen-skin` | Lumen Skin Studio | Facials & skin treatments | Brighton | Treatment booking (Cal.com-ready) + skin consultation | Tangerine / plum / pale lilac, soft geometric type, gradient light |
| 8 | `forge-fitness` | Forge Personal Training | Personal training & small-group | Cardiff | Free consultation booking + programme enquiry | Cobalt / volt yellow / off-white, giant numerals, diagonal cuts |
| 9 | `northgate-garage` | Northgate Motor Works | Independent garage & MOT | Stockport | MOT / service slot booking + instant price list | Workshop utility: navy / white / signal red, monospace data, checklist UI |
| 10 | `bright-spark` | Bright Spark Tutoring | Maths & science tuition | Cambridge + online | Free assessment call (Cal.com-ready) + enquiry | Paper white / ink blue / highlighter yellow, notebook grid, annotations |

Shared commercial logic: every site has a persistent primary CTA, phone number in the header on
mobile, trust signals above the fold, a dedicated page per key service (for local SEO), reviews,
FAQs, a service-area page, and legal pages flagged for business-specific review.

---

## 1. Kingpin Barber Co. — Leeds

**Strategy.** Walk-in culture is dying; barbers now live or die by online booking. Customers want:
price list, who's cutting, how long, can I book *now*. Differentiator: a four-chair independent
shop in Leeds city centre with a loud, proud personality. Objective: bookings.

**Brand.** Personality: loud, confident, dry Yorkshire humour. Wordmark: "KINGPIN" in a heavy
stencil/condensed face with a crown-pin glyph (bowling pin + crown) as the mark.
- Palette (60/30/10): Jet black `#0E0E0E` · Chalk `#F2EFE6` · **Chartreuse `#D6FF3F`** (accent).
  Supporting: warm grey `#8A877F`.
- Type: **Anton** (display, condensed, uppercase) + **Space Grotesk** (body/UI). Monospace
  accents (`JetBrains Mono`) for prices and times.
- Image direction: high-contrast, grainy monochrome shop photography with chartreuse
  duotone applied on hover; tight crops of hands, clippers, chairs.
- Graphic style: thick 3px rules, hard-edged blocks, zero border radius, diagonal striped
  "hazard" dividers in chartreuse, oversized marquee text strip, poster-style numbering.
- Motion: marquee ticker, text reveals with clip-path wipes, button hover = colour-fill wipe.

**Homepage concept.** Full-bleed black hero: left two-thirds is a 20vw stencilled "KINGPIN"
stacked above "LEEDS · EST. 2016" in mono; right third a tall monochrome portrait. Chartreuse
"BOOK A CHAIR →" bar fixed to the bottom on mobile. Below: a horizontally scrolling price
list (as a poster board), "The Chairs" (barber profiles as trading cards), a marquee of
reviews, opening-hours board, and a map strip.

**Pages.** Home · Services & Prices · The Barbers · Book · Gallery · About · Contact ·
FAQ · Privacy · Terms.

**Functionality.** Custom booking wizard (Preact island): choose barber (or "any"), service(s),
date (next 21 days, closed Sun/Mon), 15-minute slot grid generated from barber hours and
service duration, customer details with validation, summary, confirmation. Demo availability is
deterministic per date (seeded) and clearly labelled "Demo mode". Config flag to switch to a
Cal.com per-barber event-type embed.

**Distinctive features.** Marquee strip; price board that reads like a shop poster; barber
trading cards that flip; hazard-stripe dividers; bottom booking bar on mobile.

---

## 2. Hollowell Garden Design — Stroud, Cotswolds

**Strategy.** High-ticket (£8k–£80k) projects, long consideration. Customers want to see finished
gardens, understand the process (survey → concept → planting plan → build), and feel the designer
is tasteful and reliable. Objective: qualified design-consultation requests.

**Brand.** Personality: considered, warm, quietly expert — a designer who knows soil as well as
style. Wordmark: "Hollowell" in a high-contrast serif with a small drawn seed-head mark.
- Palette: Deep moss `#1F3A2A` (60) · Chalk/linen `#EFE9DC` (30) · **Terracotta `#C9552E`**
  (10). Supporting: pale sage `#B9C7B0`, ink `#14201A`.
- Type: **Fraunces** (variable serif, optical sizes, used large and small-caps) + **Figtree**
  (clean humanist sans for body). Italic Fraunces for captions and pull-quotes.
- Image direction: real garden photography, soft natural light, wide landscape crops and
  tight planting details; 4:5 portraits for process pages.
- Graphic style: single-weight botanical line drawings (SVG, custom), thin hairline rules,
  numbered process in oversized serif numerals, text wrapped around image offsets.
- Motion: slow parallax on hero image, line drawings that "draw" on scroll (stroke-dashoffset),
  gentle fade-ups. Reduced-motion disables all.

**Homepage concept.** Editorial magazine cover: hero is a bleed photograph on the right 60%
with a tall white column on the left carrying a very large serif headline ("Gardens that
belong to their landscape") and a small drawn seed-head. Then a "Recent gardens" section as an
irregular editorial grid (3 different image sizes), a 4-step process with giant numerals, a
"Season notes" journal teaser, and a quiet consultation CTA panel in terracotta.

**Pages.** Home · Services (Garden Design, Planting Design, Landscaping & Build, Garden
Consultations) · Gardens (portfolio with 6 case studies) · Process · About · Journal (3 posts)
· Contact / Book a Consultation · Areas Covered · Privacy.

**Functionality.** Consultation request form: garden size, budget band, timeframe, postcode
check against covered areas (GL/BA/SN/OX prefixes), preferred contact. Project enquiry attaches
"what to expect next" timeline. No slot booking (designer chooses times by phone).

**Distinctive features.** Drawn-on-scroll botanicals; editorial image grid; numbered process;
case studies with before/after slider (pure CSS/JS, accessible).

---

## 3. Bramley Electrical — Sheffield

**Strategy.** Customers searching "electrician Sheffield" want: are you qualified (NICEIC/NAPIT
style registration — fictional labelled), can you come today, what does it roughly cost, do you
do EV chargers / rewires / consumer units / EICRs. Objective: quote requests and emergency calls.

**Brand.** Personality: straight-talking, reliable, modern tradesperson. Wordmark: "BRAMLEY"
in a condensed industrial grotesque with a lightning-bolt-as-letter detail in the "Y".
- Palette: Graphite `#1B1D21` (30) · Off-white concrete `#E9E8E3` (60) · **Safety yellow
  `#FFC800`** (10). Supporting: signal red for emergency only `#E63B2E`.
- Type: **Barlow Condensed** (display/labels) + **Barlow** (body). Tabular numerals.
- Image direction: honest job photography — consumer units, EV chargers on brick, van on a
  Sheffield street; cropped tight with yellow label tags overlaid.
- Graphic style: wiring-diagram line motifs, "label-maker" tags, dashed outlines, grid
  paper background on sections, big checkbox trust list, chevrons.
- Motion: minimal. Tags slide in, hover reveals yellow underline bar.

**Homepage concept.** Split hero: left, headline in condensed caps "SHEFFIELD'S ELECTRICIAN
FOR THE JOBS THAT CAN'T WAIT" with two CTAs — yellow "Get a quote" and outlined red "Emergency
call-out"; right, a photo with yellow label tags pointing to "EV charger", "Consumer unit",
"EICR". Below: services as a grid of yellow-tagged tiles, "How a quote works" (3 steps on
grid paper), fixed-price menu, certification band, reviews, areas list.

**Pages.** Home · Services (overview + Rewires, Consumer Units, EV Chargers, EICR & Landlord
Certificates, Lighting, Emergency) · Pricing · About · Reviews · Areas Covered · Get a Quote ·
Contact · Privacy.

**Functionality.** Quote request: job type, property type, description, photo upload field
(client-side preview, provider-dependent), urgency, postcode. Emergency path: tel: link +
"what counts as an emergency" panel. Instant fixed-price menu table.

**Distinctive features.** Label-tag annotations on photos; grid-paper sections; emergency red
lane; fixed-price table.

---

## 4. Muddy Paws Dog Grooming — Harrogate

**Strategy.** Owners want reassurance (gentle, qualified, insured), prices by dog size, how long
it takes, and simple booking. Objective: bookings and repeat customers (6–8 week cycle).

**Brand.** Personality: warm, playful, competent. Wordmark: "Muddy Paws" in a chunky rounded
display with a paw-print replacing the dot of an "i"-style flourish; custom flat-vector dog mascots.
- Palette: Mustard `#F2B544` (60) · Teal `#1E5F6B` (30) · **Cocoa `#4A2B1E`** text + **Coral
  `#FF6B57`** (10 accent). Supporting: cream `#FFF5E1`.
- Type: **Fredoka** (rounded display) + **Nunito** (body).
- Image direction: happy dogs post-groom, bright and saturated; custom SVG dog illustrations
  (5 breeds as size categories) carry the brand where photos are missing.
- Graphic style: blobby organic shapes used *deliberately* as photo masks (not floating
  decoration), bold outlines, stickers/badges, wavy section dividers, big pill buttons.
- Motion: mascot wag on hover, sticker pop-in, playful but short.

**Homepage concept.** Mustard hero with a huge teal headline "Clean dog. Happy dog." and an
illustrated line-up of dogs small → large that doubles as the size/price selector (click a dog
→ jumps to prices for that size). Then "What happens at a groom" as a comic-strip row, prices
by size, meet the groomer, reviews as speech bubbles, salon photos, booking CTA.

**Pages.** Home · Services & Prices · Book · About · Gallery · FAQ · Puppy's First Groom ·
Contact · Privacy · Terms (cancellation policy).

**Functionality.** Booking wizard: dog size (illustrated), breed/coat type, service, add-ons,
date (Tue–Sat), slots by service duration, dog + owner details, estimate + summary,
confirmation. Demo mode labelled; Cal.com option.

**Distinctive features.** Illustrated dog-size selector; comic-strip process; speech-bubble
reviews; wavy dividers.

---

## 5. Nell Ashworth Photography — Edinburgh

**Strategy.** Couples decide on photographers by style within seconds; images must dominate.
Then: pricing transparency (from-prices), availability on their date, personality. Objective:
date-availability enquiries.

**Brand.** Personality: calm, observant, editorial; documentary not posed. Wordmark: "Nell
Ashworth" set in a light grotesque, letterspaced, with a small vermilion full stop.
- Palette: Paper `#F7F5F0` (60) · Ink `#141414` (30) · **Vermilion `#E4472B`** (10). Photography
  is the colour.
- Type: **Instrument Serif** (display, italic for emphasis) + **Instrument Sans** (body).
- Image direction: documentary wedding and family photography, natural light; mixed 3:2 and
  4:5; hero image changes per visit (array of 3).
- Graphic style: extreme scale contrast (one 12vw headline, 11px captions), lots of
  asymmetric white space used purposefully, hairline rules, image captions with film-frame
  numbering ("014 / 118").
- Motion: slow crossfade in hero, images that settle in on scroll, cursor-following
  "View" label on gallery items (desktop only).

**Homepage concept.** Hero: a single large photograph offset to the right bleeding off the
page, with "Nell Ashworth" small top-left and a huge italic serif line "Photographs for people
who'd rather be living it" overlapping the image's bottom-left. Then a masonry-free asymmetric
gallery (CSS grid with spans), "Weddings / Families / Portraits" as three oversized text links
with image reveals on hover, a pricing-from strip, kind words, and "Check your date".

**Pages.** Home · Weddings · Families & Portraits · Portfolio (galleries) · Pricing · About ·
Journal (2 posts) · Check Your Date (enquiry) · Contact · Privacy.

**Functionality.** Date-availability enquiry: date picker, venue, type, how they heard,
message. Demo mode shows deterministic "likely available / already booked" from a seeded set
of booked dates in config; labelled as demo until connected to a real calendar.

**Distinctive features.** Overlapping type-on-image hero; film-frame captions; hover
image-reveal text nav; asymmetric galleries.

---

## 6. Cinder & Salt Wood-Fired Pizza — Norwich

**Strategy.** Event catering (weddings, parties, corporate, festivals) is sold on photos,
menus, price per head and availability. Objective: event quote requests with enough detail to
price accurately.

**Brand.** Personality: fire, generosity, a bit rough-and-ready. Wordmark: hand-lettered-style
"Cinder & Salt" with an ampersand flame mark.
- Palette: Charcoal `#1C1A17` (60) · Kraft `#D8B98A` (30) · **Flame `#FF5A1F`** (10). Supporting:
  ember `#B8321A`, ash `#6B655C`.
- Type: **Bricolage Grotesque** (expressive display with big optical range) + **Work Sans**
  body; **Caveat** sparingly for hand-written menu notes.
- Image direction: fire, dough, hands, crowds at dusk; warm, dark, grainy.
- Graphic style: kraft-paper texture blocks, chalk-style menu board, torn-edge dividers
  (SVG), stamp/badge marks ("Norfolk · Suffolk · Cambs"), scorch marks on hover.
- Motion: flame flicker in logo (subtle), menu items reveal, counter animation on the quote
  calculator.

**Homepage concept.** Dark hero with the oven as the image, a flame-orange headline "Fire.
Dough. Your lot." and a sticky "Get an event quote" tab. Then an "events we cater" row as
torn-paper cards, the menu board (chalk on charcoal), a guest-count price estimator teaser,
gallery, "how booking works", reviews on kraft paper, availability CTA.

**Pages.** Home · Events (Weddings, Private Parties, Corporate, Festivals & Markets) · Menu ·
Pricing & Packages · Gallery · About · FAQ · Get a Quote · Contact · Privacy · Terms.

**Functionality.** Quote calculator (Preact): event type, date, guests, package, extras
(desserts, salads, extra hour), travel band by postcode area → live estimate range and
minimum spend rule; submits as enquiry with summary. Date shows demo availability.

**Distinctive features.** Live quote calculator; chalkboard menu; torn-paper edges; stamps.

---

## 7. Lumen Skin Studio — Brighton

**Strategy.** Clients want results, hygiene, expertise, clear treatment menu, easy booking and
a non-intimidating first step (skin consultation). Objective: bookings, consultation bookings,
course sales.

**Brand.** Personality: bright, modern, science-led but friendly — the opposite of hushed
beige. Wordmark: "lumen" lowercase geometric with a glowing counter in the "u" — rendered as a
soft radial gradient.
- Palette: Pale lilac `#EEE6FF` (60) · Deep plum `#3B1C4F` (30) · **Tangerine `#FF7A1A`** (10).
  Supporting: glow gradient tangerine → pink `#FF9ECF`.
- Type: **Outfit** (geometric display) + **DM Sans** (body).
- Image direction: skin close-ups, light, water, treatment room; colour-graded towards lilac
  and warm highlights.
- Graphic style: large soft radial "light" gradients used as hero backgrounds (deliberate,
  single, not blobs), full-round pills, circular treatment icons, generous type scale,
  before/after cards.
- Motion: slow light drift in hero gradient, pill buttons expand, treatment cards tilt
  slightly on hover.

**Homepage concept.** Hero: lilac field with a single huge tangerine-to-pink light gradient
behind a centred-left headline "Skin that looks like you slept." and a two-button CTA
(Book a treatment / Free skin consultation). Then treatment menu as a horizontal scroll of
circular tiles, results stories, "your first visit" steps, the studio, reviews, booking CTA.

**Pages.** Home · Treatments (overview + Facials, Peels, Microneedling, LED, Dermaplaning) ·
Skin Consultation · Prices & Courses · Results · About · Book · Contact · FAQ · Privacy · Terms.

**Functionality.** Booking: Cal.com inline embed per treatment when configured; demo wizard
otherwise. Consultation form with skin-concern checklist. Gift voucher enquiry.

**Distinctive features.** Single-light gradient system; circular treatment carousel; results
cards; consult checklist.

---

## 8. Forge Personal Training — Cardiff

**Strategy.** PT clients buy a person and a plan. They need: who you are, who you train, what
it costs, proof, and a zero-risk first step (free consult). Objective: consultation bookings.

**Brand.** Personality: energetic, direct, encouraging — not macho. Wordmark: "FORGE" in a
heavy wide grotesque with the "O" as a weight plate.
- Palette: Off-white `#F4F3EE` (60) · Cobalt `#1F3BFF` (30) · **Volt `#E8FF47`** (10). Supporting:
  near-black `#101114`.
- Type: **Archivo Black / Archivo** (wide, heavy display + body) with **tabular numerals**
  for stats.
- Image direction: real training moments in a gym and outdoors in Cardiff Bay; high energy,
  motion blur, cobalt duotone options.
- Graphic style: diagonal cut sections (clip-path), giant stat numerals, "programme cards"
  as index cards, repeating stripe pattern, bold outlines.
- Motion: number count-ups, diagonal reveal, button skew on hover.

**Homepage concept.** Hero split on a diagonal: top-left off-white with a huge headline
"STRONGER IN 12 WEEKS. NO NONSENSE." bottom-right a cobalt duotone photo. Volt CTA "Book a
free consult". Then "Who I train" (3 audience cards), programmes with prices, a weekly small-
group timetable grid, results (numbers), testimonials, consultation CTA.

**Pages.** Home · Personal Training · Small Group · Online Coaching · Pricing · Timetable ·
Results · About · Book a Consult · Contact · Privacy · Terms.

**Functionality.** Free consultation booking (demo wizard / Cal.com). Timetable grid with
"join session" enquiry. Pricing toggle (per session / block).

**Distinctive features.** Diagonal composition; weight-plate "O"; timetable grid; stat count-ups.

---

## 9. Northgate Motor Works — Stockport

**Strategy.** Garage customers are anxious about honesty and price. They want: MOT price, can I
book now, courtesy car, which makes, reviews. Objective: MOT/service bookings and quote calls.

**Brand.** Personality: honest, organised, "we'll show you the part". Wordmark: "NORTHGATE"
in a wide mechanical grotesque with a chevron arrow.
- Palette: Navy `#0B1F3A` (30) · White `#FFFFFF` (60) · **Signal red `#E0261C`** (10). Supporting:
  steel `#8C97A6`, pale grey `#EEF1F5`.
- Type: **IBM Plex Sans Condensed** (headings) + **IBM Plex Sans** (body) + **IBM Plex Mono**
  (prices, reg plates, data).
- Image direction: clean workshop, diagnostic screens, hands with torque wrench; neutral,
  well lit.
- Graphic style: job-card / checklist UI, UK registration-plate styled inputs (yellow plate),
  tabular pricing, status chips, hairline grid.
- Motion: checklist ticks animate, minimal.

**Homepage concept.** Hero as a "job card": white panel with a large registration-plate input
("Enter your reg to book an MOT"), MOT price in big mono, three trust chips (Fictional MOT
station number, courtesy car, 12-month guarantee). Right: workshop photo with status chips.
Then services with prices, "why independent", process checklist, reviews, map & hours.

**Pages.** Home · Services (MOT, Servicing, Diagnostics, Brakes & Clutches, Tyres, Air Con) ·
Prices · Book · About · Reviews · Contact · FAQ · Privacy · Terms.

**Functionality.** Booking: vehicle (reg, make/model — optional free-text, no DVLA call
without key; integration note), service, date, AM/PM or hourly drop-off slot, courtesy-car
checkbox, details, summary, confirmation. Demo availability labelled.

**Distinctive features.** Reg-plate input; job-card UI; status chips; checklist animations.

---

## 10. Bright Spark Tutoring — Cambridge & online

**Strategy.** Parents (and some adult learners) want: qualifications & DBS (fictional labelled),
subjects/levels, results, price, how online lessons work, and a low-friction first call.
Objective: free assessment-call bookings.

**Brand.** Personality: encouraging, clear, clever but never patronising. Wordmark: "Bright
Spark" in a friendly geometric sans with a highlighter-swipe behind "Spark".
- Palette: Paper white `#FBFAF6` (60) · Ink blue `#1D2E6B` (30) · **Highlighter yellow
  `#FFF048`** (10). Supporting: pencil grey `#9A9A93`, correction red `#E24B3B` (sparingly).
- Type: **Plus Jakarta Sans** (display/body) + **Caveat**/handwritten SVG annotations for
  margin notes.
- Image direction: real study moments, notebooks, laptops with equations, light and airy.
- Graphic style: exercise-book grid lines, highlighter swipes behind key phrases, margin
  annotations with arrows, sticky-note cards, A4 "page" sections.
- Motion: highlighter swipe draws in on scroll, annotations fade in; very light.

**Homepage concept.** Hero on exercise-book grid paper: headline "Maths and science tuition
that actually clicks." with a highlighter swipe, a margin annotation "GCSE · A-level · 11+",
and a CTA "Book a free assessment call". Then subjects & levels as tabbed sticky notes, "how
lessons work" (online + in-person), results & parent reviews, pricing, about the tutor, FAQ.

**Pages.** Home · Subjects (Maths, Physics, Chemistry, Biology, 11+ & Entrance) · How It Works ·
Pricing · Results & Reviews · About · Book a Free Call · Resources (3 articles) · Contact ·
Privacy · Safeguarding (clearly marked for review).

**Functionality.** Free assessment-call booking (Cal.com-ready / demo wizard with 20-min
slots), enquiry form with student year group, subjects, goals.

**Distinctive features.** Grid-paper and highlighter system; margin annotations; sticky-note tabs.

---

## Side-by-side distinctiveness check (to keep honest)

| Axis | Distinct values across the ten |
|------|-------------------------------|
| Background mode | Dark (1, 6), light (2, 3, 5, 8, 9, 10), coloured (4, 7) |
| Type family | Condensed stencil, high-contrast serif, industrial condensed, rounded, light grotesque + italic serif, expressive grotesque, geometric, wide heavy, Plex system, friendly geometric |
| Hero layout | Stacked poster + portrait, editorial split 40/60, split with annotated photo, illustrated line-up, overlapping type-on-image, dark image + sticky tab, single light gradient, diagonal split, job-card form, grid-paper page |
| Shape language | Hard edges, hairlines, tags/dashed, blobs-as-masks, none/space, torn edges, full-round, diagonals, chips/plates, notebook lines |
| Motion signature | Marquee/wipes, draw-on-scroll, slide-in tags, sticker pop, crossfade/cursor label, flicker/counter, light drift, count-ups/diagonal, ticks, highlighter swipe |

No two sites share a primary typeface, hero composition or section order.

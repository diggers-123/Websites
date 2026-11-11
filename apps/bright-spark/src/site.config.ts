/**
 * BRIGHT SPARK TUTORING — Cambridge & online. FICTIONAL demonstration data.
 * Everything a buyer changes lives here (and in theme.css / images.ts).
 */
import { defineSite, hours } from '@site/core';

export const site = defineSite({
  slug: 'bright-spark',
  name: 'Bright Spark Tutoring',
  tagline: 'Maths & science tuition, Cambridge and online',
  isFictional: true,
  owner: { name: 'Anjali Mehta', title: 'Tutor & founder' },
  founded: 2018,
  phone: '01223 920 614',
  phoneHref: '+441223920614',
  email: 'hello@brightsparktuition.example.co.uk',
  address: { line1: 'Home study, Mill Road', line2: 'Petersfield', town: 'Cambridge', county: 'Cambridgeshire', postcode: 'CB1 2AD', lat: 52.2003, lng: 0.1371 },
  serviceAreas: ['Cambridge (in person)', 'Cherry Hinton', 'Trumpington', 'Girton', 'Histon', 'Great Shelford', 'Online — anywhere in the UK'],
  postcodePrefixes: ['CB1', 'CB2', 'CB3', 'CB4', 'CB5', 'CB21', 'CB22', 'CB23', 'CB24', 'CB25'],
  // Lesson/call hours: after school on weekdays, Saturday mornings.
  hours: hours({ mon: ['15:30', '20:30'], tue: ['15:30', '20:30'], wed: ['15:30', '20:30'], thu: ['15:30', '20:30'], fri: ['15:30', '19:00'], sat: ['09:00', '14:00'], sun: null }),
  social: { instagram: 'https://instagram.com/', linkedin: 'https://linkedin.com/', google: 'https://maps.google.com/' },
  nav: [
    { label: 'Subjects', href: '/subjects' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Results', href: '/results' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ],
  footerNav: [
    { label: 'Contact', href: '/contact' },
    { label: 'Safeguarding', href: '/safeguarding' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Image credits', href: '/credits' },
  ],
  primaryCta: { label: 'Book a free call', href: '/book' },
  secondaryCta: { label: 'See subjects', href: '/subjects' },
  services: [
    { slug: 'assessment-call', name: 'Free assessment call', category: 'Start here', summary: 'Twenty minutes on the phone or video. Where the student is, what the target is, and whether I\'m the right fit. No obligation.', price: 'Free', pricePence: 0, durationMins: 20, bookable: true, includes: ['Honest view of current level', 'Target grade and timeline', 'Suggested lesson plan', 'Prices and availability'] },
    { slug: 'maths', name: 'Maths', category: 'Subjects', summary: 'KS3, GCSE and A-level (AQA, Edexcel, OCR). From "I hate maths" to A*.', price: 'from £45/hr', pricePence: 4500, durationMins: 60, includes: ['Weekly 60-minute lessons', 'Past-paper practice', 'Marked homework', 'Exam-technique sessions'] },
    { slug: 'physics', name: 'Physics', category: 'Subjects', summary: 'GCSE and A-level physics, taught by someone who did it for a living first.', price: 'from £45/hr', pricePence: 4500, durationMins: 60, includes: ['Required practicals explained', 'Maths-for-physics support', 'Six-mark question technique'] },
    { slug: 'chemistry', name: 'Chemistry', category: 'Subjects', summary: 'GCSE and A-level chemistry. Moles, mechanisms and the stuff that trips everyone up.', price: 'from £45/hr', pricePence: 4500, durationMins: 60, includes: ['Calculations made routine', 'Organic mechanisms drawn step by step', 'Practical-skills questions'] },
    { slug: 'biology', name: 'Biology', category: 'Subjects', summary: 'GCSE and A-level biology. Precise language, structured answers, less memorising.', price: 'from £45/hr', pricePence: 4500, durationMins: 60, includes: ['Mark-scheme language', 'Data-analysis questions', 'Required practicals'] },
    { slug: 'eleven-plus', name: '11+ & entrance', category: 'Subjects', summary: 'Maths and non-verbal reasoning for 11+ and independent-school entrance. Calm, confidence-first.', price: 'from £42/hr', pricePence: 4200, durationMins: 60, includes: ['Timed practice', 'Reasoning strategies', 'Parent feedback after every lesson'] },
  ],
  team: [{ name: 'Anjali Mehta', role: 'Tutor & founder', bio: 'PhD in physics (fictional), six years teaching maths and physics in a Cambridgeshire secondary school, tutoring full-time since 2018. Enhanced DBS and safeguarding trained (fictional).' }],
  testimonials: [
    { quote: 'Maths went from a 4 in the November mock to a 7 in the real thing. More importantly, he stopped saying he was "bad at maths".', name: 'Sarah T.', context: 'Parent · GCSE maths · Trumpington', rating: 5, source: 'google' },
    { quote: 'Online lessons were better than I expected — the shared whiteboard means she can see exactly where I go wrong.', name: 'Maya K.', context: 'A-level chemistry · online', rating: 5, source: 'direct' },
    { quote: 'Anjali explained forces in a way three years of school never managed. A* physics, off to study engineering.', name: 'Tom & Helen R.', context: 'Parents · A-level physics · Cherry Hinton', rating: 5, source: 'google' },
    { quote: 'Our daughter actually looked forward to 11+ practice. Offer from her first-choice school.', name: 'Priyanka D.', context: 'Parent · 11+ · Great Shelford', rating: 5, source: 'google' },
    { quote: 'Clear, patient, and brutally honest about what needed work. Exactly what a resit student needs.', name: 'Jake M.', context: 'GCSE maths resit · adult learner', rating: 5, source: 'direct' },
  ],
  faqs: [
    { q: 'Online or in person?', a: 'Both. In-person lessons are at my home study on Mill Road, Cambridge (parents welcome to stay). Online lessons use video plus a shared whiteboard, and work just as well from Year 9 up — many students prefer them.' },
    { q: 'What happens in the free assessment call?', a: 'Twenty minutes with you (and the student, ideally). I ask about current grades, targets and what\'s been tried; I give an honest view of what\'s achievable and in what timeframe, and quote exact prices. If I\'m not the right fit I\'ll say so and suggest alternatives.' },
    { q: 'How many lessons will we need?', a: 'Most GCSE and A-level students do one 60-minute lesson a week from the start of the autumn term, moving to two a week after the mocks. A focused resit or top-up is often 10–15 lessons. I\'ll suggest a plan on the call and review it each half-term.' },
    { q: 'Which exam boards do you cover?', a: 'AQA, Edexcel, OCR (including OCR MEI maths) and Cambridge IGCSE. For 11+: GL, CEM-style reasoning and independent-school papers.' },
    { q: 'Are you DBS checked?', a: 'Yes — Enhanced DBS on the Update Service, plus safeguarding training (fictional for this demonstration; a real tutor should show the certificate on request). See the safeguarding page.' },
    { q: 'What if we need to cancel?', a: 'Twenty-four hours\' notice to move or cancel a lesson at no charge. Less than that and the lesson is charged, except for illness — just let me know.' },
    { q: 'Do you set homework?', a: 'Yes, 30–45 minutes between lessons, marked before the next one. Students who do it progress about twice as fast. Parents get a short note after every lesson.' },
    { q: 'Do you tutor adults?', a: 'Yes — GCSE maths resits for access courses, nursing, teaching and apprenticeships are a regular part of the week.' },
  ],
  forms: { provider: 'demo', honeypot: '_gotcha', notifyEmail: 'hello@brightsparktuition.example.co.uk' },
  booking: { provider: 'demo', slotIntervalMins: 20, horizonDays: 28, minNoticeHours: 12, closedDates: ['2026-12-21', '2026-12-22', '2026-12-23', '2026-12-24', '2026-12-25', '2026-12-26', '2026-12-28', '2026-12-29', '2026-12-30', '2026-12-31', '2027-01-01'], policy: 'Free, twenty minutes, no obligation. If you can\'t make it, just reply to the confirmation and we\'ll find another time.', calcomLink: 'bright-spark/assessment-call' },
  seo: {
    siteUrl: 'https://brightsparktuition.example.co.uk',
    titleTemplate: '%s · Bright Spark Tutoring, Cambridge',
    defaultDescription: 'Maths, physics, chemistry, biology and 11+ tuition in Cambridge and online. GCSE and A-level specialist, ex-secondary teacher, DBS checked. Book a free 20-minute assessment call.',
    ogImage: '/og.jpg',
    schemaType: 'EducationalOrganization',
    priceRange: '££',
    keywords: ['maths tutor Cambridge', 'physics tutor Cambridge', 'GCSE tutor Cambridge', 'A-level tutor online', '11+ tutor Cambridge'],
  },
  legal: { legalName: 'Anjali Mehta trading as Bright Spark Tutoring', entityType: 'sole-trader', icoReference: 'ZA000000 (fictional)', policiesReviewed: '2026-11-11' },
  credentials: [
    { label: 'PhD physics', detail: 'University (fictional)', fictional: true },
    { label: 'Ex-secondary teacher', detail: '6 years, Cambridgeshire (fictional)', fictional: true },
    { label: 'Enhanced DBS', detail: 'Update Service (fictional)', fictional: true },
    { label: '4.9 ★ · 74 reviews', detail: 'Google (fictional)', fictional: true },
  ],
});

/** Subject detail used by /subjects/[slug]. Keyed by service slug. */
export const subjects = [
  { slug: 'maths', name: 'Maths', image: 'whiteboard', levels: ['KS3', 'GCSE', 'A-level', 'Adult resit'], boards: 'AQA · Edexcel · OCR · OCR MEI · IGCSE', headline: 'The subject most people decide they\'re bad at — usually around Year 8.', intro: ['Nobody is bad at maths. Most students have one or two missing foundations (fractions, negatives, rearranging) that make everything on top wobble. We find the gaps in the first two lessons and fill them before touching exam content.', 'From there it\'s method, practice and exam technique: knowing what a five-mark question wants, and how to pick up method marks when the answer is wrong.'], topics: ['Number & algebra foundations', 'Ratio, proportion & percentages', 'Geometry & trigonometry', 'Probability & statistics', 'A-level: calculus, mechanics, statistics', 'Further maths on request'], results: '92% of GCSE students improved by two or more grades between mock and final (fictional, 2023–25).' },
  { slug: 'physics', name: 'Physics', image: 'laptop', levels: ['GCSE', 'A-level'], boards: 'AQA · Edexcel · OCR A', headline: 'Physics is maths with a story. Students who hate it usually just can\'t see the story yet.', intro: ['I did physics for a living before I taught it, which helps: every topic gets a "why this matters" before the equations. We spend real time on the maths-for-physics skills (rearranging, units, standard form) that quietly cost most marks.', 'A-level students get the required practicals explained properly and plenty of six-mark extended-response practice.'], topics: ['Forces & motion', 'Energy & electricity', 'Waves & optics', 'Particles & radiation', 'A-level: fields, mechanics, thermal physics', 'Required practicals & uncertainties'], results: 'Every A-level physics student since 2021 achieved their target grade or better (fictional).' },
  { slug: 'chemistry', name: 'Chemistry', image: 'papers', levels: ['GCSE', 'A-level'], boards: 'AQA · Edexcel · OCR A', headline: 'Moles, mechanisms and the three calculations that come up every single year.', intro: ['Chemistry rewards routine: the same calculation types appear in every paper, and once they\'re automatic the rest of the marks open up. We drill those first.', 'For A-level organic chemistry, mechanisms are drawn step by step until the curly arrows feel obvious rather than memorised.'], topics: ['Atomic structure & bonding', 'Quantitative chemistry (moles)', 'Energetics & rates', 'Organic chemistry & mechanisms', 'A-level: equilibria, acids & bases, transition metals', 'Practical-skills questions'], results: 'Average improvement of 1.8 grades, GCSE to final (fictional).' },
  { slug: 'biology', name: 'Biology', image: 'flatlay', levels: ['GCSE', 'A-level'], boards: 'AQA · Edexcel · OCR A', headline: 'It\'s not a memory test. It\'s a precision-of-language test.', intro: ['Biology students lose marks for saying almost the right thing. We work on mark-scheme vocabulary, structured answers and reading data questions carefully, which turns "I knew that" into marks on the page.', 'Required practicals and the maths skills (percentages, magnification, statistics) get dedicated sessions.'], topics: ['Cells & organisation', 'Infection, response & bioenergetics', 'Inheritance & evolution', 'Ecology', 'A-level: biochemistry, genetics, homeostasis', 'Data analysis & required practicals'], results: '85% of GCSE biology students achieved grade 7+ (fictional).' },
  { slug: 'eleven-plus', name: '11+ & entrance', image: 'kitchen', levels: ['Year 4', 'Year 5', 'Year 6'], boards: 'GL · CEM-style · independent-school papers', headline: 'Calm, confident and well-practised. In that order.', intro: ['Ten-year-olds don\'t need pressure; they need familiarity. Lessons are short-burst practice with lots of talking through strategies, so the paper on the day looks like something they\'ve seen a hundred times.', 'Parents get a short note after every lesson and an honest conversation about fit before any money is spent on preparation.'], topics: ['Maths to Year 6+ level', 'Non-verbal reasoning', 'Verbal reasoning (maths-heavy papers)', 'Timed practice & pacing', 'Interview preparation (entrance)', 'Managing exam nerves'], results: '9 of 11 students received an offer from their first-choice school in 2025 (fictional).' },
];

/** Pricing, pence. In-person is at the home study in Cambridge. */
export const pricing = {
  rows: [
    { level: 'KS3 & 11+', online: 4200, inPerson: 4800 },
    { level: 'GCSE / IGCSE', online: 4500, inPerson: 5200 },
    { level: 'A-level', online: 5500, inPerson: 6200 },
    { level: 'Adult GCSE resit', online: 4500, inPerson: 5200 },
  ],
  packDiscount: 0.1, // 10 lessons paid upfront
  notes: ['Lessons are 60 minutes; 90-minute lessons available for A-level.', 'Packs of 10 lessons save 10% and are valid for one term.', 'Siblings: 10% off the second student.', 'No registration fee, no contract — weekly rolling.'],
};

/** Results & reviews page (fictional). */
export const results = {
  stats: [
    { stat: '2.1', suffix: '', label: 'Average grade improvement, GCSE mock to final' },
    { stat: '94', suffix: '%', label: 'Students hitting their target grade' },
    { stat: '7', suffix: ' yrs', label: 'Tutoring full-time, after six in the classroom' },
    { stat: '74', suffix: '', label: 'Google reviews, 4.9 average' },
  ],
  stories: [
    { student: 'Ben, Year 11', subject: 'GCSE maths', from: '4', to: '7', lessons: 26, note: 'Missing foundations in algebra. Twelve lessons on basics before any exam content; then past papers every week.' },
    { student: 'Maya, Year 13', subject: 'A-level chemistry', from: 'D', to: 'A', lessons: 34, note: 'Online from Norwich. Moles became automatic by Christmas; organic mechanisms by Easter.' },
    { student: 'Aisha, Year 6', subject: '11+ (GL)', from: '—', to: 'Offer', lessons: 18, note: 'Confidence was the problem, not ability. Short, calm sessions; one timed paper a week.' },
    { student: 'Daniel, adult', subject: 'GCSE maths resit', from: '3', to: '5', lessons: 14, note: 'Needed a 4 for nursing. Got a 5 in November, after twelve weeks of evening lessons.' },
  ],
};

/** Resources articles. */
export const resources = [
  { slug: 'how-to-revise-gcse-maths', title: 'How to revise GCSE maths (without rewriting your notes)', summary: 'Rewriting notes feels productive and isn\'t. Here\'s the four-step loop that actually moves grades.', readMins: 5, body: ['Most GCSE maths revision is passive: reading, highlighting, copying out. It feels like work, and it barely moves the needle. Maths is a doing subject, so revision has to be doing too.', 'Step one: pick a topic you got wrong in a mock. Not a topic you like — one you got wrong. Step two: do five questions on it from a past paper or a topic-test site, timed, without looking at your notes. Step three: mark them against the mark scheme, properly, and write down the exact point where each wrong answer went wrong. Step four: do five more. Twenty minutes, one topic, done.', 'Keep a "mistakes page" at the back of your book: a one-line note per error ("forgot to square the negative", "didn\'t convert cm to m"). Read it before every paper. Most students have fewer than ten recurring mistakes, and they cost more marks than any topic they haven\'t learned.', 'Finally, do full papers under time from February. The first one will be grim. That\'s the point — better in February than June.'] },
  { slug: 'online-vs-in-person-tutoring', title: 'Online vs in-person tutoring: an honest comparison', summary: 'I do both. Here\'s who each one suits, and the one piece of kit that makes online work.', readMins: 4, body: ['Parents often assume in-person is better. For some students it is — particularly younger children and anyone who finds screens distracting. But for most students from Year 9 up, online lessons are at least as effective, and they come with real advantages: no travel, easier scheduling, and a written record of everything we did.', 'The thing that makes online work is a shared whiteboard. I can see the student\'s working as they write it, not after, which is where the teaching happens. A cheap tablet with a stylus, or a laptop and a £20 graphics tablet, is enough. A phone screen isn\'t.', 'In-person suits: 11+ students, anyone who struggles to focus at home, and students whose parents want to sit in for the first few lessons. Online suits: A-level students, busy households, anyone outside Cambridge, and students who are self-conscious about getting things wrong in front of someone.', 'If you\'re unsure, we try one of each in the first fortnight and keep whichever works. That\'s something we can decide on the free call.'] },
  { slug: 'eleven-plus-without-the-stress', title: 'Preparing for the 11+ without the stress', summary: 'A calm, realistic timeline for Year 5 parents, and what to leave until later.', readMins: 6, body: ['The 11+ industry sells panic. It\'s a test of maths to a Year 6-plus standard and some reasoning patterns; a bright ten-year-old with steady practice over twelve to eighteen months is well placed, and a frightened one is not.', 'Year 5 autumn: find out exactly which papers your target schools use (GL, CEM-style or their own), and check the dates. Start with 20 minutes of maths three times a week — mental arithmetic, times tables to automaticity, fractions and decimals. No reasoning papers yet.', 'Year 5 spring and summer: introduce reasoning formats slowly, one question type at a time, untimed. The aim is familiarity, not speed. Read widely and talk about words: much verbal reasoning is vocabulary.', 'Year 6 autumn: timed practice once a week, full papers once a fortnight. Review mistakes together, calmly. Stop a week before the exam — nothing learned in the last week helps, and rest does.', 'Finally, the honest bit: if your child is miserable, stop. There are excellent schools that don\'t need an 11+, and a confident child will thrive in any of them.'] },
];

export const yearGroups = ['Year 4–6 (11+)', 'Year 7–9 (KS3)', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Adult learner'];

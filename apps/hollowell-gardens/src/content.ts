/**
 * Long-form content for Hollowell: case studies (gardens) and journal posts.
 * Kept separate from site.config.ts so a client can edit business details without
 * wading through essays. Images refer to keys in src/images.ts.
 */

export interface Garden {
  slug: string;
  title: string;
  place: string;
  year: number;
  size: string;
  brief: string;
  type: 'Country' | 'Town' | 'Courtyard' | 'Walled' | 'Meadow';
  cover: string;
  coverAlt: string;
  gallery: { key: string; alt: string }[];
  before?: { key: string; alt: string };
  after?: { key: string; alt: string };
  story: string[];
  plants: string[];
  services: string[];
  budgetBand: string;
}

export const gardens: Garden[] = [
  {
    slug: 'painswick-farmhouse',
    title: 'A farmhouse garden that borrows the valley',
    place: 'Painswick',
    year: 2024,
    size: '0.6 acre',
    type: 'Country',
    brief: 'Open up the view, lose the lawn, add somewhere to sit at every hour of the day.',
    cover: 'hero',
    coverAlt: 'Perennial borders and a gravel path leading to an oak bench, Cotswold wall behind',
    gallery: [
      { key: 'hero', alt: 'Gravel path through layered perennial planting at golden hour' },
      { key: 'seedheads', alt: 'Phlomis seed heads backlit in autumn' },
      { key: 'build', alt: 'The dry-stone wall being rebuilt during construction' },
    ],
    story: [
      'The house sits high above the Painswick valley, but the old garden turned its back on the view: a hedge, a lawn, a row of leylandii. We took all three out.',
      'A broad gravel path now runs from the kitchen door to a new oak bench at the far corner, where the ground falls away and the whole valley opens up. Either side, long borders of grasses, salvias and alliums are planted to look loose and wild but hold their shape through winter.',
      'The dry-stone wall was rebuilt by a local waller using stone from the site. It took three weeks and is the thing visitors photograph first.',
    ],
    plants: ['Stipa gigantea', 'Salvia nemorosa \'Caradonna\'', 'Allium \'Purple Sensation\'', 'Phlomis russeliana', 'Echinacea pallida', 'Deschampsia cespitosa'],
    services: ['Garden design', 'Planting design', 'Landscaping & build'],
    budgetBand: '£60k – £80k',
  },
  {
    slug: 'cheltenham-terrace',
    title: 'Small, sunny, and finally usable',
    place: 'Cheltenham',
    year: 2025,
    size: '9 × 14 m',
    type: 'Town',
    brief: 'A Victorian terrace garden with a cracked patio and a shed. Make it somewhere to eat outside.',
    cover: 'after',
    coverAlt: 'A terrace garden with sandstone paving, oak sleeper beds and a birch tree',
    gallery: [{ key: 'after', alt: 'The finished terrace garden from the house' }],
    before: { key: 'before', alt: 'The same garden before: patchy lawn, broken slabs and a leaning fence' },
    after: { key: 'after', alt: 'After: sawn sandstone, raised oak beds and a lawn' },
    story: [
      'Nine metres by fourteen doesn\'t sound like much, but it is more than enough for a dining terrace, a lawn the children can use and borders deep enough to feel generous.',
      'The trick was to push the terrace to the sunniest end rather than the house end, so dinner happens in the last of the light. Raised oak sleeper beds give instant height and hide the fences.',
      'A single multi-stem birch does the work of a tree-lined street: dappled shade, movement, and something to look at from the upstairs windows.',
    ],
    plants: ['Betula nigra', 'Geranium \'Rozanne\'', 'Hakonechloa macra', 'Verbena bonariensis', 'Nepeta \'Walker\'s Low\''],
    services: ['Garden design', 'Landscaping & build'],
    budgetBand: '£28k – £35k',
  },
  {
    slug: 'stroud-courtyard',
    title: 'A courtyard that works after dark',
    place: 'Stroud',
    year: 2023,
    size: '6 × 8 m',
    type: 'Courtyard',
    brief: 'North-facing, overlooked, and used mostly in the evening. Make it feel like a room.',
    cover: 'courtyard',
    coverAlt: 'A brick-paved courtyard with corten planters, ferns and string lights at dusk',
    gallery: [{ key: 'courtyard', alt: 'The courtyard at blue hour' }],
    story: [
      'Shade gardens are the most forgiving to plant and the hardest to make feel generous. Here the answer was height: corten planters that bring the ferns up to eye level, and a multi-stem Amelanchier that catches the light the walls don\'t.',
      'Clay pavers laid in a stretcher bond run the length of the space to make it feel longer. Lighting is low and warm and on a timer, so the garden is a view from the kitchen even in January.',
    ],
    plants: ['Amelanchier lamarckii', 'Dryopteris erythrosora', 'Hosta \'Halcyon\'', 'Hydrangea quercifolia', 'Epimedium × versicolor'],
    services: ['Garden design', 'Planting design', 'Landscaping & build'],
    budgetBand: '£18k – £22k',
  },
  {
    slug: 'tetbury-walled-garden',
    title: 'A walled kitchen garden, brought back',
    place: 'Tetbury',
    year: 2022,
    size: '0.3 acre',
    type: 'Walled',
    brief: 'A neglected Victorian walled garden. Grow food, cut flowers, and keep the bones.',
    cover: 'kitchen',
    coverAlt: 'Raised beds with kale and dahlias in a walled garden, greenhouse against the wall',
    gallery: [{ key: 'kitchen', alt: 'The kitchen garden in early autumn' }, { key: 'planting', alt: 'Planting out in spring' }],
    story: [
      'The walls were sound, the soil was tired and the paths had gone. We kept the original cruciform layout, rebuilt the paths in self-binding gravel and replaced the beds with oak-edged raised beds the owners can work without bending.',
      'Half the garden grows vegetables, half grows cut flowers for the house — dahlias, sweet peas, cosmos — with a lean-to greenhouse restored against the south wall.',
    ],
    plants: ['Dahlia \'Café au Lait\'', 'Sweet pea \'Matucana\'', 'Cavolo nero', 'Espalier pears', 'Lavandula × intermedia'],
    services: ['Garden design', 'Planting design'],
    budgetBand: '£40k – £50k',
  },
  {
    slug: 'minchinhampton-meadow',
    title: 'Three acres, mown once a year',
    place: 'Minchinhampton',
    year: 2021,
    size: '3 acres',
    type: 'Meadow',
    brief: 'Too much lawn, too much mowing. Turn it into a meadow with a route through it.',
    cover: 'meadow',
    coverAlt: 'A wildflower meadow with a mown path towards an orchard and a timber studio',
    gallery: [{ key: 'meadow', alt: 'The meadow in late summer' }],
    story: [
      'Converting lawn to meadow is slow and unglamorous — strip the fertility, sow yellow rattle, wait. Four years on it is the garden the owners talk about most.',
      'Mown paths change route each year. A small orchard of local apple varieties and a timber studio give the walk somewhere to go.',
    ],
    plants: ['Yellow rattle', 'Oxeye daisy', 'Knapweed', 'Wild carrot', 'Malus \'Ashmead\'s Kernel\''],
    services: ['Garden design', 'Planting design'],
    budgetBand: '£15k – £20k (phased)'
  },
  {
    slug: 'cirencester-pool-garden',
    title: 'Water, stone and clipped green',
    place: 'Cirencester',
    year: 2024,
    size: '0.4 acre',
    type: 'Country',
    brief: 'A formal garden for a restored farmhouse — calm, symmetrical, but softened by planting.',
    cover: 'pool',
    coverAlt: 'A long reflecting pool between limestone paving and clipped yew, farmhouse behind',
    gallery: [{ key: 'pool', alt: 'The reflecting pool from the terrace steps' }],
    story: [
      'The owners wanted calm. A long, narrow reflecting pool gives the terrace a centre line, yew cubes give it rhythm, and the loose perennial planting either side keeps it from feeling austere.',
      'Limestone paving from a quarry fifteen miles away matches the house. The pool is a shallow, black-lined rill — safe, simple and startlingly effective at dusk.',
    ],
    plants: ['Taxus baccata', 'Perovskia \'Blue Spire\'', 'Stachys byzantina', 'Allium sphaerocephalon', 'Miscanthus \'Morning Light\''],
    services: ['Garden design', 'Landscaping & build'],
    budgetBand: '£90k – £120k',
  },
];

export interface Post {
  slug: string;
  title: string;
  date: string;
  standfirst: string;
  cover: string;
  coverAlt: string;
  body: string[];
  readMins: number;
}

export const posts: Post[] = [
  {
    slug: 'when-to-start-a-garden-design',
    title: 'If you want a garden for next summer, start now',
    date: '2026-09-18',
    standfirst: 'The design takes a season. The build takes a season. The planting needs a season to settle. Here is the honest calendar.',
    cover: 'plan',
    coverAlt: 'A hand-drawn garden plan on tracing paper with pencils and tea',
    readMins: 4,
    body: [
      'Every spring the studio phone rings with the same request: "We\'d like the garden done for the summer." And every spring I have to explain that the best gardens are commissioned in autumn.',
      'A full design — survey, concept, master plan, construction drawings, planting plan — takes eight to twelve weeks if decisions are made promptly. Good landscape contractors are booked three to six months ahead, and the best time to build is late autumn to early spring, when the ground is workable and the plants are dormant.',
      'Plant in March or October and the borders will look generous by June. Plant in June and they will look like a nursery delivery until the following year.',
      'So: consultation in September, design over the autumn, build from January, planting in March, garden by June. It is not fast. It is right.',
    ],
  },
  {
    slug: 'planting-for-cotswold-soil',
    title: 'Planting for Cotswold brash: what actually thrives',
    date: '2026-06-02',
    standfirst: 'Thin, free-draining, alkaline. The limestone soil of the Cotswolds is not a problem to solve but a palette to use.',
    cover: 'seedheads',
    coverAlt: 'Seed heads and grasses backlit by low sun',
    readMins: 5,
    body: [
      'New clients often arrive apologising for their soil. "It\'s awful — full of stone, dries out in a week." They have been trying to grow hydrangeas and hostas in it, and losing.',
      'Cotswold brash is a gift if you plant for it. Mediterranean and steppe plants — salvias, nepeta, lavender, perovskia, stipa, euphorbia — want exactly this: sharp drainage, lime, and sun. They need less water, no staking and almost no feeding.',
      'Where the garden is shaded or damp, we improve the soil with compost and choose woodland plants instead. But in open sun, the answer is nearly always to stop fighting the stone.',
      'A short list of plants I return to again and again on the brash: Salvia \'Caradonna\', Stipa gigantea, Phlomis russeliana, Allium sphaerocephalon, Eryngium bourgatii, Cistus × purpureus, Verbena bonariensis.',
    ],
  },
  {
    slug: 'what-a-garden-costs',
    title: 'What a garden costs, honestly',
    date: '2026-03-11',
    standfirst: 'Design fees, build budgets, and the one line item everyone forgets. Numbers from real projects, rounded.',
    cover: 'build',
    coverAlt: 'Landscapers laying paving and building a dry-stone wall',
    readMins: 6,
    body: [
      'I would rather talk about money at the first meeting than the last. So here is what the gardens on this site cost, in bands.',
      'A courtyard or small town garden, fully rebuilt: £18,000–£35,000. A medium town garden with a terrace, lawn and planted borders: £30,000–£60,000. A country garden with stone walls, levels and water: £60,000–£150,000. Planting-only projects for existing gardens: £4,000–£15,000 including plants.',
      'Design and project management runs at 8–12% of the build. The line item everyone forgets is soil: good topsoil and compost for new beds can be £2,000–£6,000 on a larger garden, and skimping on it undoes everything else.',
      'If the numbers are more than you expected, a consultation (£295) is the cheapest way to find out which changes would make the most difference.',
    ],
  },
];

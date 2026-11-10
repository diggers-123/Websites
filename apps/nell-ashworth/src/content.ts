/** Galleries and journal for Nell Ashworth. Image keys refer to src/images.ts. */
export interface Frame { key: string; alt: string; w: 'wide' | 'tall' | 'square'; caption?: string }

export const frames: Frame[] = [
  { key: 'confetti', alt: 'A couple laughing through confetti on a cobbled Edinburgh close', w: 'wide', caption: 'Old Town, June' },
  { key: 'father', alt: 'A father seeing his daughter in her dress for the first time', w: 'tall', caption: 'The first look' },
  { key: 'ceilidh', alt: 'A kilt mid-swing at a barn ceilidh', w: 'wide', caption: 'Strip the Willow' },
  { key: 'rings', alt: 'Two brides laughing while exchanging rings', w: 'square', caption: 'Leith registry' },
  { key: 'hillside', alt: 'A wedding party crossing a misty hillside above Edinburgh', w: 'wide', caption: 'Holyrood, October' },
  { key: 'buttons', alt: 'A grandmother fastening the back of a wedding dress', w: 'tall', caption: 'Forty buttons' },
  { key: 'speeches', alt: 'Speeches by candlelight, the couple crying with laughter', w: 'wide', caption: 'Best man, 23:40' },
  { key: 'beach', alt: 'Children running on Portobello beach, parents and dog behind', w: 'wide', caption: 'Portobello, February' },
  { key: 'reading', alt: 'A mother and toddler reading by a Georgian window', w: 'tall', caption: 'New Town flat' },
  { key: 'newborn', alt: 'A newborn asleep on a sleeping father, a sibling climbing in', w: 'wide', caption: 'Day nine' },
  { key: 'bench', alt: 'An elderly couple laughing on a park bench in winter', w: 'tall', caption: 'Fifty years' },
];

export const weddingFrames = frames.filter((f) => ['confetti', 'father', 'ceilidh', 'rings', 'hillside', 'buttons', 'speeches'].includes(f.key));
export const familyFrames = frames.filter((f) => ['beach', 'reading', 'newborn', 'bench'].includes(f.key));

export interface Post { slug: string; title: string; date: string; standfirst: string; cover: string; coverAlt: string; body: string[]; readMins: number }
export const posts: Post[] = [
  {
    slug: 'why-i-dont-do-a-shot-list', title: 'Why I don\'t do a shot list', date: '2026-08-04', readMins: 4, cover: 'speeches', coverAlt: 'Speeches by candlelight',
    standfirst: 'The best photograph of your wedding will be of something you didn\'t plan. That is the whole argument.',
    body: [
      'Couples sometimes send a list. Cake cutting, first dance, rings on the invitation, the shoes. I understand the instinct: a list feels like insurance.',
      'But the photographs people actually frame — twenty weddings a year for ten years, I have a decent sample — are almost never on the list. They are the father in the window before the ceremony. The grandmother doing up the buttons. The best man forgetting the second page.',
      'A shot list makes me look at the list. Not having one makes me look at the room. I promise I will photograph the cake.',
    ],
  },
  {
    slug: 'a-wedding-in-the-rain', title: 'A wedding in the rain, and why it was better', date: '2026-03-12', readMins: 3, cover: 'hillside', coverAlt: 'A wedding party on a misty hillside',
    standfirst: 'October, Holyrood, horizontal rain. Nobody was supposed to go up the hill. Everyone went up the hill.',
    body: [
      'The forecast was wrong in the right direction: it rained harder than promised. The plan — photographs in the park — was quietly abandoned at 2pm.',
      'At 4pm the bride said "sod it" and the whole party walked up Salisbury Crags in coats over their dresses and kilts. The light under the cloud was silver. The photographs are the ones on the front of this site.',
      'Sun flattens faces and makes people squint. Rain makes people huddle, laugh and look at each other. Bring a coat.',
    ],
  },
];

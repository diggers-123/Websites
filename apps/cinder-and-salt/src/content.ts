/** Event types, menu and gallery for Cinder & Salt. Images refer to keys in src/images.ts. */

export interface EventType {
  slug: string;
  name: string;
  strap: string;
  cover: string;
  coverAlt: string;
  intro: string[];
  typical: { guests: string; service: string; spend: string };
  tips: string[];
}

export const events: EventType[] = [
  {
    slug: 'weddings',
    name: 'Weddings',
    strap: 'Feed everyone at once, outdoors, without a sit-down.',
    cover: 'wedding',
    coverAlt: 'Wedding guests queuing at the pizza trailer under festoon lights at night',
    intro: [
      'Pizza at a wedding works because it is relaxed. No courses, no seating plan, no cold starter waiting on a table. Guests come to the oven when they are hungry, eat with their hands, and keep talking.',
      'We do the main meal (the Feast, usually 5–7pm), the evening snack (from 9pm, when the band is on), or both. For barn venues and marquees we arrive early, set up out of sight and light the fire two hours before service so there is no waiting.',
    ],
    typical: { guests: '80–200', service: 'Feast 2h + Evening Feast', spend: '£2,400–£6,000' },
    tips: ['Tell your venue it is a wood-fired oven, not a gas one — most love it, some need a form.', 'Order the Evening Feast for 60–70% of day guests; not everyone eats twice.', 'A pizza-cutting instead of cake-cutting is a thing. We have a very large knife.'],
  },
  {
    slug: 'private-parties',
    name: 'Private parties',
    strap: 'Birthdays, anniversaries, the big garden party you keep putting off.',
    cover: 'table',
    coverAlt: 'A long table covered in pizzas, salads and drinks at an outdoor party',
    intro: [
      'From 30 people in a back garden to 150 in a field, the shape is the same: we park up, light the fire, and serve for two hours while you do the hosting.',
      'Weekday and Sunday parties have a lower minimum spend, which makes a smaller gathering very good value.',
    ],
    typical: { guests: '30–120', service: 'Feast 2h', spend: '£750–£2,500' },
    tips: ['A 6 × 4 m firm patch of ground is all we need — a driveway is perfect.', 'Kids\' pizzas (margherita, half size) are included in the count at half price.', 'Hire some trestle tables; people eat more sitting down.'],
  },
  {
    slug: 'corporate',
    name: 'Corporate & team events',
    strap: 'Summer parties, launches, long-service lunches — invoiced, insured, on time.',
    cover: 'corporate',
    coverAlt: 'Guests in smart-casual clothes chatting with pizza at a country-house lawn party',
    intro: [
      'Companies book us because the logistics are easy: one supplier, one invoice, certificates on file, and a team that has fed 250 people out of a car park without fuss.',
      'We cater office car parks, research-park lawns, agricultural shows and, memorably, a boatyard. Dietary requirements are collected in advance and labelled on the day.',
    ],
    typical: { guests: '50–250', service: 'Feast 2h, lunch or evening', spend: '£1,200–£7,000' },
    tips: ['We can invoice on 30-day terms for established businesses.', 'A grazing table before service takes the edge off the queue.', 'Branded pizza boxes are possible with four weeks\' notice.'],
  },
  {
    slug: 'festivals',
    name: 'Festivals & markets',
    strap: 'Pay-on-the-day trading at festivals, fairs and village events.',
    cover: 'festival',
    coverAlt: 'A queue forming at the pizza trailer at a small festival at blue hour',
    intro: [
      'For public events we trade directly rather than per head — you provide the pitch, we bring the oven, the queue looks after itself. We take card and cash and can agree a pitch fee or a percentage.',
      'We do a handful of festivals a year and prioritise ones in Norfolk and Suffolk we can get to and from in a day.',
    ],
    typical: { guests: '300–2,000 footfall', service: 'Trading 6–10 hours', spend: 'Pitch fee or % of sales' },
    tips: ['Send the event date, expected footfall and other food traders.', 'We need a 7 × 5 m pitch with vehicle access; no power required.', 'Book early — summer weekends go by February.'],
  },
];

export interface MenuItem { name: string; desc: string; tags?: ('v' | 've' | 'gf')[]; note?: string }
export interface MenuSection { title: string; items: MenuItem[]; footnote?: string }

export const menu: MenuSection[] = [
  {
    title: 'The pizzas',
    footnote: 'Choose five for your event. 48-hour sourdough, San Marzano tomatoes, fior di latte. Every pizza available on a gluten-free base.',
    items: [
      { name: 'Margherita', desc: 'Tomato, fior di latte, basil, olive oil', tags: ['v'] },
      { name: 'Nduja & honey', desc: 'Spicy Calabrian sausage, hot honey, fior di latte', note: 'the famous one' },
      { name: 'Fennel sausage', desc: 'Norfolk pork & fennel sausage, red onion, pecorino' },
      { name: 'Mushroom & thyme', desc: 'White base, roasted chestnut mushrooms, taleggio, thyme', tags: ['v'] },
      { name: 'Norfolk ham & pineapple', desc: 'Yes, really. Fire-roasted pineapple, dry-cured ham, chilli' },
      { name: 'Courgette & mint', desc: 'White base, shaved courgette, ricotta, mint, lemon', tags: ['v'] },
      { name: 'Smoked aubergine', desc: 'Tomato, fire-smoked aubergine, capers, vegan mozzarella', tags: ['ve'] },
      { name: 'Four cheese', desc: 'Fior di latte, taleggio, gorgonzola, pecorino, black pepper', tags: ['v'] },
      { name: 'Pepperoni', desc: 'Cupping pepperoni, tomato, fior di latte, oregano' },
      { name: 'Garden', desc: 'Tomato, peppers, red onion, olives, rocket, vegan mozzarella', tags: ['ve'] },
    ],
  },
  {
    title: 'Sides',
    footnote: 'Included in Feast + Sides and The Full Works. Served to tables in big bowls.',
    items: [
      { name: 'Rocket & parmesan', desc: 'Lemon, olive oil, a lot of parmesan', tags: ['v', 'gf'] },
      { name: 'Fennel slaw', desc: 'Fennel, cabbage, apple, yoghurt dressing', tags: ['v', 'gf'] },
      { name: 'Garlic & rosemary flatbread', desc: 'Torn, from the oven, in baskets', tags: ['ve'] },
      { name: 'Marinated olives', desc: 'Nocellara, orange peel, chilli', tags: ['ve', 'gf'] },
    ],
  },
  {
    title: 'Desserts',
    footnote: 'The Full Works only. Cooked in the same fire once the savoury service is done.',
    items: [
      { name: 'Chocolate calzone', desc: 'Dark chocolate, mascarpone, icing sugar — torn and shared', tags: ['v'], note: 'ask for the vegan version' },
      { name: 'Fire-baked peaches', desc: 'Honey, thyme, mascarpone, toasted hazelnuts', tags: ['v', 'gf'] },
    ],
  },
];

export const gallery: { key: string; alt: string; wide?: boolean }[] = [
  { key: 'hero', alt: 'Jack sliding a pizza into the oven at a dusk wedding', wide: true },
  { key: 'pizza', alt: 'Nduja and honey pizza with a leopard-spotted crust' },
  { key: 'dough', alt: 'Stretching sourdough by hand' },
  { key: 'wedding', alt: 'The queue at a barn wedding under festoon lights', wide: true },
  { key: 'fire', alt: 'Oak logs burning in the oven' },
  { key: 'table', alt: 'A table full of pizzas at a garden party' },
  { key: 'corporate', alt: 'A summer party on a country-house lawn' },
  { key: 'dessert', alt: 'Chocolate calzone torn open' },
  { key: 'festival', alt: 'Trading at a village festival at blue hour' },
];

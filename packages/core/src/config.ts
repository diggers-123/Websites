/**
 * Shared site configuration types.
 *
 * Every website in this portfolio has a single `src/site.config.ts` that satisfies
 * `SiteConfig`. Changing a business = editing that one file (plus images and the
 * theme tokens in `src/styles/theme.css`). Components never hard-code business data.
 */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const DAY_KEYS: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const DAY_LABELS: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

/** "09:00"-"17:30" style range; `null` = closed. */
export type OpeningHours = Record<DayKey, { open: string; close: string } | null>;

export interface Address {
  line1: string;
  line2?: string;
  town: string;
  county?: string;
  postcode: string;
  country?: string; // defaults to "GB"
  /** For LocalBusiness schema and map links. */
  lat?: number;
  lng?: number;
  /** Optional Google Maps embed URL. Leave undefined to render a static map link instead. */
  mapEmbedUrl?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  x?: string;
  linkedin?: string;
  youtube?: string;
  google?: string; // Google Business Profile / reviews link
  checkatrade?: string;
  trustpilot?: string;
}

export interface Service {
  slug: string;
  name: string;
  /** Short line used in lists/cards. */
  summary: string;
  /** Longer copy for the service page (plain text or simple HTML-safe paragraphs). */
  description?: string[];
  /** Display price e.g. "£28", "From £450", "POA". */
  price?: string;
  /** Numeric price in pence where a calculator needs it. */
  pricePence?: number;
  /** Duration in minutes where bookable. */
  durationMins?: number;
  /** Bullet benefits / what's included. */
  includes?: string[];
  /** Image path (relative to /src/assets or /public) and alt. */
  image?: { src: string; alt: string };
  /** Marks a service as bookable through the booking wizard. */
  bookable?: boolean;
  /** Free-form category used for grouping on the services page. */
  category?: string;
  /** Frequently asked questions specific to the service. */
  faqs?: FAQ[];
}

export interface FAQ {
  q: string;
  a: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Headingley", "Wedding, June 2025". */
  context?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  source?: 'google' | 'facebook' | 'checkatrade' | 'trustpilot' | 'direct';
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: { src: string; alt: string };
  /** Used by booking wizards that let the customer choose a staff member. */
  bookable?: boolean;
  /** Per-member working hours override. */
  hours?: Partial<OpeningHours>;
}

export interface CTA {
  label: string;
  href: string;
  /** Optional analytics id or aria-label override. */
  id?: string;
}

/**
 * Forms: the sites never pretend to send. Pick a provider and the form posts there.
 * - "demo":     validates and shows a success state locally, labelled as a demo.
 * - "netlify":  adds data-netlify attributes; works when deployed to Netlify.
 * - "formspree": posts to `endpoint` (https://formspree.io/f/xxxx).
 * - "custom":   posts JSON to `endpoint` (your own API / serverless function).
 */
export interface FormsConfig {
  provider: 'demo' | 'netlify' | 'formspree' | 'custom';
  endpoint?: string;
  /** Honeypot field name. */
  honeypot?: string;
  /** Where notification emails go — documentation only; providers configure this themselves. */
  notifyEmail?: string;
}

/**
 * Booking: which experience the Book page renders.
 * - "demo":    the custom wizard with deterministic demo availability (clearly labelled).
 * - "calcom":  Cal.com inline embed. Requires `calcomLink` e.g. "kingpin/haircut".
 * - "calendly": Calendly inline embed. Requires `calendlyUrl`.
 * - "custom":  the custom wizard posts to `endpoint` (your own availability + booking API).
 */
export interface BookingConfig {
  provider: 'demo' | 'calcom' | 'calendly' | 'custom';
  calcomLink?: string;
  /** Optional per-service / per-staff Cal.com links, keyed by slug. */
  calcomLinks?: Record<string, string>;
  calendlyUrl?: string;
  endpoint?: string;
  /** Slot interval in minutes for the custom wizard. */
  slotIntervalMins?: number;
  /** How many days ahead customers may book. */
  horizonDays?: number;
  /** Minimum notice in hours. */
  minNoticeHours?: number;
  /** Dates (YYYY-MM-DD) that are fully unavailable (holidays, already booked). */
  closedDates?: string[];
  /** Human-readable cancellation / rescheduling policy. */
  policy?: string;
}

export interface SEOConfig {
  /** Canonical production origin, no trailing slash. */
  siteUrl: string;
  /** Appended to page titles: "Page · Business". */
  titleTemplate?: string;
  defaultDescription: string;
  /** Path to the default social image in /public. */
  ogImage: string;
  /** schema.org type, e.g. "HairSalon", "Electrician", "LocalBusiness". */
  schemaType: string;
  /** Extra same-as URLs for the Organization schema. */
  sameAs?: string[];
  /** Local search phrases used naturally in copy; documentation + alt text helper. */
  keywords?: string[];
  /** Price range for LocalBusiness schema, e.g. "££". */
  priceRange?: string;
}

export interface LegalConfig {
  /** Legal entity / trading name as it should appear in policies. */
  legalName: string;
  /** Sole trader / Ltd + company number where applicable. */
  entityType: 'sole-trader' | 'partnership' | 'limited-company';
  companyNumber?: string;
  vatNumber?: string;
  /** ICO registration reference if the business is registered. */
  icoReference?: string;
  /** Date policies were last reviewed. */
  policiesReviewed: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SiteConfig {
  /** Short machine slug — matches the app folder. */
  slug: string;
  name: string;
  /** Short strapline used in header/footer/meta. */
  tagline: string;
  /** Marks the dataset as fictional demo content. Set to false for a real client. */
  isFictional: boolean;
  owner?: { name: string; title?: string };
  phone: string;
  /** tel: href form, e.g. "+441132345678". */
  phoneHref: string;
  email: string;
  address: Address;
  /** Towns / areas the business serves, for copy and the Areas page. */
  serviceAreas: string[];
  /** Postcode prefixes accepted by postcode checkers, e.g. ["LS", "BD"]. */
  postcodePrefixes?: string[];
  hours: OpeningHours;
  social: SocialLinks;
  nav: NavItem[];
  footerNav?: NavItem[];
  primaryCta: CTA;
  secondaryCta?: CTA;
  services: Service[];
  team?: TeamMember[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  forms: FormsConfig;
  booking: BookingConfig;
  seo: SEOConfig;
  legal: LegalConfig;
  /** Fictional credentials must be labelled; real ones go here too. */
  credentials?: { label: string; detail?: string; fictional?: boolean }[];
  /** Founded year for copy and schema. */
  founded?: number;
}

/** Helper to make partial-override hours easy to write. */
export function hours(
  spec: Partial<Record<DayKey, [string, string] | null>>,
  fallback: [string, string] | null = null,
): OpeningHours {
  const out = {} as OpeningHours;
  for (const d of DAY_KEYS) {
    const v = d in spec ? spec[d] : fallback;
    out[d] = v ? { open: v[0], close: v[1] } : null;
  }
  return out;
}

/** Type-safe identity so configs get autocomplete and errors. */
export function defineSite(config: SiteConfig): SiteConfig {
  return config;
}

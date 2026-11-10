/**
 * SEO + structured data helpers. Framework-free so they work in any Astro layout.
 */
import type { SiteConfig, Service, FAQ, DayKey } from '../config';
import { DAY_KEYS } from '../config';

const SCHEMA_DAYS: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};

export function pageTitle(site: SiteConfig, title?: string): string {
  if (!title) return `${site.name} · ${site.tagline}`;
  const tpl = site.seo.titleTemplate ?? `%s · ${site.name}`;
  return tpl.replace('%s', title);
}

export function canonical(site: SiteConfig, pathname: string): string {
  const path = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  return `${site.seo.siteUrl}${path}`;
}

export function openingHoursSpecification(site: SiteConfig) {
  return DAY_KEYS.filter((d) => site.hours[d]).map((d) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: SCHEMA_DAYS[d],
    opens: site.hours[d]!.open,
    closes: site.hours[d]!.close,
  }));
}

export function localBusinessSchema(site: SiteConfig) {
  const sameAs = [
    ...Object.values(site.social).filter((v): v is string => typeof v === 'string' && v.length > 0),
    ...(site.seo.sameAs ?? []),
  ];
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': site.seo.schemaType,
    '@id': `${site.seo.siteUrl}/#business`,
    name: site.name,
    description: site.seo.defaultDescription,
    url: site.seo.siteUrl,
    telephone: site.phoneHref,
    email: site.email,
    image: `${site.seo.siteUrl}${site.seo.ogImage}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [site.address.line1, site.address.line2].filter(Boolean).join(', '),
      addressLocality: site.address.town,
      addressRegion: site.address.county,
      postalCode: site.address.postcode,
      addressCountry: site.address.country ?? 'GB',
    },
    openingHoursSpecification: openingHoursSpecification(site),
    areaServed: site.serviceAreas.map((a) => ({ '@type': 'Place', name: a })),
  };
  if (site.address.lat && site.address.lng) {
    schema.geo = { '@type': 'GeoCoordinates', latitude: site.address.lat, longitude: site.address.lng };
  }
  if (site.seo.priceRange) schema.priceRange = site.seo.priceRange;
  if (sameAs.length) schema.sameAs = sameAs;
  if (site.founded) schema.foundingDate = String(site.founded);
  return schema;
}

export function serviceSchema(site: SiteConfig, service: Service, url: string) {
  const s: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.summary,
    url,
    provider: { '@id': `${site.seo.siteUrl}/#business` },
    areaServed: site.serviceAreas.map((a) => ({ '@type': 'Place', name: a })),
  };
  if (service.pricePence != null) {
    s.offers = {
      '@type': 'Offer',
      price: (service.pricePence / 100).toFixed(2),
      priceCurrency: 'GBP',
    };
  }
  return s;
}

export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Safely serialise JSON-LD for inline <script> (escape closing tags). */
export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

/** Human-friendly opening hours lines, merging identical consecutive days. */
export function hoursLines(site: SiteConfig): { days: string; time: string }[] {
  const names: Record<DayKey, string> = {
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
  };
  const fmt = (d: DayKey) => {
    const h = site.hours[d];
    return h ? `${h.open} – ${h.close}` : 'Closed';
  };
  const out: { days: string; time: string }[] = [];
  let i = 0;
  while (i < DAY_KEYS.length) {
    let j = i;
    while (j + 1 < DAY_KEYS.length && fmt(DAY_KEYS[j + 1]) === fmt(DAY_KEYS[i])) j++;
    const days = i === j ? names[DAY_KEYS[i]] : `${names[DAY_KEYS[i]]} – ${names[DAY_KEYS[j]]}`;
    out.push({ days, time: fmt(DAY_KEYS[i]) });
    i = j + 1;
  }
  return out;
}

/** Is the business open right now? Returns a status line for header "Open now · closes 18:00". */
export function openStatus(site: SiteConfig, now = new Date()): { open: boolean; label: string } {
  const key = (['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as DayKey[])[now.getDay()];
  const h = site.hours[key];
  if (!h) return { open: false, label: 'Closed today' };
  const mins = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = h.open.split(':').map(Number);
  const [ch, cm] = h.close.split(':').map(Number);
  const o = oh * 60 + om;
  const c = ch * 60 + cm;
  if (mins < o) return { open: false, label: `Opens ${h.open}` };
  if (mins >= c) return { open: false, label: 'Closed now' };
  return { open: true, label: `Open now · closes ${h.close}` };
}

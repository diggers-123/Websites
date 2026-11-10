/**
 * Custom flat-vector dog illustrations, one per size band — as SVG strings so they can be
 * rendered by Astro (`set:html`) and by the Preact booking island alike.
 * Side-on, simple shapes, cocoa outline. The tail group has class "wag" for animation.
 */
const stroke = '#4a2b1e';
const open = `<svg viewBox="0 0 240 200" fill="none" stroke="${stroke}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true" class="w-full h-auto">`;

const bodies: Record<string, string> = {
  xs: `<g transform="translate(40 60) scale(0.7)">
      <g class="wag"><path d="M172 92 c14 -10 24 -28 20 -46"/></g>
      <ellipse cx="120" cy="110" rx="52" ry="36" fill="#fff5e1"/>
      <path d="M86 140 l-4 36 M110 144 l0 32 M132 144 l0 32 M156 140 l4 36"/>
      <circle cx="62" cy="86" r="30" fill="#fff5e1"/>
      <path d="M44 62 l-14 -40 l30 22z M80 62 l14 -40 l-30 22z" fill="#ff6b57"/>
      <circle cx="52" cy="84" r="4" fill="${stroke}" stroke="none"/><circle cx="36" cy="94" r="6" fill="${stroke}" stroke="none"/>
      <path d="M40 102 q6 6 14 2"/></g>`,
  s: `<g transform="translate(20 40) scale(0.82)">
      <g class="wag"><path d="M188 96 c16 -6 26 -20 24 -40"/></g>
      <rect x="60" y="76" width="130" height="70" rx="35" fill="#f2b544"/>
      <path d="M84 146 l-6 40 M118 148 l0 38 M146 148 l0 38 M176 146 l6 40"/>
      <ellipse cx="56" cy="76" rx="36" ry="30" fill="#f2b544"/>
      <path d="M26 66 c-14 10 -20 34 -8 50 c10 -4 16 -20 14 -40z" fill="#4a2b1e"/>
      <circle cx="46" cy="70" r="4" fill="${stroke}" stroke="none"/><circle cx="24" cy="80" r="7" fill="${stroke}" stroke="none"/>
      <path d="M30 92 q8 6 16 0"/><path d="M100 110 q10 -8 20 0" stroke="#fff5e1"/></g>`,
  m: `<g transform="translate(10 30) scale(0.9)">
      <g class="wag"><path d="M200 92 c18 -8 30 -26 26 -50 c-10 10 -18 14 -30 16" fill="#fff5e1"/></g>
      <path d="M54 92 c0 -24 20 -40 50 -40 l70 0 c26 0 40 16 40 40 l0 20 c0 24 -14 38 -40 38 l-70 0 c-30 0 -50 -16 -50 -38z" fill="#4a2b1e"/>
      <path d="M84 150 l-4 44 M116 152 l0 42 M150 152 l0 42 M184 150 l6 44"/>
      <path d="M26 60 c0 -28 22 -46 48 -40 c20 4 30 20 30 40 l0 14 c0 18 -14 30 -32 30 c-24 0 -46 -14 -46 -44z" fill="#4a2b1e"/>
      <path d="M40 28 c-16 4 -26 20 -22 40 c12 -6 20 -22 22 -40z" fill="#fff5e1"/>
      <path d="M38 70 l-4 48 c12 8 28 10 40 0 l-4 -40" fill="#fff5e1"/>
      <circle cx="58" cy="60" r="4" fill="${stroke}" stroke="none"/><circle cx="34" cy="76" r="8" fill="${stroke}" stroke="none"/>
      <path d="M44 92 q8 8 18 0"/></g>`,
  l: `<g transform="translate(0 22) scale(0.98)">
      <g class="wag"><path d="M206 86 c20 -10 34 -30 30 -56 c-12 8 -20 14 -34 20" fill="#f2b544"/></g>
      <path d="M50 84 c0 -28 22 -46 56 -46 l64 0 c30 0 46 18 46 46 l0 30 c0 26 -18 40 -46 40 l-64 0 c-34 0 -56 -16 -56 -40z" fill="#f2b544"/>
      <path d="M80 154 l-6 44 M118 156 l0 42 M156 156 l0 42 M196 154 l6 44"/>
      <path d="M18 56 c0 -30 24 -48 52 -44 c24 4 36 22 36 46 l0 12 c0 22 -16 36 -38 36 c-28 0 -50 -18 -50 -50z" fill="#f2b544"/>
      <path d="M30 40 c-10 12 -12 34 -2 50 c12 -4 18 -22 14 -42z" fill="#e3a330"/>
      <circle cx="56" cy="58" r="4" fill="${stroke}" stroke="none"/><circle cx="30" cy="74" r="8" fill="${stroke}" stroke="none"/>
      <path d="M40 92 q10 10 22 0"/><path d="M44 98 l0 16 c6 6 14 4 18 -2" fill="#ff6b57"/></g>`,
  xl: `<g transform="translate(-4 8)">
      <g class="wag"><path d="M214 84 c22 -8 38 -32 34 -62 c-14 10 -24 16 -40 24" fill="#4a2b1e"/></g>
      <path d="M44 86 c0 -34 26 -54 62 -54 l72 0 c34 0 52 22 52 54 l0 36 c0 30 -20 46 -52 46 l-72 0 c-38 0 -62 -18 -62 -46z" fill="#4a2b1e"/>
      <path d="M78 168 l-8 32 M120 170 l0 30 M164 170 l0 30 M208 168 l8 32"/>
      <path d="M8 58 c0 -34 28 -54 58 -50 c28 4 42 26 42 54 l0 14 c0 26 -18 42 -44 42 c-32 0 -56 -22 -56 -60z" fill="#4a2b1e"/>
      <path d="M22 36 c-12 14 -14 40 -2 58 c14 -6 20 -26 16 -50z" fill="#1e5f6b"/>
      <path d="M26 72 l-6 46 c14 10 34 12 46 0 l-4 -38" fill="#fff5e1"/>
      <circle cx="54" cy="58" r="5" fill="${stroke}" stroke="none"/><circle cx="24" cy="78" r="9" fill="${stroke}" stroke="none"/>
      <path d="M36 98 q12 10 26 0"/><path d="M44 104 l0 14 c8 6 16 4 20 -2" fill="#ff6b57"/></g>`,
};

export type DogSize = keyof typeof bodies;
export function dogSvg(size: DogSize): string {
  return `${open}${bodies[size]}</svg>`;
}
export const dogSvgs: Record<string, string> = Object.fromEntries(Object.keys(bodies).map((k) => [k, dogSvg(k as DogSize)]));

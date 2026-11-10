/** Tiny IntersectionObserver reveal. Import once per page from a layout <script>. */
export function initReveal(root: ParentNode = document) {
  document.documentElement.classList.add('js');
  const els = root.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!els.length) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  els.forEach((el) => io.observe(el));
}

/** Accessible disclosure for mobile nav: toggles aria-expanded + a class, traps Escape. */
export function initMobileNav(opts: { button: string; panel: string; openClass?: string }) {
  const btn = document.querySelector<HTMLButtonElement>(opts.button);
  const panel = document.querySelector<HTMLElement>(opts.panel);
  if (!btn || !panel) return;
  const openClass = opts.openClass ?? 'is-open';
  const setOpen = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle(openClass, open);
    panel.hidden = !open;
    document.documentElement.classList.toggle('nav-open', open);
    if (open) {
      panel.querySelector<HTMLElement>('a, button')?.focus();
    }
  };
  panel.hidden = true;
  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });
  // Close when resizing to desktop
  const mq = matchMedia('(min-width: 64rem)');
  mq.addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

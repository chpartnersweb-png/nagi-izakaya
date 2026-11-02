import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const header = document.querySelector<HTMLElement>('[data-header]');
const hero = document.querySelector<HTMLElement>('[data-hero]');
const mobileMenu = document.querySelector<HTMLDetailsElement>('[data-mobile-menu]');
const mobileSummary = mobileMenu?.querySelector<HTMLElement>('summary');

// The native details element remains usable even without JavaScript.
function closeMenu(restoreFocus = false) {
  if (!mobileMenu?.open) return;
  mobileMenu.open = false;
  if (restoreFocus) mobileSummary?.focus();
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu(true);
});

document.addEventListener('click', (event) => {
  if (event.target instanceof Node && mobileMenu?.open && !mobileMenu.contains(event.target)) {
    closeMenu();
  }
});

if (hero && header) {
  const headerObserver = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-scrolled', !entry.isIntersecting);
  }, { rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: 0 });
  headerObserver.observe(hero);
  header.classList.add('is-ready');
}

const desktopWidth = window.matchMedia('(min-width: 768px)');
desktopWidth.addEventListener('change', (event) => {
  if (event.matches) closeMenu();
});

let smoothScroll: Lenis | undefined;
const media = gsap.matchMedia();

// One clock for Lenis and GSAP; touch scrolling keeps the browser's native feel.
media.add({
  all: '(min-width: 0px)',
  desktop: '(min-width: 768px) and (pointer: fine)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
}, (context) => {
  const { desktop, reducedMotion } = context.conditions!;
  if (reducedMotion) return;

  let lenis: Lenis | undefined;
  let ticker: ((time: number) => void) | undefined;
  if (desktop) {
    lenis = new Lenis({
      autoRaf: false,
      duration: 0.85,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
    });
    smoothScroll = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    ticker = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
  }

  // Everything is visible by default in CSS. Only animate the opening at the top.
  if (window.scrollY < 80) {
    const opening = gsap.timeline({ defaults: { ease: 'power2.out' } });
    opening
      .from('[data-hero-image]', { scale: 1.025, duration: 1.2 }, 0)
      .from('[data-hero-logo]', { opacity: 0, y: 10, duration: 0.8 }, 0.1)
      .from('[data-hero-copy]', { opacity: 0, y: 8, duration: 0.65 }, 0.35);
  }

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.from(element, {
      y: 18,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 93%',
        once: true,
      },
    });
  });

  const refresh = () => ScrollTrigger.refresh();
  if (document.readyState !== 'complete') window.addEventListener('load', refresh, { once: true });

  return () => {
    window.removeEventListener('load', refresh);
    if (ticker) gsap.ticker.remove(ticker);
    lenis?.off('scroll', ScrollTrigger.update);
    lenis?.destroy();
    if (smoothScroll === lenis) smoothScroll = undefined;
  };
});

// Real hash links are retained for keyboard use, history, and no-JS navigation.
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const hash = anchor.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    closeMenu();

    if (smoothScroll) {
      event.preventDefault();
      history.pushState(null, '', hash);
      smoothScroll.scrollTo(target, {
        offset: -(header?.offsetHeight ?? 80) - 18,
        onComplete: () => {
          if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
            target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
          }
          target.focus({ preventScroll: true });
        },
      });
    }
  });
});

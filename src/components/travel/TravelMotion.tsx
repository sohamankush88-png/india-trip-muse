import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { AnimatePresence, animate, motion, useReducedMotion } from 'framer-motion';
import { useLocation } from '@tanstack/react-router';
import { Compass } from 'lucide-react';
import { claimSplashSession, SPLASH_DURATION_MS } from './motionSession';

const ease = [0.16, 1, 0.3, 1] as const;
const cards = '.destination-card,.place-card,.transport-card,.day-card,.saved-trip,.guide-item';
const sections = '.section-heading,.page-heading,.trust-strip,.how-section,.inspiration-band,.journey-section,.budget-summary,.budget-breakdown,.expense-section,.planning-inspiration';
const details = '.map-marker,.hero-eyebrow,.hero-content h1,.hero-content>p,.hero-proof,.search-field,.step,.activity,.journey-stop';

/** Animate existing elements in place, without changing their layout or contracts. */
function useTravelEntrances(scope: RefObject<HTMLDivElement | null>, path: string) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = scope.current;
    if (!root || reduced) return;
    const seen = new WeakSet<Element>();
    const running = new Map<HTMLElement, ReturnType<typeof animate>>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
        const element = entry.target;
        observer.unobserve(element);
        const index = Array.from(element.parentElement?.children ?? []).indexOf(element);
        const isCard = element.matches(cards);
        const control = animate(element, { opacity: [0, 1], y: [element.matches('.map-marker') ? -12 : isCard ? 24 : 16, 0] }, {
          duration: 0.45, delay: Math.min(Math.max(index, 0), 6) * 0.08, ease,
          onComplete: () => { element.style.removeProperty('transform'); element.style.removeProperty('opacity'); running.delete(element); },
        });
        running.set(element, control);
      }
    }, { threshold: 0.2 });
    const scan = () => root.querySelectorAll<HTMLElement>(`${cards},${sections},${details}`).forEach(element => {
      if (seen.has(element)) return;
      seen.add(element);
      observer.observe(element);
    });
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(root, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); running.forEach(control => control.stop()); };
  }, [scope, path, reduced]);
}

export function TravelPageMotion({ children }: { children: ReactNode }) {
  const path = useLocation({ select: location => location.pathname });
  const reduced = useReducedMotion();
  const scope = useRef<HTMLDivElement>(null);
  useTravelEntrances(scope, path);
  return <div ref={scope}><AnimatePresence initial={false} mode="wait">
    <motion.div key={path} className="travel-route" initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: reduced ? 1 : 0, transition: { duration: reduced ? 0 : 0.12 } }} transition={{ duration: reduced ? 0 : 0.35, ease }}>
      {children}
    </motion.div>
  </AnimatePresence></div>;
}

export function TravelSplash() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const shouldShow = claimSplashSession(window.sessionStorage);
    if (!shouldShow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), SPLASH_DURATION_MS - 300);
    return () => window.clearTimeout(timer);
  }, []);
  return <AnimatePresence>{visible && !reduced && <motion.div className="travel-splash" aria-hidden="true" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
    <div className="splash-stars">{Array.from({ length: 12 }, (_, i) => <motion.i key={i} className={`splash-star star-${i}`} animate={{ opacity: [0.25, 0.8, 0.25] }} transition={{ duration: 2, delay: i * 0.08 }} />)}</div>
    <motion.div className="splash-cloud cloud-one" animate={{ x: [0, 35] }} transition={{ duration: 2.75 }} />
    <motion.div className="splash-cloud cloud-two" animate={{ x: [0, -25] }} transition={{ duration: 2.75 }} />
    <motion.div className="splash-plane-flight" initial={{ x: '-38vw', y: '35vh', rotate: -8, opacity: 0 }} animate={{ x: ['-38vw', '-12vw', '60vw'], y: ['35vh', '8vh', '-42vh'], rotate: [-8, -16, -22], opacity: [0, 1, 1] }} transition={{ duration: 2.4, times: [0, 0.4, 1], ease: [0.45, 0, 0.8, 1] }}>
      <div className="splash-contrail" />
      <svg className="splash-plane" viewBox="0 0 300 140" fill="none">
        <path className="plane-wing-shadow" d="M98 67 69 119l35-8 73-38z"/>
        <path className="plane-wing" d="M112 62 72 15l28 3 87 46z"/>
        <path className="plane-body" d="m22 69 22-44 17 3-4 35 194-3q33 1 40 13-8 14-42 14L49 81 17 73z"/>
        <path className="plane-wing" d="m128 78-60 52 34-3 91-45z"/>
        <path className="plane-engine" d="M148 99q-5-8 3-11l27-4q9 3 5 10l-27 8z"/>
        <path className="plane-stripe" d="M51 76h196" strokeWidth="2"/>
        <path className="plane-cockpit" d="m252 64 15 3 6 5-21-1z"/>
        {Array.from({length: 12}, (_, i) => <rect key={i} className="plane-window" x={92+i*11} y="68" width="5" height="4" rx="1.5"/>)}
      </svg>
    </motion.div>
    <div className="splash-brand">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.15, ease }}><Compass size={34}/><strong>Yatra<span>Genie</span><b>.</b></strong></motion.div>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.5, ease }}>Your Journey Begins Here</motion.p>
    </div>
    <div className="splash-progress"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.45, ease: 'easeInOut' }}/></div>
  </motion.div>}</AnimatePresence>;
}
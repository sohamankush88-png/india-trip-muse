import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Bus, Car, MapPin, Pause, Play, Plane, RotateCcw, TrainFront, BedDouble, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { money } from '@/data/mockData';
import { useTrip } from './TripContext';
import { journeyLegs, type LegMode } from './journeyLegs';

export const LEG_MS = 1900;
const legIcons: Record<LegMode, LucideIcon> = { Cab: Car, Taxi: Car, Road: Car, Auto: Car, Flight: Plane, Train: TrainFront, Bus };

/** Animated walkthrough of the selected route, one leg at a time. Mount with key={routeId} to restart on route change. */
export function JourneyPreview() {
  const { trip, routeId } = useTrip();
  const legs = journeyLegs(trip, routeId);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);
  const started = useRef(false);

  useEffect(() => { if (inView && !reduced && !started.current) { started.current = true; setPlaying(true); } }, [inView, reduced]);
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (active >= legs.length - 1) setPlaying(false); else setActive(a => a + 1);
    }, LEG_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, legs.length, run]);

  const current = legs[active] ?? legs[0]!;
  const CurrentIcon = legIcons[current.mode];
  const finished = !playing && active === legs.length - 1;
  const stops = [legs[0]!.from, ...legs.map(l => l.to)];
  const perPerson = legs.reduce((s, l) => s + l.cost, 0);
  const choose = (i: number) => { started.current = true; setPlaying(false); setActive(i); };
  const replay = () => { started.current = true; setActive(0); setRun(r => r + 1); setPlaying(true); };
  const toggle = () => { if (finished) replay(); else { started.current = true; setPlaying(p => !p); } };
  const move = reduced ? 0 : LEG_MS / 1000;

  return <section ref={ref} className="journey-preview" aria-label="Animated journey preview">
    <div className="jp-head">
      <div><span className="eyebrow">WATCH YOUR JOURNEY UNFOLD</span><h2>Leg by leg, start to stay.</h2><p>{legs.length} legs · {money(perPerson)} per person one way · illustrative timings</p></div>
      <div className="button-row">
        <Button variant="outline" onClick={toggle} aria-label={playing ? 'Pause journey preview' : finished ? 'Replay journey preview' : 'Play journey preview'}>{playing ? <Pause /> : finished ? <RotateCcw /> : <Play />}{playing ? 'Pause' : finished ? 'Replay' : 'Play'}</Button>
      </div>
    </div>
    <div className="jp-track">
      {stops.map((stop, i) => {
        const leg = legs[i];
        const LegIcon = leg ? legIcons[leg.mode] : null;
        const state = i < active ? 'done' : i === active ? 'active' : 'next';
        const reached = i <= active || (i === active + 1 && finished);
        return <div className="jp-piece" key={`${stop}-${i}`}>
          <div className={'jp-stop ' + (reached ? 'reached' : '')}>
            <motion.span className="jp-dot" animate={{ scale: i === active || (finished && i === stops.length - 1) ? 1.15 : 1 }} transition={{ duration: reduced ? 0 : 0.3 }}>{i === stops.length - 1 ? <BedDouble /> : <MapPin />}</motion.span>
            <small>{stop}</small>
          </div>
          {leg && LegIcon && <button type="button" className={`jp-leg ${state}`} onClick={() => choose(i)} aria-pressed={i === active} aria-label={`Leg ${i + 1}: ${leg.from} to ${leg.to} by ${leg.mode}, ${leg.duration}`}>
            <span className="jp-rail">
              <motion.span key={`fill-${run}-${i}-${state}-${playing}`} className="jp-fill" initial={{ scaleX: state === 'active' && playing ? 0 : state === 'next' ? 0 : 1 }} animate={{ scaleX: state === 'next' ? 0 : 1 }} transition={{ duration: state === 'active' && playing ? move : 0, ease: 'easeInOut' }} />
              {state === 'active' && <motion.span key={`run-${run}-${i}-${playing}`} className="jp-runner" initial={{ x: playing ? '0%' : '50%' }} animate={{ x: playing ? '100%' : '50%' }} transition={{ duration: playing ? move : 0, ease: 'easeInOut' }}><i><LegIcon /></i></motion.span>}
            </span>
            <span className="jp-mode">{leg.mode}</span>
          </button>}
        </div>;
      })}
    </div>
    <motion.div key={`${run}-${active}`} className="jp-detail" initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.3 }} aria-live="polite">
      <span className="stop-icon"><CurrentIcon /></span>
      <div><span className="eyebrow">LEG {active + 1} OF {legs.length} · {current.time}</span><h3>{current.from} → {current.to}</h3><p>{current.mode} · {current.duration} · {current.distance} · {current.note}</p></div>
      <strong>{money(current.cost * trip.travelers)}<small>{trip.travelers > 1 ? ` for ${trip.travelers}` : ' estimated'}</small></strong>
    </motion.div>
  </section>;
}

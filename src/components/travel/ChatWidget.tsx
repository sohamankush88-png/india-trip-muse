import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, Send, Trash2, X, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { transports } from '@/data/mockData';
import { useTrip } from './TripContext';

type Msg = { role: 'user' | 'assistant'; content: string };
const chips = ['Plan my day-wise itinerary', 'Cheapest way to reach?', 'Best local food to try', 'Budget hotel suggestions'];

export function ChatWidget() {
  const { trip, routeId } = useTrip();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<'English' | 'Hindi' | 'Marathi'>('English');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ block: 'end' }); }, [msgs, busy]);
  useEffect(() => { if (open && !busy) inputRef.current?.focus(); }, [open, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const history: Msg[] = [...msgs, { role: 'user', content }];
    setMsgs(history); setInput(''); setError(''); setBusy(true);
    const route = transports.find(r => r.id === routeId)?.name ?? routeId;
    try {
      const res = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language: lang, messages: history.slice(-40), trip: { from: trip.from, destination: trip.to, departure: trip.departure, returnDate: trip.returnDate, days: trip.days, travelers: trip.travelers, budgetINR: trip.budget, selectedRoute: route } }),
      });
      if (!res.ok || !res.body) { const j = await res.json().catch(() => ({})); throw new Error(j.error || 'The assistant could not reply.'); }
      const reader = res.body.getReader(); const dec = new TextDecoder(); let reply = '';
      setMsgs(m => [...m, { role: 'assistant', content: '' }]);
      for (;;) { const { done, value } = await reader.read(); if (done) break; reply += dec.decode(value, { stream: true }); setMsgs(m => [...m.slice(0, -1), { role: 'assistant', content: reply }]); }
    } catch (e) { setError(e instanceof Error ? e.message : 'The assistant could not reply.'); setMsgs(m => m[m.length - 1]?.role === 'assistant' && !m[m.length - 1]?.content ? m.slice(0, -1) : m); }
    finally { setBusy(false); }
  }

  return <>
    <AnimatePresence>{open && <motion.section initial={{ opacity: 0, scale: reduced ? 1 : 0.96, y: reduced ? 0 : 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: reduced ? 1 : 0.96 }} transition={{ duration: reduced ? 0 : 0.2 }} className="chat-popup" role="dialog" aria-label="YatraGenie travel assistant">
      <header className="chat-head"><span className="brand-icon"><Compass size={18} /></span><div><strong>YatraGenie Assistant</strong><small>{trip.from} → {trip.to}</small></div>
        <select aria-label="Chat language" value={lang} onChange={e => setLang(e.target.value as typeof lang)}><option>English</option><option>Hindi</option><option>Marathi</option></select>
        <Button size="icon" variant="ghost" aria-label="Clear chat" onClick={() => { setMsgs([]); setError(''); }} disabled={busy}><Trash2 /></Button>
        <Button size="icon" variant="ghost" aria-label="Close chat" onClick={() => setOpen(false)}><X /></Button></header>
      <div className="chat-body">
        {!msgs.length && <p className="chat-empty">Namaste! Ask me anything about your trip to {trip.to}.</p>}
        {msgs.map((m, i) => <motion.div key={i} initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.2 }} className={'chat-msg ' + m.role}>{m.role === 'assistant' ? <ReactMarkdown>{m.content}</ReactMarkdown> : m.content}</motion.div>)}
        {busy && msgs[msgs.length - 1]?.role === 'user' && <div className="chat-msg assistant typing" aria-label="Assistant is typing">{[0, 1, 2].map(i => <motion.span key={i} animate={reduced ? undefined : { y: [0, -4, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}/>)}</div>}
        {error && <p className="chat-error">{error}</p>}
        <div ref={endRef} />
      </div>
      <div className="chat-chips">{chips.map((c, i) => <motion.div key={c} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.2, delay: reduced ? 0 : i * 0.08 }}><Button variant="outline" type="button" disabled={busy} onClick={() => send(c)}>{c}</Button></motion.div>)}</div>
      <form className="chat-input" onSubmit={e => { e.preventDefault(); send(input); }}>
        <textarea ref={inputRef} aria-label="Message" rows={1} maxLength={2000} value={input} placeholder="Ask about trains, hotels, food…" onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }} />
        <Button size="icon" type="submit" aria-label="Send" disabled={busy || !input.trim()}><Send /></Button>
      </form>
    </motion.section>}</AnimatePresence>
    <Button className="chat-fab" size="icon" aria-label={open ? 'Close travel assistant' : 'Open travel assistant'} onClick={() => setOpen(!open)}>{open ? <X /> : <MessageCircle />}</Button>
  </>;
}

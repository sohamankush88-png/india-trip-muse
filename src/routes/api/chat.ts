import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const SYSTEM = 'You are YatraGenie, an expert Indian travel planner. Help users plan trips using their trip context. Give practical India-focused answers about flights, trains, buses, taxis, hotels, food, attractions, budgets, and day-wise itineraries. If live prices are unavailable, clearly say the price is an estimate. Reply in the selected language.';

const Body = z.object({
  language: z.enum(['English', 'Hindi', 'Marathi']),
  trip: z.record(z.string(), z.union([z.string().max(200), z.number()])),
  messages: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().min(1).max(4000) })).min(1).max(40),
});

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env['LOVABLE_API_KEY'];
        if (!key) return Response.json({ error: 'AI assistant is not configured.' }, { status: 503 });
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: 'Invalid request.' }, { status: 400 });
        const { language, trip, messages } = parsed.data;
        const context = `Selected language: ${language}. Current trip context: ${Object.entries(trip).map(([k, v]) => `${k}: ${v}`).join('; ')}.`;
        const upstream = await fetch('https://ai.gateway.lovable.dev/v1/responses', {
          method: 'POST',
          headers: { 'Lovable-API-Key': key, 'X-Lovable-AIG-SDK': 'fetch', 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'openai/gpt-6-astra', stream: true, store: false, reasoning: { effort: 'low' }, instructions: `${SYSTEM}\n\n${context}`, input: messages }),
          signal: request.signal,
        });
        if (!upstream.ok || !upstream.body) {
          const msg = upstream.status === 401 ? 'AI assistant is not configured.' : upstream.status === 402 ? 'AI credits have run out for this workspace.' : upstream.status === 429 ? 'The assistant is busy right now. Please try again shortly.' : 'The assistant could not reply. Please try again.';
          return Response.json({ error: msg }, { status: upstream.status === 401 ? 503 : upstream.status });
        }
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let buffer = '';
        const stream = upstream.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
          transform(chunk, ctrl) {
            buffer += decoder.decode(chunk, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
              const data = line.trim().replace(/^data:\s*/, '');
              if (!data || data === '[DONE]') continue;
              try { const ev = JSON.parse(data); const t = ev.type === 'response.output_text.delta' ? ev.delta : ''; if (t) ctrl.enqueue(encoder.encode(t)); } catch { /* partial */ }
            }
          },
        }));
        return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-cache' } });
      },
    },
  },
});

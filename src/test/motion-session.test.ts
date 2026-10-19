import { describe, expect, it } from 'vitest';
import { claimSplashSession, SPLASH_DURATION_MS } from '../components/travel/motionSession';

describe('travel splash session rules', () => {
  it('shows only once within the same session, including a page refresh', () => {
    const values = new Map<string, string>();
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
    expect(claimSplashSession(storage)).toBe(true);
    expect(claimSplashSession(storage)).toBe(false);
  });
  it('lasts between 2.5 and 3 seconds', () => {
    expect(SPLASH_DURATION_MS).toBeGreaterThanOrEqual(2500);
    expect(SPLASH_DURATION_MS).toBeLessThanOrEqual(3000);
  });
  it('does not block the app when session storage is unavailable', () => {
    expect(claimSplashSession({ getItem: () => { throw new Error('blocked'); }, setItem: () => {} })).toBe(false);
  });
});
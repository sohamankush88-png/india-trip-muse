export const SPLASH_SESSION_KEY = 'yatragenie-splash-seen';
export const SPLASH_DURATION_MS = 2750;

export function claimSplashSession(storage: Pick<Storage, 'getItem' | 'setItem'>): boolean {
  try {
    if (storage.getItem(SPLASH_SESSION_KEY)) return false;
    storage.setItem(SPLASH_SESSION_KEY, 'true');
    return true;
  } catch {
    return false;
  }
}
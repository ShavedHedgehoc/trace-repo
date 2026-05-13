import { useSyncExternalStore } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  return useSyncExternalStore(
    // 1. Функция подписки
    (callback) => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    // 2. Функция получения значения на клиенте
    () => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches,
    // 3. Значение для SSR (сервера)
    () => false,
  );
}

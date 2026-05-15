import { DYNAMIC_PATTERNS, STATIC_TITLES } from '@/shared/constants';
import { useLocation, matchPath } from 'react-router-dom';

export function useRouteTitle() {
  const { pathname } = useLocation();

  if (STATIC_TITLES[pathname]) {
    return STATIC_TITLES[pathname];
  }
  const dynamicMatch = DYNAMIC_PATTERNS.find((route) => matchPath(route.path, pathname));

  return dynamicMatch ? dynamicMatch.title : 'Страница не найдена...';
}

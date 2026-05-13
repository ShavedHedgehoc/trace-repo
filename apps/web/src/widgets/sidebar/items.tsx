import { ROUTE_PATH } from '@/shared/constants';

export interface TNavItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

export const navItems: TNavItem[] = [
  {
    title: 'Варки',
    url: ROUTE_PATH.HOME,
  },
  {
    title: 'Торговые названия',
    url: ROUTE_PATH.TRADEMARKS,
  },
];

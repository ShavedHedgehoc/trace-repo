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
  // {
  //   title: 'Сырье',
  //   url: ROUTE_PATH.MATERIALS,
  // },
  {
    title: 'Сырье в ячейках',
    url: ROUTE_PATH.CELLS_CONTAIN,
  },
];

export const adminNavItems: TNavItem[] = [
  {
    title: 'Пользователи',
    url: ROUTE_PATH.USERS,
  },
];

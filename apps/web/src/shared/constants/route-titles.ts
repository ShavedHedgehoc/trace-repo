export const STATIC_TITLES: Record<string, string> = {
  '/': 'Варки',
  '/trademarks': 'Торговые названия',
  '/cells-contain': 'Сырье в ячейках',
  '/material': 'Сырье',
  '/forbidden': 'Недостаточно прав',
  '/users': 'Пользователи',
};

export const DYNAMIC_PATTERNS = [
  { path: 'boil-detail/:boilId', title: 'Информация по варке' },
  { path: 'lot-detail/:lotId', title: 'Информация по квазипартии' },
];

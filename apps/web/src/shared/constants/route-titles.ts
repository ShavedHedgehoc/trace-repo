export const STATIC_TITLES: Record<string, string> = {
    '/': 'Варки',
    '/dashboard': 'Дашборд',
    '/settings': 'Настройки',
};

export const DYNAMIC_PATTERNS = [
    { path: '/users/:id', title: 'Профиль пользователя' },
    { path: '/orders/:orderId', title: 'Заказ' },
];
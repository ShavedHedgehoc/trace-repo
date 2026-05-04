// import { trpc } from '@/shared/api';

import { AppRouter } from "./providers/router";

// import './styles/index.css'; // Глобальные стили

export function App() {
    // const { data } = trpc.employee.app.list.useQuery({ filter: { name: '' }, page: 1, limit: 20 });

    return (<AppRouter />)
}

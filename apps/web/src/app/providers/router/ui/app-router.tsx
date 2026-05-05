import MainLayout from '@/app/main-layout';
import { Boils, Trademarks } from '@/pages';
import { ROUTE_PATH } from '@/shared/constants';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <></>,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Boils />,
      },
      { path: ROUTE_PATH.TRADEMARKS, element: <Trademarks /> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

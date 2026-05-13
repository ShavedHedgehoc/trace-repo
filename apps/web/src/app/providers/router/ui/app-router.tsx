import MainLayout from '@/app/main-layout';
import { Boils, Login, Trademarks, BoilDetail } from '@/pages';
import { ROUTE_PATH } from '@/shared/constants';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../auth-provider';

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const ProtectedRoute = () => {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) {
    return <div>...</div>;
  }
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = () => {
  const { isAuth, isLoading } = useAuth();
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return !isAuth ? <Outlet /> : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/',
            element: <MainLayout />,
            children: [
              {
                index: true,
                element: <Boils />,
              },
              {
                path: ROUTE_PATH.BOIL_DETAIL,
                element: <BoilDetail />,
              },
              {
                path: ROUTE_PATH.TRADEMARKS,
                element: <Trademarks />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

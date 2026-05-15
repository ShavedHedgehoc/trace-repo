import MainLayout from '@/app/main-layout';
import { Boils, Login, Trademarks, BoilDetail, CellsContain, Materials, Users } from '@/pages';
import { ROUTE_PATH } from '@/shared/constants';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../auth-provider';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuth, isLoading, user } = useAuth();
  if (isLoading) {
    return <div>...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user?.roles) {
    const hasAccess = user.roles.some((role) => allowedRoles.includes(role));

    if (!hasAccess) {
      return <Navigate to="/forbidden" replace />;
    }
  }
  return <Outlet />;
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
            path: ROUTE_PATH.LOGIN,
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
              {
                path: ROUTE_PATH.MATERIALS,
                element: <Materials />,
              },
              {
                element: <ProtectedRoute allowedRoles={['Специалист']} />,
                children: [
                  {
                    path: ROUTE_PATH.CELLS_CONTAIN,
                    element: <CellsContain />,
                  },
                ],
              },
              {
                element: <ProtectedRoute allowedRoles={['Администратор']} />,
                children: [
                  {
                    path: ROUTE_PATH.USERS,
                    element: <Users />,
                  },
                ],
              },

              {
                path: '/forbidden',
                element: (
                  <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
                    <h1 className="text-4xl font-bold">403</h1>
                    <p className="text-muted-foreground">
                      Доступ запрещен. У вас нет необходимых прав.
                    </p>
                  </div>
                ),
              },
              {
                path: '*',
                element: (
                  <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="text-muted-foreground">Страница не найдена.</p>
                  </div>
                ),
              },
            ],
          },
        ],
      },

      {
        path: '*',
        element: (
          <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-muted-foreground">Страница не найдена.</p>
          </div>
        ),
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

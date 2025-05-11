import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import AppLayout from 'src/layouts';
import LoginView from 'src/views/login/login-view';

const StorePage = lazy(() => import('src/pages/store'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <AppLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </AppLayout>
      ),
      children: [
        { element: <StorePage />, index: true },
        { path: 'login', element: <LoginView /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}

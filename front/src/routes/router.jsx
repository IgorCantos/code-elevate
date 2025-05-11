import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import AppLayout from 'src/layouts';

const StorePage = lazy(() => import('src/pages/store'));
const BookDetailPage = lazy(() => import('src/pages/book-detail'));

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
        { path: 'books/:bookId', element: <BookDetailPage /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return routes;
}

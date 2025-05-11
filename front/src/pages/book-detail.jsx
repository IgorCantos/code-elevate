import { Helmet } from 'react-helmet-async';

import BookDetailView from 'src/views/book-detail/book-detail-view';

export default function StoreItemDetailPage() {
  return (
    <>
      <Helmet>
        <title> Code Elevate </title>
      </Helmet>

      <BookDetailView />
    </>
  );
}

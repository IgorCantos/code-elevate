import { Helmet } from 'react-helmet-async';

import BookStoreView from 'src/views/book-store/book-store-view';

export default function StorePage() {
  return (
    <>
      <Helmet>
        <title> Code Elevate </title>
      </Helmet>

      <BookStoreView />
    </>
  );
}

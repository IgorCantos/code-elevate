import { Helmet } from 'react-helmet-async';

import StoreView from 'src/views/store/store-view';

export default function StorePage() {
  return (
    <>
      <Helmet>
        <title> Code Elevate </title>
      </Helmet>

      <StoreView />
    </>
  );
}

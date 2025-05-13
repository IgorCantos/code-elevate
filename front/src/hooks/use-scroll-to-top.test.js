import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useScrollToTop } from './use-scroll-to-top';

describe('useScrollToTop hook', () => {
  it('call window.scrollTo(0, 0) on pathname change', () => {
    window.scrollTo = jest.fn();

    const Component = () => {
      useScrollToTop();
      const location = useLocation();
      return <div data-testid="location">{location.pathname}</div>;
    };

    render(
      <MemoryRouter initialEntries={['/page1']}>
        <Routes>
          <Route path="*" element={<Component />} />
        </Routes>
      </MemoryRouter>
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

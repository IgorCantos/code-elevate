import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';

describe('Header Component', () => {
  it('renders the AppBar with the correct styles', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const appBar = screen.getByRole('banner');

    expect(appBar).toHaveStyle({
      backgroundColor: '#cc0000',
      boxShadow: 'none',
      height: '64px',
    });
  });

  it('renders the logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByAltText('F1rst Books Logo');
    expect(logo).toBeInTheDocument();
  });
});

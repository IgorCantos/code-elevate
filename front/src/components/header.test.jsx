import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header Component', () => {
  it('renders the AppBar with the correct styles', () => {
    render(<Header />);
    const appBar = screen.getByRole('banner');

    expect(appBar).toHaveStyle({
      backgroundColor: '#cc0000',
      boxShadow: 'none',
      height: '64px',
    });
  });

  it('renders the logo', () => {
    render(<Header />);
    const logo = screen.getByAltText('F1rst Books Logo');
    expect(logo).toBeInTheDocument();
  });
});

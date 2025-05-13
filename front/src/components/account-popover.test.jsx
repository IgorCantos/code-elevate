import React from 'react';
import { render, screen } from '@testing-library/react';
import AccountPopover from './account-popover';

describe('AccountPopover Component', () => {
  it('displays the first letter of the name inside the Avatar', () => {
    render(<AccountPopover />);

    const avatar = screen.getByText('I');
    expect(avatar).toBeInTheDocument();
  });
});

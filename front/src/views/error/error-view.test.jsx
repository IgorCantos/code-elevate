import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorView from './error-view';

describe('ErrorView Component', () => {
  const defaultProps = {
    title: 'Título',
    subtitle: 'Subtítulo',
    buttonIcon: <span>Icon</span>,
    buttonText: 'Tente novamente',
    onButtonClick: jest.fn(),
    isLoading: false,
  };

  it('renders the title, subtitle, button and icon', () => {
    render(<ErrorView {...defaultProps} />);
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tente novamente/i })).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('calls the onButtonClick handler when the button is clicked', () => {
    render(<ErrorView {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Tente novamente/i });
    fireEvent.click(button);
    expect(defaultProps.onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button and shows a loading indicator when isLoading is true', () => {
    render(<ErrorView {...defaultProps} isLoading={true} />);
    const button = screen.getByRole('button', { name: /Carregando.../i });
    expect(button).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('does not render the loading indicator when isLoading is false', () => {
    render(<ErrorView {...defaultProps} />);
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
});

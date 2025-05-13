import React from 'react';
import { render, screen } from '@testing-library/react';
import BookSkeletonList from './book-store-view-loading';

describe('BookSkeletonList', () => {
  it(' render skeletons for the book list', () => {
    render(<BookSkeletonList />);

    const skeletonList = screen.getByTestId('skeleton-list');
    expect(skeletonList).toBeInTheDocument();

    const largeSkeleton = screen.getByTestId('skeleton-large');
    expect(largeSkeleton).toBeInTheDocument();

    const skeletonCards = screen.getAllByTestId(/^skeleton-card-/);
    expect(skeletonCards).toHaveLength(16);
  });
});

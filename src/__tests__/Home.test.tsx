import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from '@/_root/pages/Home';
import { useGetRecentPosts } from '@/lib/react-query/queriesAndMutations';

// Mock the useGetRecentPosts hook
jest.mock('@/lib/react-query/queriesAndMutations', () => ({
  useGetRecentPosts: jest.fn(),
}));

const queryClient = new QueryClient();

describe('Home Component', () => {
  it('renders loader when posts are loading', () => {
    (useGetRecentPosts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders posts when data is available', () => {
    const mockPosts = {
      documents: [
        { $id: '1', caption: 'Post 1' },
        { $id: '2', caption: 'Post 2' },
      ],
    };

    (useGetRecentPosts as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });
});
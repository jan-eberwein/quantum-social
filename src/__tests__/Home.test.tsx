import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "../_root/pages/Home";
import { useGetRecentPosts } from "../lib/react-query/queriesAndMutations";
import "@testing-library/jest-dom";

// Mock the `useGetRecentPosts` hook
jest.mock("@/lib/react-query/queriesAndMutations", () => ({
  useGetRecentPosts: jest.fn(),
}));

// Mock the `PostCard` component
jest.mock("@/components/shared/PostCard", () => ({
  __esModule: true,
  default: ({ post }: { post: any }) => <div>{post.caption}</div>,
}));

// Mock Loader
jest.mock("@/components/shared", () => ({
  __esModule: true,
  Loader: () => <div>Loading...</div>,
}));

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe("Home Component", () => {
  it("renders the loader when posts are loading", () => {
    (useGetRecentPosts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    renderWithQueryClient(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders posts when data is available", async () => {
    const mockPosts = {
      documents: [
        { caption: "Post 1", id: "1" },
        { caption: "Post 2", id: "2" },
      ],
    };

    (useGetRecentPosts as jest.Mock).mockReturnValue({
      data: mockPosts,
      isLoading: false,
    });

    renderWithQueryClient(<Home />);

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
    });
  });

  it("does not show the loader or posts when there is no data and loading is complete", () => {
    (useGetRecentPosts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    renderWithQueryClient(<Home />);

    // Ensure the loader is not in the document
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    // Ensure the list is not in the document
    expect(screen.queryByRole("list")).not.toBeInTheDocument();

    // Check for a "No posts available" message
    expect(screen.getByText("No posts available")).toBeInTheDocument();
  });
});

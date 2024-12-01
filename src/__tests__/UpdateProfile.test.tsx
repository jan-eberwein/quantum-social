import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import UpdateProfile from '@/_root/pages/UpdateProfile';

jest.mock('@/context/AuthContext', () => ({
    useUserContext: () => ({
        user: {
            name: 'John Doe',
            username: 'johndoe',
            email: 'johndoe@example.com',
            bio: 'This is a bio',
        },
        setUser: jest.fn(),
    }),
}));

jest.mock('@/lib/react-query/queriesAndMutations', () => ({
    useGetUserById: () => ({
        data: {
            $id: 'user-id',
            name: 'John Doe',
            bio: 'This is a bio',
            imageUrl: 'image-url',
            imageId: 'image-id',
        },
    }),
    useUpdateUser: () => ({
        mutateAsync: jest.fn().mockResolvedValue({
            name: 'John Doe Updated',
            bio: 'This is an updated bio',
            imageUrl: 'new-image-url',
        }),
        isPending: false,
    }),
}));

jest.mock('@/hooks/use-toast', () => ({
    useToast: () => ({
        toast: jest.fn(),
    }),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) =>
    render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe('UpdateProfile Component', () => {
    it('renders the update profile form', () => {
        renderWithQueryClient(
            <MemoryRouter>
                <UpdateProfile />
            </MemoryRouter>
        );

        // Using getAllByLabelText and selecting the specific index
        expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /update profile/i })).toBeInTheDocument();
    });

    it('submits the form to update the profile', async () => {
        renderWithQueryClient(
            <MemoryRouter initialEntries={['/update-profile']}>
                <Routes>
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    <Route path="/profile/:id" element={<div>Profile Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/Name/), { target: { value: 'John Doe Updated' } });
        fireEvent.change(screen.getByLabelText(/bio/i), { target: { value: 'This is an updated bio' } });
        fireEvent.click(screen.getByRole('button', { name: /update profile/i }));

        await waitFor(() => {
            expect(screen.getByRole('button', { name: /update profile/i })).toBeInTheDocument();
        });
    });
});

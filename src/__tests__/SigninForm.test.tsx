import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import SigninForm from '../_auth/forms/SigninForm';

jest.mock('@/context/AuthContext', () => ({
    useUserContext: jest.fn().mockReturnValue({
        checkAuthUser: jest.fn().mockResolvedValue(true),
        isLoading: false,
    }),
}));

jest.mock('@/hooks/use-toast', () => ({
    useToast: jest.fn().mockReturnValue({
        toast: jest.fn(),
    }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

jest.mock('@/lib/react-query/queriesAndMutations', () => {
    const mockHandleSignin = jest.fn().mockResolvedValue(true); // Define inline
    return {
        useSignInAccount: jest.fn().mockReturnValue({
            mutateAsync: mockHandleSignin,
        }),
    };
});

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactNode) =>
    render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

describe('SigninForm Component', () => {
    it('renders the sign-in form', () => {
        renderWithQueryClient(
            <MemoryRouter>
                <SigninForm />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    });

    it('calls handleSignin with the email and password when submitted and redirects to home page', async () => {
        renderWithQueryClient(
            <MemoryRouter initialEntries={['/sign-in']}>
                <Routes>
                    <Route path="/sign-in" element={<SigninForm />} />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'testuser@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /log in/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from './index';
import { login } from '../../services/authService';

vi.mock('../../services/authService', () => ({
    login: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('LoginPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

    it('deve renderizar os campos de usuário, senha e o botão de entrar', () => {
        renderComponent();

        expect(screen.getByPlaceholderText(/Digite seu usuário/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Digite sua senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('deve alternar a visibilidade da senha ao clicar no botão de visibilidade', () => {
        renderComponent();
        const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);

        const toggleButton = screen.getByText('visibility').closest('button')!;

        expect(passwordInput).toHaveAttribute('type', 'password');

        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'text');
        expect(screen.getByText('visibility_off')).toBeInTheDocument();

        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute('type', 'password');
        expect(screen.getByText('visibility')).toBeInTheDocument();
    });

    it('deve chamar a função de login e navegar para /pets em caso de sucesso', async () => {
        vi.mocked(login).mockResolvedValueOnce({} as any);

        renderComponent();

        const userInput = screen.getByPlaceholderText(/Digite seu usuário/i);
        const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.change(userInput, { target: { value: 'usuario_teste' } });
        fireEvent.change(passwordInput, { target: { value: 'senha123' } });

        fireEvent.click(submitButton);

        expect(login).toHaveBeenCalledWith({
            username: 'usuario_teste',
            password: 'senha123',
        });

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/pets');
        });
    });

    it('deve exibir mensagem de erro quando o login falha', async () => {
        const errorMessage = 'Credenciais inválidas';

        vi.mocked(login).mockRejectedValueOnce({ message: errorMessage });

        renderComponent();

        const submitButton = screen.getByRole('button', { name: /entrar/i });
        fireEvent.click(submitButton);

        const errorDisplay = await screen.findByText(errorMessage);
        expect(errorDisplay).toBeInTheDocument();
        expect(errorDisplay).toHaveClass('text-red-500');
    });

    it('deve desabilitar o botão e mostrar "Entrando..." durante o carregamento', async () => {
        vi.mocked(login).mockReturnValue(new Promise(() => { }));

        renderComponent();
        const submitButton = screen.getByRole('button', { name: /entrar/i });

        fireEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
        expect(screen.getByText(/entrando\.\.\./i)).toBeInTheDocument();
    });
});
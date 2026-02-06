import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DashboardPetsPage } from './index.tsx';

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => navigateMock,
}));

vi.mock('../../../../hooks/usePets', () => ({
    usePets: () => ({
        data: [],
        loading: false,
        error: null,
        page: 0,
        totalPages: 0,
        setPage: vi.fn(),
    }),
}));

vi.mock('../../../../components/DashboardLayout', () => ({
    DashboardLayout: ({ title, children, onCreate }: any) => (
        <div>
            <h1>{title}</h1>
            <button onClick={onCreate}>Novo Pet</button>
            {children}
        </div>
    ),
}));

vi.mock('../../../../components/SearchBar', () => ({
    SearchBar: () => <div>SearchBar</div>,
}));

vi.mock('../../../../components/ListState', () => ({
    ListState: ({ emptyMessage }: any) => <div>{emptyMessage}</div>,
}));

vi.mock('../../../../components/Pagination', () => ({
    Pagination: () => <div>Pagination</div>,
}));

vi.mock('../../../../components/PetCard', () => ({
    PetCard: () => <div>PetCard</div>,
}));

describe('DashboardPetsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve renderizar o título da página', () => {
        render(<DashboardPetsPage />);

        expect(
            screen.getByText('Listagem de Pets')
        ).toBeInTheDocument();
    });

    it('deve exibir mensagem de lista vazia quando não há pets', () => {
        render(<DashboardPetsPage />);

        expect(
            screen.getByText('Nenhum pet cadastrado.')
        ).toBeInTheDocument();
    });

    it('deve navegar para criação de novo pet ao clicar no botão', () => {
        render(<DashboardPetsPage />);

        fireEvent.click(screen.getByText('Novo Pet'));

        expect(navigateMock).toHaveBeenCalledWith('/pets/new');
    });
});

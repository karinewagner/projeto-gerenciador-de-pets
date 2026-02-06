import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DashboardTutorsPage } from './index.tsx';

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => navigateMock,
}));

vi.mock('../../../../hooks/useTutors', () => ({
    useTutors: () => ({
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
            <button onClick={onCreate}>Novo Tutor</button>
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

vi.mock('../../../../components/TutorCard', () => ({
    TutorCard: () => <div>TutorCard</div>,
}));

describe('DashboardTutorsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve renderizar o título da página', () => {
        render(<DashboardTutorsPage />);

        expect(
            screen.getByText('Listagem de Tutores')
        ).toBeInTheDocument();
    });

    it('deve exibir mensagem de lista vazia quando não há tutores', () => {
        render(<DashboardTutorsPage />);

        expect(
            screen.getByText('Nenhum tutor cadastrado.')
        ).toBeInTheDocument();
    });

    it('deve navegar para criação de novo tutor ao clicar no botão', () => {
        render(<DashboardTutorsPage />);

        fireEvent.click(screen.getByText('Novo Tutor'));

        expect(navigateMock).toHaveBeenCalledWith('/tutors/new');
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LinkPetTutorPage } from './index';

const mockActions = {
    setSelectedPet: vi.fn(),
    setSelectedTutor: vi.fn(),
    link: vi.fn(),
    setPetPage: vi.fn(),
    setTutorPage: vi.fn(),
};

vi.mock('../../hooks/useLinkPetTutor', () => ({
    useLinkPetTutor: () => ({
        selectedPet: mockValues.selectedPet,
        selectedTutor: mockValues.selectedTutor,
        setSelectedPet: mockActions.setSelectedPet,
        setSelectedTutor: mockActions.setSelectedTutor,
        linking: mockValues.linking,
        link: mockActions.link,
    }),
}));

vi.mock('../../hooks/usePets', () => ({
    usePets: () => ({
        data: [{ id: 1, nome: 'Rex', raca: 'Labrador', foto: null }],
        loading: false,
        page: 1,
        totalPages: 1,
        setPage: mockActions.setPetPage,
    }),
}));

vi.mock('../../hooks/useTutors', () => ({
    useTutors: () => ({
        data: [{ id: 10, nome: 'João Silva', email: 'joao@email.com' }],
        loading: false,
        page: 1,
        totalPages: 1,
        setPage: mockActions.setTutorPage,
    }),
}));

let mockValues = {
    selectedPet: null as any,
    selectedTutor: null as any,
    linking: false,
};

describe('LinkPetTutorPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockValues = {
            selectedPet: null,
            selectedTutor: null,
            linking: false,
        };
    });

    it('deve renderizar as duas seções de seleção', () => {
        render(<LinkPetTutorPage />);
        expect(screen.getByText('1. Selecionar Pet')).toBeInTheDocument();
        expect(screen.getByText('2. Selecionar Tutor')).toBeInTheDocument();
    });

    it('deve chamar setSelectedPet ao clicar em um pet', () => {
        render(<LinkPetTutorPage />);

        const petName = screen.getByText('Rex');
        fireEvent.click(petName);

        expect(mockActions.setSelectedPet).toHaveBeenCalled();
    });

    it('deve exibir a seção de confirmação quando pet e tutor estiverem selecionados', () => {
        mockValues.selectedPet = { id: 1, nome: 'Rex' };
        mockValues.selectedTutor = { id: 10, nome: 'João Silva' };

        render(<LinkPetTutorPage />);

        const tutorStrong = screen.getByText('João Silva', { selector: 'strong' });
        const petStrong = screen.getByText('Rex', { selector: 'strong' });

        expect(tutorStrong).toBeInTheDocument();
        expect(petStrong).toBeInTheDocument();

        const confirmButton = screen.getByRole('button', { name: /Vincular Pet ao Tutor/i });
        expect(confirmButton).toBeInTheDocument();

        fireEvent.click(confirmButton);
        expect(mockActions.link).toHaveBeenCalled();
    });

    it('deve mostrar estado de "Vinculando..." no botão quando linking for true', () => {
        mockValues.selectedPet = { id: 1, nome: 'Rex' };
        mockValues.selectedTutor = { id: 10, nome: 'João Silva' };
        mockValues.linking = true;

        render(<LinkPetTutorPage />);

        const loadingButton = screen.getByRole('button', { name: /Vinculando\.\.\./i });
        expect(loadingButton).toBeDisabled();
    });
});
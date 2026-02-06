import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PetDetailPage } from './index.tsx';

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => navigateMock,
    useParams: () => ({ petId: '1' }),
    Link: ({ children }: any) => <span>{children}</span>,
}));

const getPetByIdMock = vi.fn();
const deletePetMock = vi.fn();

vi.mock('../../../../services/petService', () => ({
    getPetById: (...args: any[]) => getPetByIdMock(...args),
    deletePet: (...args: any[]) => deletePetMock(...args),
}));

const safeActionMock = vi.fn();

vi.mock('../../../../hooks/useSafeAction', () => ({
    useSafeAction: () => safeActionMock,
}));

vi.mock('../../../../components/DetailLayout', () => ({
    DetailLayout: ({ children, loading, notFoundTitle }: any) => (
        <div>
            {loading && <span>Loading</span>}
            {!loading && children ? children : <span>{notFoundTitle}</span>}
        </div>
    ),
}));

vi.mock('../../../../components/DetailInfoGrid', () => ({
    DetailInfoGrid: ({ title, onDelete }: any) => (
        <div>
            <h1>{title}</h1>
            <button onClick={onDelete}>Excluir</button>
        </div>
    ),
}));

describe('PetDetailPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve buscar e exibir os dados do pet', async () => {
        getPetByIdMock.mockResolvedValueOnce({
            id: 1,
            nome: 'Rex',
            raca: 'Labrador',
            idade: 3,
            tutores: [],
        });

        render(<PetDetailPage />);

        expect(await screen.findByText('Rex')).toBeInTheDocument();
        expect(getPetByIdMock).toHaveBeenCalledWith(1);
    });

    it('deve exibir mensagem de pet não encontrado quando a busca falha', async () => {
        getPetByIdMock.mockRejectedValueOnce(new Error('Not found'));

        render(<PetDetailPage />);

        expect(await screen.findByText('Pet não encontrado')).toBeInTheDocument();
    });

    it('deve deletar o pet e navegar para /pets quando a ação for confirmada', async () => {
        getPetByIdMock.mockResolvedValueOnce({
            id: 1,
            nome: 'Rex',
            raca: 'Labrador',
            idade: 3,
            tutores: [],
        });

        safeActionMock.mockImplementation(async (action: () => Promise<any>) => {
            await action();
            return true;
        });

        deletePetMock.mockResolvedValueOnce(undefined);

        render(<PetDetailPage />);

        await screen.findByText('Rex');

        const deleteButton = screen.getByRole('button', { name: /excluir/i });
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deletePetMock).toHaveBeenCalledWith(1);
            expect(navigateMock).toHaveBeenCalledWith('/pets');
        });
    });
});
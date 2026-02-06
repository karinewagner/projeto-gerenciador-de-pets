import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TutorDetailPage } from './index.tsx';

const navigateMock = vi.fn();

vi.mock('react-router-dom', () => ({
    useNavigate: () => navigateMock,
    useParams: () => ({ tutorId: '1' }),
    Link: ({ children }: any) => <span>{children}</span>,
}));

const getTutorByIdMock = vi.fn();
const deleteTutorMock = vi.fn();
const unlinkPetFromTutorMock = vi.fn();

vi.mock('../../../../services/tutorService', () => ({
    getTutorById: (...args: any[]) => getTutorByIdMock(...args),
    deleteTutor: (...args: any[]) => deleteTutorMock(...args),
    unlinkPetFromTutor: (...args: any[]) => unlinkPetFromTutorMock(...args),
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

describe('TutorDetailPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve buscar e exibir os dados do tutor', async () => {
        getTutorByIdMock.mockResolvedValueOnce({
            id: 1,
            nome: 'ana',
            email: 'ana@email.com',
            telefone: '123456789',
            pets: [],
        });

        render(<TutorDetailPage />);

        expect(await screen.findByText('ana')).toBeInTheDocument();
        expect(getTutorByIdMock).toHaveBeenCalledWith(1);
    });

    it('deve exibir mensagem de tutor não encontrado quando a busca falha', async () => {
        getTutorByIdMock.mockRejectedValueOnce(new Error('Not found'));

        render(<TutorDetailPage />);

        expect(await screen.findByText('Tutor não encontrado')).toBeInTheDocument();
    });

    it('deve deletar o tutor e navegar para /tutors quando a ação for confirmada', async () => {
        getTutorByIdMock.mockResolvedValueOnce({
            id: 1,
            nome: 'ana',
            email: 'ana@email.com',
            telefone: '123456789',
            pets: [],
        });

        safeActionMock.mockImplementation(async (action: () => Promise<any>) => {
            await action();
            return true;
        });

        deleteTutorMock.mockResolvedValueOnce(undefined);

        render(<TutorDetailPage />);

        const deleteButton = await screen.findByRole('button', { name: /excluir/i });
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(deleteTutorMock).toHaveBeenCalledWith(1);
            expect(navigateMock).toHaveBeenCalledWith('/tutors');
        });
    });
});
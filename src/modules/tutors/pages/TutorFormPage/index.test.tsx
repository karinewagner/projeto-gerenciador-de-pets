import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TutorFormPage } from './index.tsx';
import * as router from 'react-router-dom';

const navigateMock = vi.fn();
const showMock = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
        useParams: vi.fn(),
        Link: ({ children }: any) => <span>{children}</span>,
    };
});

vi.mock('../../../../contexts/ToastContext', () => ({
    useToast: () => ({ show: showMock }),
}));

const createTutorMock = vi.fn();
const updateTutorMock = vi.fn();
const getTutorByIdMock = vi.fn();
const addTutorPhotoMock = vi.fn();
const removeTutorPhotoMock = vi.fn();

vi.mock('../../../../services/tutorService', () => ({
    createTutor: (...args: any[]) => createTutorMock(...args),
    updateTutor: (...args: any[]) => updateTutorMock(...args),
    getTutorById: (...args: any[]) => getTutorByIdMock(...args),
    addTutorPhoto: (...args: any[]) => addTutorPhotoMock(...args),
    removeTutorPhoto: (...args: any[]) => removeTutorPhotoMock(...args),
}));

vi.mock('../../../../components/TutorForm', () => ({
    TutorForm: ({ onSave, onRemovePhoto, isEditing, entity }: any) => (
        <div>
            <span>{isEditing ? 'Editando' : 'Criando'}</span>
            <button onClick={() => onSave({
                nome: 'ana',
                email: 'ana@email.com',
                telefone: '123456789',
                endereco: 'Rua A, 123',
                cpf: '123.456.789-00',
            })}>
                Salvar
            </button>
            {entity?.foto?.id && (
                <button onClick={onRemovePhoto}>Remover Foto</button>
            )}
        </div>
    ),
}));

describe('TutorFormPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(router.useParams).mockReturnValue({});
    });

    it('deve criar um novo tutor quando não há id', async () => {
        createTutorMock.mockResolvedValueOnce({});

        render(<TutorFormPage />);

        fireEvent.click(screen.getByText('Salvar'));

        await waitFor(() => {
            expect(createTutorMock).toHaveBeenCalled();
            expect(showMock).toHaveBeenCalledWith('Tutor salvo com sucesso!', 'success');
            expect(navigateMock).toHaveBeenCalledWith(-1);
        });
    });

    it('deve carregar tutor e atualizar quando está em modo edição', async () => {
        vi.mocked(router.useParams).mockReturnValue({ id: '1' });

        getTutorByIdMock.mockResolvedValueOnce({
            id: 1,
            nome: 'ana',
            email: 'ana@email.com',
            telefone: '123456789',
            endereco: 'Rua A, 123',
            cpf: '123.456.789-00',
            foto: null,
        });

        updateTutorMock.mockResolvedValueOnce({});

        render(<TutorFormPage />);

        await waitFor(() => expect(getTutorByIdMock).toHaveBeenCalledWith(1));

        fireEvent.click(screen.getByText('Salvar'));

        await waitFor(() => {
            expect(updateTutorMock).toHaveBeenCalledWith(1, expect.objectContaining({
                nome: 'ana'
            }));
            expect(navigateMock).toHaveBeenCalledWith(-1);
        });
    });

    it('deve remover a foto do tutor', async () => {
        vi.mocked(router.useParams).mockReturnValue({ id: '1' });

        getTutorByIdMock.mockResolvedValueOnce({
            id: 1,
            nome: 'ana',
            email: 'ana@email.com',
            telefone: '123456789',
            endereco: 'Rua A, 123',
            cpf: '123.456.789-00',
            foto: { id: 10, url: 'foto.jpg' },
        });

        removeTutorPhotoMock.mockResolvedValueOnce({});

        render(<TutorFormPage />);

        const removeBtn = await screen.findByText('Remover Foto');
        fireEvent.click(removeBtn);

        await waitFor(() => {
            expect(removeTutorPhotoMock).toHaveBeenCalledWith(1, 10);
            expect(showMock).toHaveBeenCalledWith('Foto removida com sucesso!', 'success');
        });
    });
});
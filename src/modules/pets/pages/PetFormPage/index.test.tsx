import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PetFormPage } from './index.tsx';
import * as router from 'react-router-dom';

const navigateMock = vi.fn();
const showMock = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => navigateMock,
        useParams: vi.fn(),
    };
});

vi.mock('../../../../contexts/ToastContext', () => ({
    useToast: () => ({ show: showMock }),
}));

const createPetMock = vi.fn();
const updatePetMock = vi.fn();
const getPetByIdMock = vi.fn();
const addPetPhotoMock = vi.fn();
const removePetPhotoMock = vi.fn();

vi.mock('../../../../services/petService', () => ({
    createPet: (...args: any[]) => createPetMock(...args),
    updatePet: (...args: any[]) => updatePetMock(...args),
    getPetById: (...args: any[]) => getPetByIdMock(...args),
    addPetPhoto: (...args: any[]) => addPetPhotoMock(...args),
    removePetPhoto: (...args: any[]) => removePetPhotoMock(...args),
}));

vi.mock('../../../../components/PetForm', () => ({
    PetForm: ({ onSave, onRemovePhoto, isEditing, entity }: any) => (
        <div>
            <span>{isEditing ? 'Editando' : 'Criando'}</span>
            <button onClick={() => onSave({
                nome: 'Rex',
                raca: 'Labrador',
                idade: 3,
            })}>
                Salvar
            </button>
            {entity?.foto?.id && (
                <button onClick={onRemovePhoto}>Remover Foto</button>
            )}
        </div>
    ),
}));

describe('PetFormPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.mocked(router.useParams).mockReturnValue({});
    });

    it('deve criar um novo pet quando não há id', async () => {
        createPetMock.mockResolvedValueOnce({});

        render(<PetFormPage />);

        fireEvent.click(screen.getByText('Salvar'));

        await waitFor(() => {
            expect(createPetMock).toHaveBeenCalledWith({
                nome: 'Rex',
                raca: 'Labrador',
                idade: 3,
            });
            expect(showMock).toHaveBeenCalledWith('Pet salvo com sucesso!', 'success');
            expect(navigateMock).toHaveBeenCalledWith(-1);
        });
    });

    it('deve carregar pet e atualizar quando está em modo edição', async () => {
        vi.mocked(router.useParams).mockReturnValue({ id: '1' });

        getPetByIdMock.mockResolvedValueOnce({
            id: 1,
            nome: 'Rex Original',
            raca: 'Poodle',
            idade: 1,
            foto: null,
        });

        updatePetMock.mockResolvedValueOnce({});

        render(<PetFormPage />);

        await waitFor(() => expect(getPetByIdMock).toHaveBeenCalledWith(1));

        fireEvent.click(screen.getByText('Salvar'));

        await waitFor(() => {
            expect(updatePetMock).toHaveBeenCalledWith(1, {
                nome: 'Rex',
                raca: 'Labrador',
                idade: 3,
            });
            expect(navigateMock).toHaveBeenCalledWith(-1);
        });
    });

    it('deve remover a foto do pet', async () => {
        vi.mocked(router.useParams).mockReturnValue({ id: '1' });

        getPetByIdMock.mockResolvedValueOnce({
            id: 1,
            nome: 'Rex',
            raca: 'Labrador',
            idade: 3,
            foto: { id: 10 },
        });

        removePetPhotoMock.mockResolvedValueOnce({});

        render(<PetFormPage />);

        const removeButton = await screen.findByText('Remover Foto');
        fireEvent.click(removeButton);

        await waitFor(() => {
            expect(removePetPhotoMock).toHaveBeenCalledWith(1, 10);
            expect(showMock).toHaveBeenCalledWith('Foto removida com sucesso!', 'success');
        });
    });
});
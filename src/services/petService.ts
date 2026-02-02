import { authFetch } from './apiService';
import type {
    IPetContent,
    IPetResponse,
    IPetPayload,
    IPetFoto,
    IPetDetailsResponse,
    GetPetsParams,
} from '../types/pets';

export async function createPet(
    data: IPetPayload
): Promise<IPetContent> {
    const response = await authFetch('/v1/pets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function getPets(
    params: GetPetsParams
): Promise<IPetResponse> {
    const searchParams = new URLSearchParams();

    if (params.nome) searchParams.append('nome', params.nome);
    if (params.raca) searchParams.append('raca', params.raca);
    if (params.page !== undefined) searchParams.append('page', String(params.page));
    if (params.size !== undefined) searchParams.append('size', String(params.size));

    const response = await authFetch(`/v1/pets?${searchParams.toString()}`, {
        method: 'GET',
    });

    return response.json();
}

export async function getPetById(
    id: number
): Promise<IPetDetailsResponse> {
    const response = await authFetch(`/v1/pets/${id}`, {
        method: 'GET',
    });

    return response.json();
}

export async function updatePet(
    id: number,
    data: IPetPayload
): Promise<IPetContent> {
    const response = await authFetch(`/v1/pets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function deletePet(
    id: number
): Promise<void> {
    await authFetch(`/v1/pets/${id}`, {
        method: 'DELETE',
    });
}

export async function addPetPhoto(
    petId: number,
    file: File
): Promise<IPetFoto> {
    const formData = new FormData();
    formData.append('foto', file);

    const response = await authFetch(`/v1/pets/${petId}/fotos`, {
        method: 'POST',
        body: formData,
    });

    return response.json();
}

export async function removePetPhoto(
    petId: number,
    fotoId: number
): Promise<boolean> {
    const response = await authFetch(
        `/v1/pets/${petId}/fotos/${fotoId}`,
        {
            method: 'DELETE',
        }
    );

    return response.ok;
}
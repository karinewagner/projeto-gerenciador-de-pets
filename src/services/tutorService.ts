import { authFetch } from './apiService';
import type {
    ITutorContent,
    ITutorsResponse,
    ITutorPayload,
    ITutorFoto,
    GetTutorsParams,

} from '../types/tutors';

export async function createTutor(
    data: ITutorPayload
): Promise<ITutorContent> {
    const response = await authFetch('/v1/tutores', {
        method: 'POST',
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function getTutors(
    params: GetTutorsParams
): Promise<ITutorsResponse> {
    const searchParams = new URLSearchParams();

    if (params.nome) searchParams.append('nome', params.nome);
    if (params.page !== undefined) searchParams.append('page', String(params.page));
    if (params.size !== undefined) searchParams.append('size', String(params.size));

    const response = await authFetch(`/v1/tutores?${searchParams.toString()}`, {
        method: 'GET',
    });

    return response.json();
}

export async function getTutorById(
    id: number
): Promise<ITutorContent> // ??????? 
{
    const response = await authFetch(`/v1/tutores/${id}`, {
        method: 'GET',
    });

    return response.json();
}

export async function updateTutor(
    id: number,
    data: ITutorPayload
): Promise<ITutorContent> {
    const response = await authFetch(`/v1/tutores/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });

    return response.json();
}

export async function deleteTutor(
    id: number
): Promise<void> {
    await authFetch(`/v1/tutores/${id}`, {
        method: 'DELETE',
    });
}

export async function addTutorPhoto(
    tutorId: number,
    file: File
): Promise<ITutorFoto> {
    const formData = new FormData();
    formData.append('foto', file);

    const response = await authFetch(
        `/v1/tutores/${tutorId}/fotos`,
        {
            method: 'POST',
            body: formData,
        }
    );

    return response.json();
}

export async function removeTutorPhoto(
    tutorId: number,
    fotoId: number
): Promise<boolean> {
    const response = await authFetch(
        `/v1/tutores/${tutorId}/fotos/${fotoId}`,
        {
            method: 'DELETE',
        }
    );

    return response.ok;
}

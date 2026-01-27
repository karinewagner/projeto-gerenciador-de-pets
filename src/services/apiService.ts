import { getToken } from './authService';

const API_URL = 'https://pet-manager-api.geia.vip';

export async function authFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = getToken();

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!response.ok) {
        let message = 'Erro inesperado';
        try {
            const error = await response.json();
            message = error.message || message;
        } catch { }

        throw new Error(message);
    }

    return response;
}
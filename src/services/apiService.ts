// src/services/apiService.ts
import { getToken, refreshToken, logout } from './authService';

const API_URL = 'https://pet-manager-api.geia.vip';

export async function authFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = getToken();

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: token ? `Bearer ${token}` : '',
        },
    });

    if (response.status === 401) {
        try {
            const newToken = await refreshToken();

            const retryResponse = await fetch(`${API_URL}${url}`, {
                ...options,
                headers: {
                    ...(options.headers || {}),
                    Authorization: `Bearer ${newToken}`,
                },
            });

            if (!retryResponse.ok) {
                throw new Error('Erro após refresh');
            }

            return retryResponse;
        } catch {
            logout();
            window.location.href = '/login';
            throw new Error('Sessão expirada');
        }
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.message || 'Erro inesperado');
    }

    return response;
}
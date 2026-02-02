import { getToken, refreshToken, logout } from './authService';

const API_URL = 'https://pet-manager-api.geia.vip';

export async function authFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = getToken();
    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
        Authorization: token ? `Bearer ${token}` : '',
    };

    if (!isFormData && options.body) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        try {
            const newToken = await refreshToken();

            const retryHeaders: Record<string, string> = {
                ...headers,
                Authorization: `Bearer ${newToken}`,
            };

            const retryResponse = await fetch(`${API_URL}${url}`, {
                ...options,
                headers: retryHeaders,
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
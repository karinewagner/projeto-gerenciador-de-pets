import { getToken, refreshToken, logout } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

export async function authFetch(
    url: string,
    options: RequestInit = {}
) {
    const token = getToken();
    const isFormData = options.body instanceof FormData;

    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!isFormData && options.body && { 'Content-Type': 'application/json' }),
    };

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        try {
            const newToken = await refreshToken();

            const retryHeaders: Record<string, string> = {
                ...(options.headers as Record<string, string>),
                Authorization: `Bearer ${newToken}`,
                ...(!isFormData && options.body && { 'Content-Type': 'application/json' }),
            };

            const retryResponse = await fetch(`${API_URL}${url}`, {
                ...options,
                headers: retryHeaders,
            });

            if (!retryResponse.ok) {
                const error = await retryResponse.json().catch(() => ({}));
                throw new Error(error?.message || 'Erro inesperado');
            }

            return retryResponse;
        } catch (error) {
            logout();
            window.location.href = '/login';
            throw error;
        }
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error?.message || 'Erro inesperado');
    }

    return response;
}
import type { LoginCredentials, LoginResponse } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/autenticacao/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData?.message || 'Falha no login. Verifique suas credenciais.'
    );
  }

  const data: LoginResponse = await response.json();

  localStorage.setItem(TOKEN_KEY, data.access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);

  return data;
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export async function refreshToken() {
  const currentRefreshToken = getRefreshToken();

  if (!currentRefreshToken) {
    throw new Error('Refresh token ausente');
  }

  const response = await fetch(`${API_URL}/autenticacao/refresh`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${currentRefreshToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    logout();
    throw new Error('Sessão expirada');
  }

  const data = await response.json();

  localStorage.setItem(TOKEN_KEY, data.access_token);

  if (data.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
  }

  return data.access_token;
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}
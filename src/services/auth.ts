import type { LoginCredentials, LoginResponse } from '../types/auth';

const API_URL = 'https://pet-manager-api.geia.vip';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/autenticacao/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.message || 'Falha no login. Verifique suas credenciais.');
  }

  const data: LoginResponse = await response.json();
  return data;
}

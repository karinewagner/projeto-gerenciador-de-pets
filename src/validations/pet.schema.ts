import { z } from 'zod';

export const petSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(2, 'Nome deve ter pelo menos 2 caracteres')
        .max(50, 'Nome deve ter no máximo 50 caracteres'),

    raca: z
        .string()
        .trim()
        .min(2, 'Raça deve ter pelo menos 2 caracteres'),

    idade: z
        .number()
        .int('Idade deve ser um número inteiro')
        .min(0, 'Idade não pode ser negativa')
        .max(30, 'Idade inválida'),
});

import { z } from 'zod';

function onlyNumbers(value: string) {
    return value.replace(/\D/g, '');
}

function isValidCPF(cpf: string): boolean {
    const cleaned = onlyNumbers(cpf);

    if (cleaned.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += Number(cleaned[i]) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) firstDigit = 0;
    if (firstDigit !== Number(cleaned[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += Number(cleaned[i]) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) secondDigit = 0;

    return secondDigit === Number(cleaned[10]);
}

export const tutorSchema = z.object({
    nome: z
        .string()
        .trim()
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),

    cpf: z
        .string()
        .transform(onlyNumbers)
        .refine((cpf) => cpf.length === 11, {
            message: 'CPF deve ter 11 dígitos, somente números',
        })
        .refine(isValidCPF, {
            message: 'CPF inválido',
        }),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email('Email inválido')
        .max(150, 'Email muito longo'),

    telefone: z
        .string()
        .transform(onlyNumbers)
        .refine((phone) => phone.length === 11 || phone.length === 12, {
            message: 'Telefone inválido, incluir DDD, somente números',
        }),

    endereco: z
        .string()
        .trim()
        .min(5, 'Endereço muito curto')
        .max(255, 'Endereço muito longo'),
});

export type TutorFormData = z.infer<typeof tutorSchema>;

import { describe, it, expect } from 'vitest';
import { maskCPF, maskPhone, maskEmail } from './masks';

describe('maskCPF', () => {
    it('retorna "-" quando CPF não é informado', () => {
        expect(maskCPF()).toBe('-');
        expect(maskCPF('')).toBe('-');
    });

    it('retorna máscara padrão quando CPF tem tamanho inválido', () => {
        expect(maskCPF('123')).toBe('***.***.***-**');
        expect(maskCPF('1234567890')).toBe('***.***.***-**');
    });

    it('mascara corretamente um CPF válido', () => {
        expect(maskCPF('12345678901')).toBe('123.***.***-01');
        expect(maskCPF(12345678901)).toBe('123.***.***-01');
    });

    it('remove caracteres não numéricos antes de aplicar a máscara', () => {
        expect(maskCPF('123.456.789-01')).toBe('123.***.***-01');
    });
});

describe('maskPhone', () => {
    it('retorna "-" quando telefone não é informado', () => {
        expect(maskPhone()).toBe('-');
        expect(maskPhone('')).toBe('-');
    });

    it('retorna máscara padrão quando telefone tem menos de 10 dígitos', () => {
        expect(maskPhone('12345')).toBe('(**) *****-****');
    });

    it('mascara corretamente um telefone válido', () => {
        expect(maskPhone('11987654321')).toBe('(11) *****-4321');
    });

    it('remove caracteres não numéricos antes de aplicar a máscara', () => {
        expect(maskPhone('(11) 98765-4321')).toBe('(11) *****-4321');
    });
});

describe('maskEmail', () => {
    it('retorna "-" quando email não é informado', () => {
        expect(maskEmail()).toBe('-');
        expect(maskEmail('')).toBe('-');
    });

    it('retorna "***@***" quando email não possui domínio', () => {
        expect(maskEmail('emailsemarroba')).toBe('***@***');
    });

    it('mascara corretamente um email válido', () => {
        expect(maskEmail('joao.silva@email.com')).toBe('jo***@email.com');
    });
});

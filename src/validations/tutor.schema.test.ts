import { describe, it, expect } from 'vitest';
import { tutorSchema } from './tutor.schema';

describe('tutorSchema', () => {
    it('deve aceitar dados válidos', () => {
        const validData = {
            nome: 'João da Silva',
            cpf: '529.982.247-25',
            email: 'JOAO@EMAIL.COM',
            telefone: '(11) 98765-4321',
            endereco: 'Rua das Flores, 123',
        };

        const result = tutorSchema.parse(validData);

        expect(result.nome).toBe('João da Silva');
        expect(result.cpf).toBe('52998224725');
        expect(result.email).toBe('joao@email.com');
        expect(result.telefone).toBe('11987654321');
        expect(result.endereco).toBe('Rua das Flores, 123');
    });

    it('deve rejeitar nome muito curto', () => {
        const invalidData = {
            nome: 'Jo',
            cpf: '52998224725',
            email: 'joao@email.com',
            telefone: '11987654321',
            endereco: 'Rua A',
        };

        expect(() => tutorSchema.parse(invalidData)).toThrow(
            'Nome deve ter pelo menos 3 caracteres'
        );
    });

    it('deve rejeitar CPF com quantidade inválida de dígitos', () => {
        const invalidData = {
            nome: 'João da Silva',
            cpf: '123',
            email: 'joao@email.com',
            telefone: '11987654321',
            endereco: 'Rua das Flores, 123',
        };

        expect(() => tutorSchema.parse(invalidData)).toThrow(
            'CPF deve ter 11 dígitos, somente números'
        );
    });

    it('deve rejeitar CPF inválido', () => {
        const invalidData = {
            nome: 'João da Silva',
            cpf: '111.111.111-11',
            email: 'joao@email.com',
            telefone: '11987654321',
            endereco: 'Rua das Flores, 123',
        };

        expect(() => tutorSchema.parse(invalidData)).toThrow(
            'CPF inválido'
        );
    });

    it('deve rejeitar email inválido', () => {
        const invalidData = {
            nome: 'João da Silva',
            cpf: '52998224725',
            email: 'email-invalido',
            telefone: '11987654321',
            endereco: 'Rua das Flores, 123',
        };

        expect(() => tutorSchema.parse(invalidData)).toThrow(
            'Email inválido'
        );
    });

    it('deve rejeitar telefone sem DDD ou com tamanho inválido', () => {
        const invalidData = {
            nome: 'João da Silva',
            cpf: '52998224725',
            email: 'joao@email.com',
            telefone: '987654321',
            endereco: 'Rua das Flores, 123',
        };

        expect(() => tutorSchema.parse(invalidData)).toThrow(
            'Telefone inválido, incluir DDD, somente números'
        );
    });

    it('deve rejeitar endereço muito curto', () => {
        const invalidData = {
            nome: 'João da Silva',
            cpf: '52998224725',
            email: 'joao@email.com',
            telefone: '11987654321',
            endereco: 'Rua',
        };

        expect(() => tutorSchema.parse(invalidData)).toThrow(
            'Endereço muito curto'
        );
    });
});

import { describe, it, expect } from 'vitest';
import { petSchema } from './pet.schema';

describe('petSchema', () => {
    it('deve aceitar dados válidos', () => {
        const validData = {
            nome: 'Rex',
            raca: 'Labrador',
            idade: 3,
        };

        expect(() => petSchema.parse(validData)).not.toThrow();
    });

    it('deve rejeitar nome com menos de 2 caracteres', () => {
        const invalidData = {
            nome: 'R',
            raca: 'Vira-lata',
            idade: 2,
        };

        expect(() => petSchema.parse(invalidData)).toThrow(
            'Nome deve ter pelo menos 2 caracteres'
        );
    });

    it('deve rejeitar raça com menos de 2 caracteres', () => {
        const invalidData = {
            nome: 'Rex',
            raca: 'A',
            idade: 2,
        };

        expect(() => petSchema.parse(invalidData)).toThrow(
            'Raça deve ter pelo menos 2 caracteres'
        );
    });

    it('deve rejeitar idade negativa', () => {
        const invalidData = {
            nome: 'Rex',
            raca: 'Labrador',
            idade: -1,
        };

        expect(() => petSchema.parse(invalidData)).toThrow(
            'Idade não pode ser negativa'
        );
    });

    it('deve rejeitar idade que não seja inteira', () => {
        const invalidData = {
            nome: 'Rex',
            raca: 'Labrador',
            idade: 2.5,
        };

        expect(() => petSchema.parse(invalidData)).toThrow(
            'Idade deve ser um número inteiro'
        );
    });

    it('deve remover espaços extras nos campos de texto', () => {
        const data = {
            nome: '  Rex  ',
            raca: '  Labrador ',
            idade: 3,
        };

        const result = petSchema.parse(data);
        expect(result.nome).toBe('Rex');
        expect(result.raca).toBe('Labrador');
    });
});

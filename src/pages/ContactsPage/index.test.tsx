import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactsPage } from './index.tsx';

describe('ContactsPage', () => {
    it('deve renderizar as informações principais da desenvolvedora', () => {
        render(<ContactsPage />);

        expect(screen.getByText('Karine Débora Wagner')).toBeInTheDocument();
        expect(screen.getByText('Desenvolvedora Full Stack')).toBeInTheDocument();

        const profileImage = screen.getByRole('main').querySelector('div[style*="background-image"]');
        expect(profileImage).toBeInTheDocument();
        expect(profileImage?.getAttribute('style')).toContain('https://avatars.githubusercontent.com/u/85067968?v=4');
    });

    it('deve renderizar as seções "Sobre Mim" e "Sobre o Projeto"', () => {
        render(<ContactsPage />);

        expect(screen.getByRole('heading', { name: /sobre mim/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /sobre o projeto/i })).toBeInTheDocument();
        expect(screen.getByText(/projeto foi desenvolvido como parte da prova prática/i)).toBeInTheDocument();
    });

    it('deve renderizar os links de redes sociais com os endereços corretos', () => {
        render(<ContactsPage />);

        const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
        const githubLink = screen.getByRole('link', { name: /github/i });

        expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/karinedwagner/');
        expect(githubLink).toHaveAttribute('href', 'https://github.com/karinewagner');

        expect(linkedinLink).toHaveAttribute('target', '_blank');
        expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');

        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('deve exibir os ícones correspondentes de cada link', () => {
        render(<ContactsPage />);

        expect(screen.getByText('link')).toBeInTheDocument();
        expect(screen.getByText('terminal')).toBeInTheDocument();
    });
});
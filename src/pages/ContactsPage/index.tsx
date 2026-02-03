export function ContactsPage() {
    const links = [
        {
            label: 'LinkedIn',
            icon: 'link',
            href: 'https://www.linkedin.com/in/karinedwagner/'
        },
        {
            label: 'GitHub',
            icon: 'terminal',
            href: 'https://github.com/karinewagner'
        },
    ];

    return (
        <>
            <main className="flex justify-center py-10 px-4 md:px-10 lg:px-40">
                <div className="max-w-[960px] w-full space-y-8">
                    <section className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border">
                        <div className="flex flex-col items-center gap-4">
                            <div
                                className="w-40 h-40 rounded-full bg-cover bg-center ring-4 ring-primary/10"
                                style={{
                                    backgroundImage:
                                        'url(https://avatars.githubusercontent.com/u/85067968?v=4)',
                                }}
                            />

                            <h1 className="text-[28px] font-bold text-center">
                                Karine Débora Wagner
                            </h1>

                            <p className="text-primary font-semibold">
                                Desenvolvedora Full Stack
                            </p>

                            <p className="text-center text-slate-500 dark:text-slate-400 max-w-xl">
                                Apaixonada por criar soluções tecnológicas que geram impacto social
                                positivo e promovem o bem-estar.
                            </p>
                        </div>
                    </section>
                    <section className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">person</span>
                            <h2 className="text-xl font-bold">Sobre Mim</h2>
                        </div>
                        <p className="mb-4 text-justify text-slate-700 dark:text-slate-300">
                            Sou desenvolvedora Full Stack com foco em soluções eficientes, bem estruturadas
                            e orientadas à resolução de problemas reais. Tenho experiência no desenvolvimento
                            de aplicações web modernas, utilizando tecnologias consolidadas do mercado e boas
                            práticas de engenharia de software.

                            Tenho interesse em projetos que gerem impacto positivo, especialmente aqueles
                            voltados ao serviço público, inovação e melhoria da experiência do usuário.
                            Busco sempre escrever código limpo, manutenível e alinhado às necessidades do negócio.
                        </p>
                    </section>
                    <section className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm border">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary">code</span>
                            <h2 className="text-xl font-bold">Sobre o Projeto</h2>
                        </div>
                        <p className="mb-4 text-justify text-slate-700 dark:text-slate-300">
                            Este projeto foi desenvolvido como parte da prova prática do processo seletivo
                            para o cargo de Analista de Tecnologia da Informação – Perfil Engenheiro da Computação
                            (Sênior), destinado à formação de cadastro de reserva para contratação temporária
                            de excepcional interesse público.

                            A aplicação tem como objetivo demonstrar competências técnicas, organização de código,
                            uso de boas práticas de desenvolvimento, validação de dados e integração entre frontend
                            e backend, simulando um cenário real de aplicação governamental.

                            O desenvolvimento considerou critérios como clareza, usabilidade, escalabilidade e
                            manutenibilidade, refletindo os requisitos esperados para atuação em sistemas de
                            interesse público.
                        </p>
                    </section>
                    <section className="flex flex-col items-center py-8">
                        <h3 className="font-bold text-lg mb-6">Vamos nos conectar?</h3>

                        <div className="flex gap-6">
                            {links.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col items-center gap-2"
                                >
                                    <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border shadow-md group-hover:bg-primary group-hover:text-white transition">
                                        <span className="material-symbols-outlined text-2xl">
                                            {item.icon}
                                        </span>
                                    </div>
                                    <span className="text-sm group-hover:text-primary transition">
                                        {item.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </section>
                </div>
            </main></>
    );
}
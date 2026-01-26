export function LoginPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#1b170d] dark:text-[#f3efe7] min-h-screen flex flex-col">
      <main className="flex-grow flex overflow-hidden">
        <div className="hidden lg:flex lg:w-1/2 relative bg-center bg-cover" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuB1GkB4F8v68_Nqsf7gGACbfzUoaIZH7hO-a9ErAiAzqgRdwWVXAkBwtacrbQ3Z4qrQKeQYsMwG4l87n0KY2_vpMHmTk2HcLwZEqzbAYbpwrvlLZ2MNVdkRjxyoyuuE-g11_WcgvrP12MRZ5cdsN5Gmxp-sA1nAgmxLFDxkAhottdBFJl0N6MWTAD87lFDDj-5by9bERm5Ncsb4BWldLYgJQL00Oc4jaV6A6g3j6sogokljO4QiPd7MgyrO9feigXtLD0X9h5PmqQ0")` }}>
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
          <div className="max-w-[480px] w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2 text-left">
              <h1 className="text-[#1b170d] dark:text-[#f3efe7] text-3xl font-black leading-tight tracking-[-0.033em]">
                Bem-vindo
              </h1>
              <p className="text-[#9a804c] dark:text-[#e7dfcf] text-base font-normal leading-normal">
                Ajude-nos a trazê-los para casa. Seus esforços fazem a diferença para reunir pets com suas famílias.
              </p>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col w-full">
                <label className="flex flex-col w-full">
                  <p className="text-[#1b170d] dark:text-[#f3efe7] text-base font-medium leading-normal pb-2">Usuário</p>
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b170d] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e7dfcf] dark:border-[#4a412c] bg-background-light dark:bg-[#2c2415] focus:border-primary h-14 placeholder:text-[#9a804c] p-[15px] text-base font-normal leading-normal" placeholder="Digite seu usuário" type="text" />
                </label>
              </div>
              <div className="flex flex-col w-full">
                <label className="flex flex-col w-full">
                  <div className="flex justify-between items-center pb-2">
                    <p className="text-[#1b170d] dark:text-[#f3efe7] text-base font-medium leading-normal">Senha</p>
                  </div>
                  <div className="flex w-full flex-1 items-stretch rounded-xl">
                    <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b170d] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#e7dfcf] dark:border-[#4a412c] bg-background-light dark:bg-[#2c2415] focus:border-primary h-14 placeholder:text-[#9a804c] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal" placeholder="Digite sua senha" type="password" />
                    <div className="text-[#9a804c] flex border border-[#e7dfcf] dark:border-[#4a412c] bg-background-light dark:bg-[#2c2415] items-center justify-center pr-[15px] rounded-r-xl border-l-0 cursor-pointer">
                      <span className="material-symbols-outlined">visibility</span>
                    </div>
                  </div>
                </label>
              </div>
              <button className="mt-4 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-[#1b170d] text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors" type="submit">
                <span className="truncate">Entrar</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

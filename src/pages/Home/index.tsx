import { FilterButtons } from '../../components/FilterButtons';
import { Pagination } from '../../components/Pagination';
import { PetCard } from '../../components/PetCard';
import { SearchBar } from '../../components/SearchBar';
import { pets } from '../../utils/pets';

export function HomePage() {
  return (
    <main className="flex flex-1 justify-center pt-8">
      <div className="layout-content-container flex flex-col max-w-[1200px] flex-1 px-4 md:px-10">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-[#1b170d] dark:text-white tracking-tight text-[32px] md:text-[42px] font-bold leading-tight pb-3">
            Ajude a trazê-los para casa
          </h1>
          <p className="text-[#9a804c] dark:text-[#c2ae85] text-lg max-w-2xl">
            Juntos podemos reunir companheiros perdidos com suas famílias. Procure nas listagens ou relate um animal desaparecido em sua região.
          </p>
        </div>

        <SearchBar />
        <FilterButtons />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {pets.content.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>

        <Pagination />
      </div>
    </main>
  );
}

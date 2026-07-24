import { usePokemon } from "../hooks/usePokemon";
import { useState } from "react";
import SearchBar from "../components/common/SearchBar";
import PokemonGrid from "../components/pokemon/PokemonGrid";
import PokemonSkeleton from "../components/pokemon/PokemonSkeleton";

function Pokemon() {
  const { data, isLoading, error } = usePokemon();
  const [search, setSearch] = useState("");
  const filteredPokemons = data?.filter((pokemon) =>
  pokemon.name.toLowerCase().includes(search.toLowerCase())
);

  if (isLoading) {
    return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Pokémon
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {Array.from({ length: 8 }).map((_, index) => (
          <PokemonSkeleton key={index} />
        ))}

      </div>

    </div>
  );
  }

  if (error) {
    return <h2>Error al cargar Pokémon.</h2>;
  }


  return (
    
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-8">
        Pokémon
      </h1>
            <SearchBar
        value={search}
        onChange={setSearch}
        />
        {filteredPokemons.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No se encontró ningún Pokémon.
        </p>
      ) : (
        <PokemonGrid pokemons={filteredPokemons} />
      )}

    </div>
  );
}

export default Pokemon;
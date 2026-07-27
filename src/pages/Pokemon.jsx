import { useEffect, useState } from "react";

import { usePokemon } from "../hooks/usePokemon";

import SearchBar from "../components/common/SearchBar";
import PokemonGrid from "../components/pokemon/PokemonGrid";
import PokemonSkeleton from "../components/pokemon/PokemonSkeleton";

import { savePokemonsToStorage } from "../utils/pokemonStorage";
import { usePokemonSearch } from "../hooks/usePokemonSearch";

function Pokemon() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const {
  data: searchedPokemons = [],
  isFetching: isSearching,
  isError: searchError,
} = usePokemonSearch(search);
  const {
    data,
    isLoading,
    error,
    isFetching,
  } = usePokemon(page);

  const pokemons = data?.pokemons || [];

  const totalPokemons = data?.count || 0;

  const totalPages = Math.ceil(
    totalPokemons / 20
  );

  // Guardar Pokémon en localStorage
  useEffect(() => {
    if (pokemons.length > 0) {
      const pokemonsToSave = pokemons.map(
        (pokemon) => ({
          id: pokemon.id,
          name: pokemon.name,

          image:
            pokemon.sprites.other[
              "official-artwork"
            ].front_default,
        })
      );

      savePokemonsToStorage(pokemonsToSave);
    }
  }, [pokemons]);


  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">
          Pokémon
        </h1>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {Array.from({ length: 8 }).map(
            (_, index) => (
              <PokemonSkeleton key={index} />
            )
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <h2 className="text-center text-red-500 mt-10">
        Error al cargar Pokémon.
      </h2>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Pokémon
        </h1>

        <p className="text-gray-500 mt-2">
          Página {page} de {totalPages}
        </p>

      </div>

      <SearchBar
  value={search}
  onChange={setSearch}
/>

{/* BÚSQUEDA GLOBAL */}
{search.trim().length >= 2 ? (
  <div className="mt-8">

    {/* Cargando búsqueda */}
    {isSearching && (
      <p className="text-center text-gray-500 mt-10">
        Buscando Pokémon...
      </p>
    )}

    {/* Sin resultados */}
    {!isSearching &&
      !searchError &&
      searchedPokemons.length === 0 && (
        <p className="text-center text-red-500 mt-10">
          No se encontró ningún Pokémon.
        </p>
      )}

    {/* Resultados */}
    {!isSearching &&
      searchedPokemons.length > 0 && (
        <>
          <p className="text-gray-500 mb-6">
            {searchedPokemons.length} resultado(s) para "{search}"
          </p>

          <PokemonGrid
            pokemons={searchedPokemons}
          />
        </>
      )}

    {/* Error */}
    {searchError && !isSearching && (
      <p className="text-center text-red-500 mt-10">
        Ocurrió un error durante la búsqueda.
      </p>
    )}

  </div>
) : (
  <PokemonGrid pokemons={pokemons} />
)}

      {/* PAGINACIÓN */}
      <div
        className="
          flex
          justify-center
          items-center
          gap-4
          mt-12
        "
      >

        <button
          onClick={() =>
            setPage((current) =>
              Math.max(current - 1, 1)
            )
          }
          disabled={page === 1}
          className="
            px-5
            py-3
            rounded-xl
            bg-gray-800
            text-white
            hover:bg-gray-700
            transition
            disabled:bg-gray-300
            disabled:cursor-not-allowed
          "
        >
          ← Anterior
        </button>

        <span
          className="
            px-5
            py-3
            bg-white
            shadow
            rounded-xl
            font-semibold
          "
        >
          {page}
        </span>

        <button
          onClick={() =>
            setPage((current) =>
              Math.min(
                current + 1,
                totalPages
              )
            )
          }
          disabled={page === totalPages}
          className="
            px-5
            py-3
            rounded-xl
            bg-blue-600
            text-white
            hover:bg-blue-700
            transition
            disabled:bg-gray-300
            disabled:cursor-not-allowed
          "
        >
          Siguiente →
        </button>

      </div>

      {isFetching && (
        <p className="text-center text-gray-400 mt-4">
          Cargando nueva página...
        </p>
      )}

    </div>
  );
}

export default Pokemon;
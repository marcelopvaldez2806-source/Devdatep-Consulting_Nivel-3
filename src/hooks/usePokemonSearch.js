import { useQuery } from "@tanstack/react-query";
import { searchPokemons } from "../api/pokemonApi";

export function usePokemonSearch(search) {
  return useQuery({
    queryKey: ["pokemon-search", search],

    queryFn: () =>
      searchPokemons(search),

    enabled: search.trim().length >= 2,

    retry: false,
  });
}
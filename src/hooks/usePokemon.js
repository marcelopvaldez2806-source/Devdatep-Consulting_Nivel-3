import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../api/pokemonApi";

export const usePokemon = (page) => {
  return useQuery({
    queryKey: ["pokemon", page],

    queryFn: () => getPokemons(page),

    placeholderData: (previousData) => previousData,
  });
};
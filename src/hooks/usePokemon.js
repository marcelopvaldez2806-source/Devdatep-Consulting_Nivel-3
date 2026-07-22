import { useQuery } from "@tanstack/react-query";
import { getPokemons } from "../api/pokemonApi";

export const usePokemon = () => {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemons,
  });
};
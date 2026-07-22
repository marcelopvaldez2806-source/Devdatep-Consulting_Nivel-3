import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "../api/pokemonApi";

export const usePokemonDetail = (id) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonById(id),
    enabled: !!id,
  });
};
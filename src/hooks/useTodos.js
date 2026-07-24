import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todosApi";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
    staleTime: Infinity,
  });
}
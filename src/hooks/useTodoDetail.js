import { useQuery } from "@tanstack/react-query";
import { getTodoById } from "../api/todosApi";

export function useTodoDetail(id) {
  return useQuery({
    queryKey: ["todo", String(id)],
    queryFn: () => getTodoById(id),
    enabled: Boolean(id),
  });
}
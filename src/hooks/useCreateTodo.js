import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todosApi";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,

    onSuccess: (newTodo) => {
      queryClient.setQueryData(
        ["todos"],
        (oldTodos = []) => [
          newTodo,
          ...oldTodos,
        ]
      );
    },
  });
}
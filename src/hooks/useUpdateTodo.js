import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todosApi";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,

    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(
        ["todos"],
        (oldTodos = []) =>
          oldTodos.map((todo) =>
            String(todo.id) === String(updatedTodo.id)
              ? updatedTodo
              : todo
          )
      );

      queryClient.setQueryData(
        ["todo", String(updatedTodo.id)],
        updatedTodo
      );
    },
  });
}
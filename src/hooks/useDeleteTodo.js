import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/todosApi";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    onSuccess: (deletedId) => {
      queryClient.setQueryData(
        ["todos"],
        (oldTodos = []) =>
          oldTodos.filter(
            (todo) =>
              String(todo.id) !== String(deletedId)
          )
      );
    },
  });
}
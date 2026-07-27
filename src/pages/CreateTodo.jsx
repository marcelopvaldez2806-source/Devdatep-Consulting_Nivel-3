import { useNavigate } from "react-router-dom";

import TodoForm from "../components/todos/TodoForm";
import { useCreateTodo } from "../hooks/useCreateTodo";

function CreateTodo() {
  const navigate = useNavigate();
  const mutation = useCreateTodo();

  const handleCreate = (data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        alert("Tarea creada correctamente");
        navigate("/todos");
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Crear Tarea
      </h1>

      <TodoForm
        onSubmit={handleCreate}
        isPending={mutation.isPending}
        submitText="Crear tarea"
      />

      {mutation.isError && (
        <p className="text-red-500 mt-4">
          Ocurrió un error al crear la tarea.
        </p>
      )}
    </div>
  );
}

export default CreateTodo;
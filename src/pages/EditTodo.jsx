import {
  useNavigate,
  useParams,
} from "react-router-dom";

import TodoForm from "../components/todos/TodoForm";

import { useTodoDetail } from "../hooks/useTodoDetail";
import { useUpdateTodo } from "../hooks/useUpdateTodo";

function EditTodo() {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    data: todo,
    isLoading,
  } = useTodoDetail(id);

  const mutation = useUpdateTodo();

  if (isLoading) {
    return <h2 className="text-center mt-10">Cargando...</h2>;
  }

  const handleUpdate = (data) => {
    mutation.mutate(
      {
        id,
        data,
      },
      {
        onSuccess: () => {
          alert("Tarea actualizada");

          navigate(`/todos/${id}`);
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Editar tarea
      </h1>

      <TodoForm
        initialData={todo}
        onSubmit={handleUpdate}
        isPending={mutation.isPending}
        submitText="Guardar cambios"
      />

    </div>
  );
}

export default EditTodo;
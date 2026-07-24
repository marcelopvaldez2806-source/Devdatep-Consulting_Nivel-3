import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useTodoDetail } from "../hooks/useTodoDetail";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";

function TodoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: todo,
    isLoading,
    error,
  } = useTodoDetail(id);

  const deleteMutation = useDeleteTodo();
  const updateMutation = useUpdateTodo();

  if (isLoading) {
    return <h2 className="text-center mt-10">Cargando...</h2>;
  }

  if (error || !todo) {
    return (
      <h2 className="text-red-500 text-center mt-10">
        Tarea no encontrada.
      </h2>
    );
  }

  const toggleCompleted = () => {
    updateMutation.mutate({
      id,
      data: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  const handleDelete = () => {
    if (!window.confirm("¿Eliminar esta tarea?")) {
      return;
    }

    deleteMutation.mutate(todo.id, {
      onSuccess: () => {
        navigate("/todos");
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8">

      <div className="bg-white shadow-lg rounded-2xl p-8">

        <p className="text-gray-400">
          Tarea #{todo.id}
        </p>

        <h1
          className={`
            text-4xl
            font-bold
            mt-4
            ${todo.completed
              ? "line-through text-gray-400"
              : ""}
          `}
        >
          {todo.title}
        </h1>

        <p className="mt-5">
          Usuario: {todo.userId}
        </p>

        <p className="mt-2">
          Estado:
          <strong>
            {todo.completed
              ? " Completada"
              : " Pendiente"}
          </strong>
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <button
            onClick={toggleCompleted}
            className="
              bg-green-600
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            {todo.completed
              ? "Marcar pendiente"
              : "Marcar completada"}
          </button>

          <Link
            to={`/todos/${todo.id}/edit`}
            className="
              bg-yellow-500
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
            Editar
          </Link>

          <button
            onClick={handleDelete}
            className="
              bg-red-600
              text-white
              px-5
              py-3
              rounded-xl
            "
          >
             Eliminar
          </button>

        </div>

      </div>

    </div>
  );
}

export default TodoDetail;
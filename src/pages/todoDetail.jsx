import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useTodoDetail } from "../hooks/useTodoDetail";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";

import { getPokemonsFromStorage } from "../utils/pokemonStorage";

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
    return (
      <h2 className="text-center mt-10">
        Cargando...
      </h2>
    );
  }

  if (error || !todo) {
    return (
      <h2 className="text-red-500 text-center mt-10">
        Tarea no encontrada.
      </h2>
    );
  }

  // Obtener los Pokémon guardados en localStorage
  const pokemons = getPokemonsFromStorage();

  // Buscar el Pokémon asignado a esta tarea
  const assignedPokemon = pokemons.find(
    (pokemon) =>
      Number(pokemon.id) === Number(todo.pokemonId)
  );

  // Cambiar el estado de la tarea
  const toggleCompleted = () => {
    updateMutation.mutate({
      id,
      data: {
        ...todo,
        completed: !todo.completed,
      },
    });
  };

  // Eliminar tarea
  const handleDelete = () => {
    const confirmed = window.confirm(
      "¿Seguro que deseas eliminar esta tarea?"
    );

    if (!confirmed) {
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

        {/* ID */}
        <p className="text-gray-400">
          Tarea #{todo.id}
        </p>

        {/* Título */}
        <h1
          className={`
            text-4xl
            font-bold
            mt-4
            ${
              todo.completed
                ? "line-through text-gray-400"
                : ""
            }
          `}
        >
          {todo.title}
        </h1>

        {/* Usuario */}
        <p className="mt-5">
          <strong>Usuario:</strong> {todo.userId}
        </p>

        {/* Estado */}
        <p className="mt-2">
          <strong>Estado:</strong>

          <span
            className={
              todo.completed
                ? "text-green-600 font-semibold"
                : "text-yellow-600 font-semibold"
            }
          >
            {todo.completed
              ? " Completada"
              : " Pendiente"}
          </span>
        </p>

        {/* Pokémon asignado */}
        {assignedPokemon ? (
          <div
            className="
              mt-8
              border
              border-gray-200
              rounded-2xl
              p-5
              bg-gray-50
            "
          >
            <p className="font-semibold text-lg">
              Pokémon asignado
            </p>

            <div className="flex items-center gap-5 mt-4">

              <img
                src={assignedPokemon.image}
                alt={assignedPokemon.name}
                className="
                  w-24
                  h-24
                  object-contain
                "
              />

              <div>

                <h2 className="text-2xl font-bold capitalize">
                  {assignedPokemon.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  #
                  {assignedPokemon.id
                    .toString()
                    .padStart(3, "0")}
                </p>

              </div>

            </div>
          </div>
        ) : (
          <div
            className="
              mt-8
              border
              border-gray-200
              rounded-xl
              p-4
              text-gray-500
            "
          >
            No hay ningún Pokémon asignado a esta tarea.
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-wrap gap-4 mt-8">

          {/* COMPLETAR */}
          <button
            onClick={toggleCompleted}
            disabled={updateMutation.isPending}
            className="
              bg-green-600
              hover:bg-green-700
              text-white
              px-5
              py-3
              rounded-xl
              transition
              disabled:bg-gray-400
              disabled:cursor-not-allowed
            "
          >
            {updateMutation.isPending
              ? "Actualizando..."
              : todo.completed
              ? "Marcar pendiente"
              : "Marcar completada"}
          </button>

          {/* EDITAR */}
          <Link
            to={`/todos/${todo.id}/edit`}
            className="
              bg-yellow-500
              hover:bg-yellow-600
              text-white
              px-5
              py-3
              rounded-xl
              transition
            "
          >
            Editar
          </Link>

          {/* ELIMINAR */}
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-5
              py-3
              rounded-xl
              transition
              disabled:bg-gray-400
              disabled:cursor-not-allowed
            "
          >
            {deleteMutation.isPending
              ? "Eliminando..."
              : "Eliminar"}
          </button>

          {/* VOLVER */}
          <Link
            to="/todos"
            className="
              bg-gray-600
              hover:bg-gray-700
              text-white
              px-5
              py-3
              rounded-xl
              transition
            "
          >
            Volver
          </Link>

        </div>

        {/* Error al actualizar */}
        {updateMutation.isError && (
          <p className="text-red-500 mt-5">
            Ocurrió un error al actualizar la tarea.
          </p>
        )}

        {/* Error al eliminar */}
        {deleteMutation.isError && (
          <p className="text-red-500 mt-5">
            Ocurrió un error al eliminar la tarea.
          </p>
        )}

      </div>

    </div>
  );
}

export default TodoDetail;
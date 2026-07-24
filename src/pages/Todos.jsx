import { Link } from "react-router-dom";

import { useTodos } from "../hooks/useTodos";

function Todos() {
  const {
    data: todos = [],
    isLoading,
    error,
  } = useTodos();

  if (isLoading) {
    return <h2 className="text-center mt-10">Cargando...</h2>;
  }

  if (error) {
    return (
      <h2 className="text-red-500 text-center mt-10">
        Error al cargar tareas.
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Tareas
          </h1>

          <p className="text-gray-500 mt-2">
            CRUD con JSONPlaceholder
          </p>
        </div>

        <Link
          to="/todos/create"
          className="
            bg-green-600
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          + Nueva tarea
        </Link>
      </div>

      {todos.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          No hay tareas creadas.
        </p>
      ) : (
        <div className="space-y-4">

          {todos.map((todo) => (
            <div
              key={todo.id}
              className="
                bg-white
                shadow
                rounded-xl
                p-5
                flex
                justify-between
                items-center
              "
            >
              <div>
                <h2
                  className={`
                    text-lg
                    font-bold
                    ${todo.completed
                      ? "line-through text-gray-400"
                      : ""}
                  `}
                >
                  {todo.title}
                </h2>

                <p className="text-sm text-gray-500">
                  Usuario {todo.userId}
                </p>
              </div>

              <Link
                to={`/todos/${todo.id}`}
                className="text-blue-600 font-semibold"
              >
                Ver detalle →
              </Link>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Todos;
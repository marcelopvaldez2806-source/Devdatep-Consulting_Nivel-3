import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { todoSchema } from "../../schemas/todoSchema";
import { useUsers } from "../../hooks/useUsers";
import { getAvailablePokemons } from "../../utils/pokemonStorage";


function TodoForm({
  initialData = null,
  onSubmit,
  isPending = false,
  submitText = "Guardar",
}) {
  const pokemons = getAvailablePokemons(
  initialData?.pokemonId
);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      userId: "",
      pokemonId: "",
    },
  });

  const {
    data: users,
    isLoading: usersLoading,
  } = useUsers();

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title ?? "",
        userId: String(initialData.userId ?? ""),
        pokemonId: String(initialData.pokemonId ?? ""),
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit({
      title: data.title,
      userId: Number(data.userId),
      pokemonId: Number(data.pokemonId),
      completed: initialData?.completed ?? false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
    >
      {/* TAREA */}
      <div>
        <label className="block font-semibold mb-2">
          Tarea
        </label>

        <input
          {...register("title")}
          className="w-full border rounded-lg p-3"
          placeholder="Ej. Revisar documentación"
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* USUARIO */}
      <div>
        <label className="block font-semibold mb-2">
          Usuario
        </label>

        <select
          {...register("userId")}
          className="w-full border rounded-lg p-3"
          disabled={usersLoading}
        >
          <option value="">
            {usersLoading
              ? "Cargando usuarios..."
              : "Seleccione un usuario"}
          </option>

          {users?.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {errors.userId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.userId.message}
          </p>
        )}
      </div>

      {/* POKÉMON */}
      <div>
        <label className="block font-semibold mb-2">
          Pokémon asignado
        </label>

        <select
          {...register("pokemonId")}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            Seleccione un Pokémon
          </option>

          {pokemons.map((pokemon) => (
            <option
              key={pokemon.id}
              value={pokemon.id}
            >
              #{pokemon.id.toString().padStart(3, "0")} - {pokemon.name}
            </option>
          ))}
        </select>

        {errors.pokemonId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.pokemonId.message}
          </p>
        )}

        {pokemons.length === 0 && (
          <p className="text-yellow-600 text-sm mt-2">
            Primero entra a la sección Pokémon para cargar los 30 Pokémon en localStorage.
          </p>
        )}
      </div>

      {/* BOTÓN */}
      <button
        type="submit"
        disabled={isPending}
        className="
          bg-blue-600
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-blue-700
          transition
          disabled:bg-gray-400
          disabled:cursor-not-allowed
        "
      >
        {isPending ? "Procesando..." : submitText}
      </button>
    </form>
  );
}

export default TodoForm;
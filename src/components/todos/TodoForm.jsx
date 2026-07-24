import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { todoSchema } from "../../schemas/todoSchema";
import { useUsers } from "../../hooks/useUsers";

function TodoForm({
  initialData = null,
  onSubmit,
  isPending = false,
  submitText = "Guardar",
}) {
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
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      userId: Number(data.userId),
      completed: initialData?.completed ?? false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
    >
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
          <p className="text-red-500 mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-2">
          Usuario
        </label>

        <select
          {...register("userId")}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            {usersLoading
              ? "Cargando..."
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
          <p className="text-red-500 mt-1">
            {errors.userId.message}
          </p>
        )}
      </div>

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
          disabled:bg-gray-400
        "
      >
        {isPending ? "Procesando..." : submitText}
      </button>
    </form>
  );
}

export default TodoForm;
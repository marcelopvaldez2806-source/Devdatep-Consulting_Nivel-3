import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { postSchema } from "../../schemas/postSchema";
import { useUsers } from "../../hooks/useUsers";

function PostForm({
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
    resolver: zodResolver(postSchema),

    defaultValues: {
      title: "",
      body: "",
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
        body: initialData.body ?? "",
        userId: String(initialData.userId ?? ""),
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      userId: Number(data.userId),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
    >

      <div>
        <label className="block mb-2 font-semibold">
          Título
        </label>

        <input
          {...register("title")}
          placeholder="Ingrese el título"
          className="
            w-full
            border
            border-gray-300
            rounded-lg
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />

        {errors.title && (
          <p className="text-red-500 text-sm mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Contenido
        </label>

        <textarea
          rows="6"
          {...register("body")}
          placeholder="Escriba el contenido del post"
          className="
            w-full
            border
            border-gray-300
            rounded-lg
            p-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
          "
        />

        {errors.body && (
          <p className="text-red-500 text-sm mt-1">
            {errors.body.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold">
          Usuario
        </label>

        <select
          {...register("userId")}
          disabled={usersLoading}
          className="
            w-full
            border
            border-gray-300
            rounded-lg
            p-3
          "
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

export default PostForm;
import { z } from "zod";

export const todoSchema = z.object({
  title: z
    .string()
    .min(3, "La tarea debe tener al menos 3 caracteres")
    .max(100, "Máximo 100 caracteres"),

  userId: z
    .string()
    .min(1, "Seleccione un usuario"),
});
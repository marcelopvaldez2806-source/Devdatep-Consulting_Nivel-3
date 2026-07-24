import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(100, "El título no puede superar los 100 caracteres"),

  body: z
    .string()
    .min(10, "El contenido debe tener al menos 10 caracteres")
    .max(500, "El contenido no puede superar los 500 caracteres"),

  userId: z
    .string()
    .min(1, "Seleccione un usuario"),
});
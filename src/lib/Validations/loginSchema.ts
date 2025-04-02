import {z} from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export type LoginFormData = z.infer<typeof loginSchema>
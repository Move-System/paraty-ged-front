import {z} from "zod";

export const resetPassSchema = z.object({
    email: z.string()
        .min(1, { message: 'E-mail é obrigatório' })
        .email({ message: 'E-mail inválido' }),
    newPassword: z.string()
        .min(1, { message: 'Senha é obrigatória' })
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword']
})

export type PasswordResetData = z.infer<typeof resetPassSchema>;
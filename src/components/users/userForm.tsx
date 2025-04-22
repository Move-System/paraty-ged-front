import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser} from "@/services/userService";
import { useEffect } from "react";


type Props = {
    onSuccess: () => void;
    defaultValues?: Partial<CreateUserDTO>;
    isEditing?: boolean;
    userId?: number;
}

const schema = z.object({
    name: z.string()
        .min(1, { message: 'Nome é obrigatório' }),
    email: z.string()
        .min(1, { message: 'E-mail é obrigatório' })
        .email({ message: 'E-mail inválido' }),
    password: z.string()
        .min(1, { message: 'Senha é obrigatória' })
        .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
    cargo: z.string()
        .min(1, { message: 'Cargo é obrigatório' }),
})


type CreateUserDTO = z.infer<typeof schema>;

export function UserForm({onSuccess, defaultValues, isEditing=false, userId}: Props) {
    const queryClient = useQueryClient();


    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateUserDTO>({
        resolver: zodResolver(schema),
        defaultValues: defaultValues
    });

  

    const mutation = useMutation({
        mutationFn: async (data: CreateUserDTO) => {
            if (isEditing && userId) {
                return await updateUser(userId, data);
            }
            return await createUser(data);
        },
        onSuccess: () => {
            toast.success(isEditing ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['users'] });
            onSuccess();
        },
        onError: () => {
            toast.error('Erro ao criar usuário');
        }
    });

    useEffect(() => {
        if (isEditing && userId) {
            queryClient.refetchQueries({ queryKey: ['user', userId] });
        }
    }, [isEditing, userId, queryClient]);
  

    const onSubmit = (data: CreateUserDTO) => {
        mutation.mutate(data);
    };

    return (
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <Input placeholder="Nome" {...register("name")} />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

      <Input placeholder="Email" {...register("email")} />
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

      {!isEditing && (
        <>
          <Input placeholder="Senha" type="password" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </>
      )}

      <Input placeholder="Cargo ou Perfil" {...register("cargo")} />
      {errors.cargo && <p className="text-sm text-red-500">{errors.cargo.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (isEditing ? "Salvando..." : "Criando...") : "Salvar"}
      </Button>
    </form>
    );
}

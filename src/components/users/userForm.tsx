import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Select } from '../ui/selectInput';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser } from '@/services/userService';
import { useEffect, useMemo } from 'react';

type Props = {
  onSuccess: () => void;
  defaultValues?: never;
  isEditing?: boolean;
  userId?: number;
};

const createSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  role: z.string().min(1, { message: 'Role é obrigatório' }),
  active: z.string().min(1, { message: 'Status é obrigatório' }),
});

const updateSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  email: z
    .string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string().optional(),
  role: z.string().min(1, { message: 'Role é obrigatório' }),
  active: z.string().min(1, { message: 'Status é obrigatório' }),
});

export function UserForm({ onSuccess, defaultValues, isEditing = false, userId }: Props) {
  const queryClient = useQueryClient();

  const schema = useMemo(() => (isEditing ? updateSchema : createSchema), [isEditing]);
  type FormSchema = typeof schema;
  type FormValues = z.infer<FormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
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
      toast.error('Erro ao salvar o usuário');
    },
  });

  useEffect(() => {
    if (isEditing && userId) {
      queryClient.refetchQueries({ queryKey: ['user', userId] });
    }
  }, [isEditing, userId, queryClient]);

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <Input placeholder="Nome" {...register('name')} />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

      <Input placeholder="Email" {...register('email')} />
      {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

      {!isEditing && (
        <>
          <Input placeholder="Senha" type="password" {...register('password')} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </>
      )}

      <Select
        {...register('role')}
        options={[
          { label: 'Administrador', value: 'ADMIN' },
          { label: 'Usuário', value: 'USER' },
        ]}
      />
      {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}

      <Select
        {...register('active')}
        options={[
          { label: 'Ativo', value: 'ACTIVE' },
          { label: 'Inativo', value: 'INACTIVE' },
        ]}
      />
      {errors.active && <p className="text-sm text-red-500">{errors.active.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (isEditing ? 'Salvando...' : 'Criando...') : 'Salvar'}
      </Button>
    </form>
  );
}

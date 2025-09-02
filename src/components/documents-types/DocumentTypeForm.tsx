import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { createDocumentType, updateDocumentType } from '@/services/documentTypesService';

type Props = {
  onSuccess: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: any;
  isEditing?: boolean;
  documentTypeId?: number;
};

const createSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().optional(),
});

const updateSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().optional(),
});

export function DocumentTypeForm({
  onSuccess,
  defaultValues,
  isEditing = false,
  documentTypeId,
}: Props) {
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
      if (isEditing && documentTypeId) {
        return await updateDocumentType(documentTypeId, {
          ...data,
          id: documentTypeId,
          description: data.description ?? '',
        });
      }
      return await createDocumentType({
        ...data,
        id: 0,
        description: data.description ?? '',
      });
    },
    onSuccess: () => {
      toast.success(
        isEditing
          ? 'Tipo de documento atualizado com sucesso!'
          : 'Tipo de documento criado com sucesso!',
      );
      queryClient.invalidateQueries({ queryKey: ['tiposDocumentos'] });
      onSuccess();
    },
    onError: () => {
      toast.error('Erro ao salvar o tipo de documento');
    },
  });

  useEffect(() => {
    if (isEditing && documentTypeId) {
      queryClient.refetchQueries({ queryKey: ['user', documentTypeId] });
    }
  }, [isEditing, documentTypeId, queryClient]);

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <Input placeholder="Nome" {...register('name')} />
      {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}

      <Input placeholder="Descrição" {...register('description')} />
      {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (isEditing ? 'Salvando...' : 'Criando...') : 'Salvar'}
      </Button>
    </form>
  );
}

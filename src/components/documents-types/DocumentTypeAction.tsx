'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDocumentType } from '@/services/documentTypesService';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Pencil, Trash } from 'lucide-react';
import ConfirmModal from '../ui/ConfirmModal';
import { useState } from 'react';
import EditDocumentTypeModal from './EditDocumentTypeModal';

interface Props {
  documentType: {
    id: number;
    name: string;
    description: string;
  };
}

export default function DocumentTypeAction({ documentType }: Props) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const mutation = useMutation({
    mutationFn: deleteDocumentType,
    onSuccess: () => {
      toast.success('Tipo de documento com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['tiposDocumentos'] });
    },
    onError: () => {
      toast.error('Erro ao excluir o tipo de documento');
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    mutation.mutate({ id: documentType.id });
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleEdit} variant="outline" size="icon">
        <Pencil size={16} />
      </Button>
      <Button onClick={() => setIsOpen(true)} variant="outline" size="icon">
        <Trash size={16} />
      </Button>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Deseja excluir esse tipo de documento?"
        description="Essa ação não poderá ser desfeita. Deseja realmente continuar?"
        confirmText="Sim, excluir"
        cancelText="Cancelar"
      />
      {isEditing && (
        <EditDocumentTypeModal
          isOpen={isEditing}
          onOpenChange={setIsEditing}
          documentType={documentType}
        />
      )}
    </div>
  );
}

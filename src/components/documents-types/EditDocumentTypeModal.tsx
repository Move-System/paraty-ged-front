'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { DocumentTypeForm } from './DocumentTypeForm';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  documentType: {
    id: number;
    name: string;
    description: string;
  };
}

export default function EditDocumentTypeModal({ isOpen, onOpenChange, documentType }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Tipo de Documento</DialogTitle>
        </DialogHeader>
        <DocumentTypeForm
          isEditing
          documentTypeId={documentType.id}
          defaultValues={{
            name: documentType.name,
            description: documentType.description,
          }}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { DocumentTypeForm } from './DocumentTypeForm';

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function CreateDocumentTypeModal({ isOpen, onOpenChange }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Usuário</DialogTitle>
        </DialogHeader>
        <DocumentTypeForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

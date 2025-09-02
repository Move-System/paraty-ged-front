import { useState } from 'react';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import CreateDocumentTypeModal from './CreateDocumentTypeModal';

export function DocumentTypeActionHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Tipos de Documentos</h1>
      <Button onClick={() => setIsOpen(true)}>
        <Plus size={16} />
        Novo Tipo de Documento
      </Button>
      <CreateDocumentTypeModal isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}

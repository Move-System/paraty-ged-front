'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { UserForm } from "./userForm";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user: {
    id: number;
    name: string;
    email: string;
    cargo: string;
  };
}

export default function EditUserModal({ isOpen, onOpenChange, user }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
        </DialogHeader>
        <UserForm
          isEditing
          userId={user.id}
          defaultValues={{
            name: user.name,
            email: user.email,
            cargo: user.cargo,
            password: "", // não necessário no update, mas exigido no schema
          }}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

'use client'

import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import ConfirmModal from "../ui/ConfirmModal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {inactivateUser} from '@/services/userService'
import EditUserModal from "./editUserModal";

interface Props{
    user:{
        id: number;
        name: string;
        email: string;
        cargo: string;
    }
}

export function UserActions({user}: Props){
const queryClient = useQueryClient();
const [isOpen, setIsOpen] = useState(false);
const [isEditing, setIsEditing] = useState(false);

const mutation = useMutation({
    mutationFn: inactivateUser,
    onSuccess: () => {
      toast.success('Usuário inativado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: () => {
      toast.error('Erro ao inativar usuário');
    }
  });

const handleEdit = () => {
    setIsEditing(true);
}

const handleDelete = () => {
    mutation.mutate(user.id);
    setIsOpen(false);
}


    return(
        <div className="flex items-center gap-2">
            <Button  onClick={handleEdit} variant="outline" size="icon">
                      <Pencil size={16} />
                    </Button>
            <Button  onClick={() => setIsOpen(true)} variant="outline" size="icon">
                      <Trash size={16} />
                    </Button>
        <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        title="Deseja inativar o usuário?"
        description="Essa ação não poderá ser desfeita. Deseja realmente continuar?"
        confirmText="Sim, Inativar"
        cancelText="Cancelar"
      />
      {isEditing && <EditUserModal isOpen={isEditing} onOpenChange={setIsEditing} user={user} />}
        </div>
    )

}
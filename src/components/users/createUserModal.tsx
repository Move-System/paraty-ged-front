'use client'


import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { UserForm } from "./userForm";


interface Props {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}


export default function CreateUserModal({isOpen, onOpenChange}: Props) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo Usuário</DialogTitle>
                </DialogHeader>
                <UserForm onSuccess={() => onOpenChange(false)} />
            </DialogContent>
        </Dialog>
    )
}
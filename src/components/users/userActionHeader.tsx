import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CreateUserModal from "./createUserModal";


export function UserActionHeader() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Usuários</h1>
            <Button onClick={() => setIsOpen(true)}>
                <Plus size={16} />
                Novo Usuário
            </Button>
            <CreateUserModal isOpen={isOpen} onOpenChange={setIsOpen} />
        </div>
    );
}
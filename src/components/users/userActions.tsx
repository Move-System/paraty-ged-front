import { Pencil, Trash } from "lucide-react";
import { Button } from "../ui/button";
interface Props{
    user:{
        id: number;
        name: string;
        email: string;
        role: string;
    }
}

export function UserActions({user}: Props){

const handleEdit = () => {
    console.log(`Editando usuário ${user.name}`);
}

const handleDelete = () => {
    console.log(`Deletando usuário ${user.name}`);
}


    return(
        <div className="flex items-center gap-2">
            <Button  onClick={handleEdit} variant="outline" size="icon">
                      <Pencil size={16} />
                    </Button>
            <Button  onClick={handleDelete} variant="outline" size="icon">
                      <Trash size={16} />
                    </Button>
        </div>
    )
}
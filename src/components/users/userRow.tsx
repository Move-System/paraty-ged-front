import { StatusPill } from "../ui/StatusPill"
import { UserActions } from "./userActions"

interface User{
    id: number
    name: string
    email: string
    role: string
    active: boolean    
}

export function UserRow({user}: {user: User}){
    return(
        <tr className="border-t hover:bg-slate-50 transition-colors">
            <td className="px-4 py-2">{user.name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2 ">{user.role}</td>
            <StatusPill active={user.active} />
            <td className="px-4 py-2  text-right">
                <div className="flex justify-end gap-2">
                <UserActions user={user} />
                </div>
      </td> 
        </tr>
    )
}
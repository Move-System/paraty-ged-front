import { UserRow } from './userRow';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  return (
    <table className="w-full text-sm text-left border-collapse">
      <thead className="bg-slate-900 text-slate-50">
        <tr>
          <th className="px-4 py-2">Nome</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Cargo</th>
          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2 text-right">Ações</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}

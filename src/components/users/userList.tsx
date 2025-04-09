"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "@/services/userService";
import { UserTable } from "./userTable";

export function UserList() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });

  if (isLoading) return <p>Carregando usuários...</p>;

  return <UserTable users={users} />;
}
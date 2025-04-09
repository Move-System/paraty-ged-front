interface Props {
    active: boolean
}

export function StatusPill({ active }: Props) {
  return (
    <span
      className={`inline-flex items-center px-3 mt-3 py-1 rounded-md text-sm font-medium ${
        active
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}
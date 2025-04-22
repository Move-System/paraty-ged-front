'use client'

interface Props {
    active: boolean
}

export function StatusPill({ active }: Props) {
  return (
    <span
      className={`inline-flex items-center px-3 mt-3 py-1 rounded-md text-sm font-medium ${
        active
          ? "bg-green-300 text-green-900"
          : "bg-red-300 text-red-900"
      }`}
    >
      {active ? "Ativo" : "Inativo"}
    </span>
  );
}
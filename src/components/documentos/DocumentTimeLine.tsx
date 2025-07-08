'use client';

import { LinkIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RelationItem {
  id: number;
  fromId: number;
  toId: number | null;
  rawTarget: string;
  rawDate: string | null;
  relation: 'REVOGA' | 'ALTERA' | 'MODIFICA' | 'COMPLEMENTA';
  createdAt: string;
  to?: {
    id: number;
    title: string;
  } | null;
}

interface Props {
  createdAt: string;
  relations: RelationItem[];
}

export function DocumentTimeline({ relations }: Props) {
  const baseItems = relations.map(rel => {
    const raw = rel.rawDate?.replace(/\n/g, ' ').trim();
    let cleanRawDate = '';

    if (raw) {
      const match = raw.match(/\b\d{1,2}\sde\s\w+\sde\s\d{4}\b/i);
      if (match) cleanRawDate = match[0];
    }

    const date = cleanRawDate
      ? cleanRawDate
      : format(new Date(rel.createdAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

    return {
      type:
        rel.relation === 'REVOGA'
          ? 'revocation'
          : rel.relation === 'ALTERA'
            ? 'alteration'
            : rel.relation === 'COMPLEMENTA'
              ? 'complementation'
              : 'modification',
      date,
      label: `${rel.relation} ${rel.rawTarget}`,
      description: raw ?? '',
      relatedDocumentId: rel.to?.id ?? rel.toId,
      relatedTitle: rel.to?.title ?? null,
    };
  });

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-4">📜 Linha do Tempo</h2>
      <ol className="relative border-l border-slate-300">
        {baseItems.map((item, idx) => (
          <li key={idx} className="mb-6 ml-4">
            <span className="absolute -left-2.5 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-white">
              {item.type === 'revocation' ? (
                <XIcon className="w-3 h-3" />
              ) : (
                <LinkIcon className="w-3 h-3" />
              )}
            </span>

            <time className="mb-1 text-sm text-slate-500">{item.date}</time>
            <h3 className="text-sm font-semibold text-slate-800">{item.label}</h3>

            {item.relatedDocumentId && (
              <Link
                href={`/admin/documentos/${item.relatedDocumentId}`}
                className="text-sm text-blue-600 hover:underline"
              >
                {item.relatedTitle ? `Ver ${item.relatedTitle}` : 'Ver documento relacionado →'}
              </Link>
            )}

            {item.description && <p className="mt-1 text-sm text-slate-600">{item.description}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}

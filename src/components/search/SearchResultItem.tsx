import { formatDateBR } from '@/lib/utils';
import { ApiFile } from '@/services/types';
import { DownloadIcon } from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import Link from 'next/link';
import PDFViewerModal from '../PDFViewerModal';

type Props = {
  item: ApiFile;
};

export default function SearchResultItem({ item }: Props) {
  return (
    <div className="bg-white rounded-md px-4 py-4" key={item.id}>
      <p className="font-semibold">{item.title}</p>
      <p className="text-sm font-light">Adicionado em {formatDateBR(item.created_at)}</p>
      <div className="mt-2 flex gap-2">
        <PDFViewerModal buttonText="Visualizar" url={item.url} filename={item.title} />
        <Button variant="secondary" asChild>
          <Link href={item.url} target="_blank" download={true}>
            Baixar <DownloadIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
}

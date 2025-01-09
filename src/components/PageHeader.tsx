import Image from "next/image";
import Link from "next/link";

const PARATY_WEBSITE_HREF = "https://paraty.rj.leg.br/";

export default function PageHeader() {
  return (
    <div className='py-6'>
      <Link href={PARATY_WEBSITE_HREF}>
        <Image
          src='/logo-paraty.png'
          alt='Logo - Câmara Municipal de Paraty'
          width={200}
          height={103}
        />
      </Link>
    </div>
  );
}

import PageHeader from '@/components/PageHeader';
import DocSearchForm from '@/components/search/DocSearchForm';
import SearchPageResults from '@/components/search/SearchPageResults';

export default function Home() {
  return (
    <div className="w-full min-h-screen px-4 py-6 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        <PageHeader />
        <DocSearchForm />
        <SearchPageResults />
      </div>
    </div>
  );
}

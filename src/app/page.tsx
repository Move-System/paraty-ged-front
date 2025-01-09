import PageHeader from "@/components/PageHeader";
import DocSearchForm from "@/components/search/DocSearchForm";
import SearchPageResults from "@/components/search/SearchPageResults";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-[720px] mx-auto h-screen px-4'>
      <PageHeader />
      <DocSearchForm />
      <SearchPageResults />
    </div>
  );
}

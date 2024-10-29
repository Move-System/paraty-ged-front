import { useMemo } from "react";
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type Props = {
  changePage: (page: number) => void;
  activePage: number;
  totalPages: number;
};

export default function ResultsPagination({
  changePage,
  activePage,
  totalPages,
}: Props) {
  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages]
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={activePage < 2}
            onClick={() => changePage(activePage - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationButton
              onClick={() => changePage(page)}
              isActive={page === activePage}>
              {page}
            </PaginationButton>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            disabled={activePage === totalPages}
            onClick={() => changePage(activePage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

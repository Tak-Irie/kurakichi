import { FC } from 'react';

type TablePaginationProps = {
  some?: string;
};

const TablePagination: FC<TablePaginationProps> = () => (
    <nav
      className="flex justify-between items-center py-3 px-4 bg-white border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing
          <span className="mx-1 font-medium">1</span>
          to
          <span className="mx-1 font-medium">10</span>
          of
          <span className="mx-1 font-medium">20</span>
          results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <a
          href="#"
          className="inline-flex relative items-center py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300"
        >
          Previous
        </a>
        <a
          href="#"
          className="inline-flex relative items-center py-2 px-4 ml-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300"
        >
          Next
        </a>
      </div>
    </nav>
  );

export { TablePagination };

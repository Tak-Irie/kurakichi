import { FC } from 'react';

type BreadCrumbProps = {
  some?: string;
};

const BreadCrumb: FC<BreadCrumbProps> = () => (
  <nav
    className="flex items-start py-3 px-4 sm:px-6 lg:px-8 xl:hidden"
    aria-label="Breadcrumb"
  >
    <a
      href="/"
      className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
    >
      <svg
        className="-ml-2 w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <div>Directory</div>
    </a>
  </nav>
);

export { BreadCrumb };

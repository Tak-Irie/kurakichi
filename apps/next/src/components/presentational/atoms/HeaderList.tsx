import { FC } from 'react';
import Link from 'next/link';

type HeaderListProps = {
  href: string;
  title: string;
  label: string;
};

const HeaderList: FC<HeaderListProps> = (props) => {
  return (
    <li key={props.title}>
      <Link href={props.href}>
        <a
          href={props.href}
          aria-label={props.title}
          title={props.title}
          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
        >
          {props.label}
        </a>
      </Link>
    </li>
  );
};

export { HeaderList };

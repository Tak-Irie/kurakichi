import { VFC } from 'react';
import Link from 'next/link';

type LinkNextjsProps = {
  linkUrl: string;
  linkLabel: string;
  linkAs?: string;
  overwriteCSS?: string;
  ariaLabel?: string;
  ariaRole?: string;
  onClick?: () => void;
};

export const LinkNextjs: VFC<LinkNextjsProps> = ({
  linkAs,
  linkUrl,
  linkLabel,
  overwriteCSS = 'inline-flex items-center font-semibold',
  ariaLabel,
  ariaRole,
  onClick,
}) => {
  return (
    <Link href={linkUrl} as={linkAs} passHref>
      <a
        href="replace"
        className={overwriteCSS}
        aria-label={ariaLabel}
        title={ariaLabel}
        role={ariaRole}
        onClick={onClick}
      >
        {linkLabel}
      </a>
    </Link>
  );
};

import { ReactElement, VFC } from 'react';
import Link from 'next/link';

type LinkNextjsProps = {
  linkUrl: string;
  linkLabel: string | ReactElement;
  linkAs?: string;
  overwriteCSS?: string;
  ariaLabel?: string;
  ariaRole?: string;
  onClick?: () => void;
};

/**
 * props passed to \<a ...props>{linkLabel}\</a> except for linkAs and linkUrl
 */
export const LinkNextjs: VFC<LinkNextjsProps> = ({
  linkAs,
  linkUrl,
  linkLabel,
  overwriteCSS = 'inline-flex items-center',
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

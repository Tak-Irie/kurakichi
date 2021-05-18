import { VFC } from 'react';
import { LinkNextjs } from '@next/container';

type HeaderListProps = {
  linkUrl: string;
  linkLabel: string;
  linkAs?: string;
  overwriteCSS?: string;
  ariaLabel?: string;
  ariaRole?: string;
  onClick?: () => void;
};

const HeaderList: VFC<HeaderListProps> = ({
  linkAs,
  linkLabel,
  linkUrl,
  ariaLabel,
  ariaRole,
  overwriteCSS,
  onClick,
}) => {
  return (
    <li key={ariaLabel}>
      <LinkNextjs
        overwriteCSS={overwriteCSS}
        linkUrl={linkUrl}
        linkAs={linkAs}
        linkLabel={linkLabel}
        ariaLabel={ariaLabel}
        ariaRole={ariaRole}
        onClick={onClick}
      />
    </li>
  );
};

export { HeaderList };

import type { FC } from 'react';
import { LinkNextjs } from '../../presentational/atoms';

type HeaderListProps = {
  linkUrl: string;
  linkLabel: string;
  linkAs?: string;
  overwriteCSS?: string;
  ariaLabel?: string;
  ariaRole?: string;
  onClick?: () => void;
};

const HeaderList: FC<HeaderListProps> = ({
  linkAs,
  linkLabel,
  linkUrl,
  ariaLabel,
  ariaRole,
  overwriteCSS,
  onClick,
}) => (
  <li key={ariaLabel}>
    <LinkNextjs
      overwriteCSS={overwriteCSS}
      url={linkUrl}
      as={linkAs}
      labelOrElement={linkLabel}
      ariaLabel={ariaLabel}
      ariaRole={ariaRole}
      onClick={onClick}
    />
  </li>
);

export { HeaderList };

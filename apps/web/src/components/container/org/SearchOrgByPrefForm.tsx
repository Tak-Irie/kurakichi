import { FC } from 'react';

import { ButtonWithIcon, IconsSearch } from '../../presentational/atoms';

// FIXME:not yet impl feature
export const SearchOrgByPrefForm: FC = () => (
  <div className="p-2 rounded border border-gray-200">
    <ButtonWithIcon
      disabled
      type="submit"
      label="都道府県で絞り込む"
      icon={<IconsSearch />}
    />
  </div>
);

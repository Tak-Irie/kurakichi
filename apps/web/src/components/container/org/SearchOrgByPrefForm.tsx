import { FC } from 'react';

import { ButtonWithIcon, IconsSearch } from '../../presentational';

// FIXME:not yet impl feature
export const SearchOrgByPrefForm: FC = () => {
  return (
    <div className="p-2 rounded border border-gray-200">
      <ButtonWithIcon
        disabled={true}
        type="submit"
        label="都道府県で絞り込む"
        icon={<IconsSearch />}
      />
    </div>
  );
};

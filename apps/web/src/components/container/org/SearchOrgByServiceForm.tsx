import { FC } from 'react';

import { ButtonWithIcon, IconsSearch } from '../../presentational';

// FIXME: Not yet impl feature
export const SearchOrgByServiceForm: FC = () => (
    <div className="p-2 rounded border border-gray-200">
      <ButtonWithIcon
        disabled
        type="submit"
        label="サービスで絞り込む"
        icon={<IconsSearch />}
      />
    </div>
  );

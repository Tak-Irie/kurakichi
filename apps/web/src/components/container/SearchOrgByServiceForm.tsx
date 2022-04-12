import { Dispatch, SetStateAction, useEffect, useState, VFC } from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';

import { ButtonWithIcon, IconsSearch, Form, Input } from '../presentational';

export const SearchOrgByServiceForm: VFC = () => {
  return (
    <div className="p-2 border border-gray-200 rounded">
      <ButtonWithIcon
        disabled={true}
        type="submit"
        label="サービスで絞り込む"
        icon={<IconsSearch />}
      />
    </div>
  );
};

import { FC } from 'react';

import { ButtonBig, LoadingStylishSpinner } from '@next/ui';

type ButtonOrLoadingProps = {
  loading: boolean;
  buttonLabel: string;
  buttonType: 'submit' | 'button';
  onClick?: () => void;
};

export const ButtonOrLoading: FC<ButtonOrLoadingProps> = ({
  loading,
  buttonLabel,
  buttonType,
  onClick,
}) => {
  return loading ? (
    <ButtonBig disabled type="submit">
      <LoadingStylishSpinner />
      "読込中です"
    </ButtonBig>
  ) : (
    <ButtonBig onClick={onClick} type={buttonType} label={buttonLabel} />
  );
};

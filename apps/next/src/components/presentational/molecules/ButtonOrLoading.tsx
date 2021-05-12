import { VFC } from 'react';

import { ButtonBig, LoadingSpinner } from '@next/ui';

type ButtonOrLoadingProps = {
  loading: boolean;
  buttonLabel: string;
  buttonType: 'submit' | 'button';
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
};

export const ButtonOrLoading: VFC<ButtonOrLoadingProps> = ({
  loading,
  buttonLabel,
  buttonType,
  onClick,
  color,
  disabled,
}) => {
  return loading ? (
    <ButtonBig
      disabled
      type="submit"
      color={color}
      label={
        <span className="flex">
          <LoadingSpinner color="green" height="h-5" width="w-5" />
        </span>
      }
    />
  ) : (
    <ButtonBig color={color} onClick={onClick} type={buttonType} label={buttonLabel} />
  );
};

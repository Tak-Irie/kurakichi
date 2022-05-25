import { FC } from 'react';

import { ButtonBig, LoadingSpinner } from '../atoms';

type ButtonOrLoadingProps = {
  loading: boolean;
  buttonLabel: string;
  buttonType: 'submit' | 'button';
  onClick?: () => void;
  color?: 'gray' | 'yellow' | 'blue' | 'green' | 'red';
};

export const ButtonOrLoading: FC<ButtonOrLoadingProps> = ({
  loading,
  buttonLabel,
  buttonType,
  onClick,
  color,
}) =>
  loading ? (
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
    <ButtonBig
      color={color}
      onClick={onClick}
      type={buttonType}
      label={buttonLabel}
    />
  );

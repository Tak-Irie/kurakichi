import { Dispatch, FC, SetStateAction } from 'react';

import { ButtonBig, LoadingSpinner } from '../atoms';

type ButtonOrLoadingProps = {
  loading: boolean;
  buttonLabel: string;
  buttonType: 'submit' | 'button';
  onClick?: (() => Promise<void> | void) | Dispatch<SetStateAction<any>>;
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
        <div className="flex">
          <LoadingSpinner color="green" height="h-5" width="w-5" />
        </div>
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

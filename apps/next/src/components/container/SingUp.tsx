import { FC } from 'react';
import { MiddleButton } from '../presentational/atoms/Button';

type SingUpProps = {
  some?: string;
};

const SingUpButton: FC<SingUpProps> = () => {
  const onClick = () => {
    console.log('you click sing up');
  };

  return (
    <MiddleButton type="button" onClick={onClick}>
      Sing Up
    </MiddleButton>
  );
};

export { SingUpButton };

import { FC } from 'react';
import {
  ExclamationIcon,
  MenuIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/outline';

type IconsProps = {
  overwriteCSS?: string;
};

export const IconsCaution: FC<IconsProps> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-yellow-500',
}) => {
  return (
    <div className={overwriteCSS}>
      <ExclamationIcon />
    </div>
  );
};

export const IconsMenu: FC<IconsProps> = ({ overwriteCSS = 'flex-shrink-0 h-6 w-6' }) => {
  return (
    <div className={overwriteCSS}>
      <MenuIcon />
    </div>
  );
};

export const IconsDown: FC<IconsProps> = ({ overwriteCSS = 'flex-shrink-0 h-6 w-6' }) => {
  return (
    <div className={overwriteCSS}>
      <ChevronDownIcon />
    </div>
  );
};

export const IconsDots: FC<IconsProps> = ({ overwriteCSS = 'flex-shrink-0 h-6 w-6' }) => {
  return (
    <div className={overwriteCSS}>
      <DotsVerticalIcon />
    </div>
  );
};

export const IconsHome: FC<IconsProps> = ({ overwriteCSS = 'flex-shrink-0 h-6 w-6' }) => {
  return (
    <div className={overwriteCSS}>
      <HomeIcon />
    </div>
  );
};
export const IconsUser: FC<IconsProps> = ({ overwriteCSS = 'flex-shrink-0 h-6 w-6' }) => {
  return (
    <div className={overwriteCSS}>
      <UserIcon />
    </div>
  );
};

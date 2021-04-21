import { FC, ReactElement, VFC } from 'react';
import {
  ExclamationIcon,
  MenuIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
  HomeIcon,
  UserIcon,
  MailIcon,
  CogIcon,
  CheckCircleIcon,
} from '@heroicons/react/outline';

type IconsProps = {
  overwriteCSS?: string;
  icon: ReactElement;
};

const Icons: FC<IconsProps> = ({ icon, overwriteCSS }) => {
  return <div className={overwriteCSS}>{icon}</div>;
};

export const IconsCaution: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6 text-yellow-500" icon={<ExclamationIcon />} />;
};
export const IconsMenu: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6" icon={<MenuIcon />} />;
};
export const IconsDownChevron: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6 text-gray-500" icon={<ChevronDownIcon />} />;
};
export const IconsVerticalDots: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6 text-gray-500" icon={<DotsVerticalIcon />} />;
};
export const IconsHome: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6 text-gray-500" icon={<HomeIcon />} />;
};
export const IconsUser: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6 text-gray-500" icon={<UserIcon />} />;
};
export const IconsMail: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6 text-gray-500" icon={<MailIcon />} />;
};
export const IconsCog: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6 text-gray-500" icon={<CogIcon />} />;
};
export const IconsCheckCircle: FC = () => {
  return <Icons overwriteCSS="flex-shrink-0 h-6 w-6 text-gray-500" icon={<IconsCheckCircle />} />;
};

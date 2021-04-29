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
  CloudUploadIcon,
  DocumentAddIcon,
  QuestionMarkCircleIcon,
  LogoutIcon,
  LoginIcon,
} from '@heroicons/react/outline';

type IconsProps = {
  overwriteCSS?: string;
  icon: ReactElement;
};

const Icons: FC<IconsProps> = ({ icon, overwriteCSS }) => {
  return <div className={overwriteCSS}>{icon}</div>;
};

export const IconsCaution: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-yellow-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<ExclamationIcon />} />;
};

export const IconsMenu: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<MenuIcon />} />;
};

export const IconsDownChevron: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<ChevronDownIcon />} />;
};

export const IconsVerticalDots: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<DotsVerticalIcon />} />;
};

export const IconsHome: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<HomeIcon />} />;
};

export const IconsUser: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<UserIcon />} />;
};

export const IconsMail: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<MailIcon />} />;
};

export const IconsCog: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<CogIcon />} />;
};

export const IconsCheckCircle: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<CheckCircleIcon />} />;
};

export const IconsCloudUpload: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<CloudUploadIcon />} />;
};

export const IconsDocumentAdd: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<DocumentAddIcon />} />;
};

export const IconsQuestion: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<QuestionMarkCircleIcon />} />;
};
export const IconsLogout: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<LogoutIcon />} />;
};
export const IconsLogin: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<LoginIcon />} />;
};

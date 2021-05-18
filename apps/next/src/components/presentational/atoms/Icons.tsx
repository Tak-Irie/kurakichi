import { FC, ReactElement, VFC } from 'react';
import {
  ExclamationIcon,
  MenuIcon,
  ChevronDownIcon,
  ChevronUpIcon,
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
  UsersIcon,
  WifiIcon,
  SelectorIcon,
  CheckIcon,
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

export const IconsUpChevron: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<ChevronUpIcon />} />;
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
export const IconsCheck: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<CheckIcon />} />;
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
export const IconsUsers: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<UsersIcon />} />;
};
export const IconsWifi: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<WifiIcon />} />;
};
export const IconsSelector: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return <Icons overwriteCSS={overwriteCSS} icon={<SelectorIcon />} />;
};

export const IconsPost: FC<Omit<IconsProps, 'icon'>> = ({
  overwriteCSS = 'flex-shrink-0 h-6 w-6 text-gray-500',
}) => {
  return (
    <Icons
      overwriteCSS={overwriteCSS}
      icon={
        <svg
          fill={'rgb(239,68,68)'}
          fillOpacity="0.9"
          height={22}
          width={22}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 193.333 200"
        >
          <path d="M20,0A19.958,19.958,0,0,0,0,20V180a19.958,19.958,0,0,0,20,20H173.332a19.958,19.958,0,0,0,20-20V20a19.958,19.958,0,0,0-20-20ZM36.669,37.495h120v25h-120Zm0,42.5h120v25h-47.5v64.606h-25V105h-47.5Z" />
        </svg>
      }
    />
  );
};

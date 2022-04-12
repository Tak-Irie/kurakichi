import { FC } from 'react';

type AvatarsProps = {
  src: string;
  alt: string;
  notification?: boolean;
};

export const Avatar: FC<AvatarsProps> = ({
  src = '/asian_man1.jpg',
  alt = 'sampleImage',
  notification = false,
}) => {
  return (
    <span className="inline-block relative">
      <img className="inline-block h-12 w-12 rounded-full" src={src} alt={alt} />
      {notification ? (
        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white bg-red-400"></span>
      ) : null}
    </span>
  );
};

export const AvatarSmall: FC<AvatarsProps> = ({
  src = 'UNKNOWN',
  alt = 'sampleImage',
  notification = false,
}) => {
  return (
    <span className="inline-block relative">
      <img
        className="inline-block flex-shrink-0 h-8 w-8 rounded-full"
        src={src === 'UNKNOWN' ? '/asian_man1.jpg' : src}
        alt={alt}
      />
      {notification ? (
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-400"></span>
      ) : null}
    </span>
  );
};

export const AvatarBig: FC<AvatarsProps> = ({
  src = '/logo_temp.png',
  alt = 'defaultImage',
  notification = false,
}) => {
  return (
    <img
      className="absolute h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 bg-yellow-100"
      src={src === 'UNKNOWN' ? '/logo_temp.png' : src}
      alt={alt}
    />
  );
};

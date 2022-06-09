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
}) => (
  <div className="inline-block relative">
    <img className="inline-block w-12 h-12 rounded-full" src={src} alt={alt} />
    {notification ? (
      <div className="block absolute top-0 right-0 w-3 h-3 bg-red-400 rounded-full ring-2 ring-white" />
    ) : null}
  </div>
);

export const AvatarSmall: FC<AvatarsProps> = ({
  src = 'UNKNOWN',
  alt = 'sampleImage',
  notification = false,
}) => (
  <div className="inline-block relative">
    <img
      className="inline-block shrink-0 w-8 h-8 rounded-full"
      src={src === 'UNKNOWN' ? '/asian_man1.jpg' : src}
      alt={alt}
    />
    {notification ? (
      <div className="block absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full ring-2 ring-white" />
    ) : null}
  </div>
);

export const AvatarBig: FC<AvatarsProps> = ({
  src = '/logo_temp.png',
  alt = 'defaultImage',
  // notification = false,
}) => (
  <img
    className="absolute w-24 h-24 bg-yellow-100 rounded-full ring-4 ring-white sm:w-32 sm:h-32"
    src={src === 'UNKNOWN' ? '/logo_temp.png' : src}
    alt={alt}
  />
);

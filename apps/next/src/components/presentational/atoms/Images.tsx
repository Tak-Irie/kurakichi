import { FC } from 'react';

type ImagesProps = {
  src: string;
  css: string;
  alt: string;
};

export const Images: FC<ImagesProps> = ({ alt, css, src }) => {
  return <img className={css} src={src} alt={alt} />;
};

export const ImageHero: FC<Omit<ImagesProps, 'css'>> = ({ alt, src }) => {
  return (
    <Images
      css="h-32 w-full object-cover lg:h-56"
      src={src === 'UNKNOWN' ? '/hands_mid-reso.jpg' : src}
      alt={alt}
    />
  );
};

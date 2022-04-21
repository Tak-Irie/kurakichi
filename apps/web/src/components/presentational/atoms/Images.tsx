import { FC } from 'react';

type ImagesProps = {
  src: string;
  alt: string;
  css?: string;
};

export const Images: FC<ImagesProps> = ({ alt, css, src }) => {
  return <img className={css} src={src} alt={alt} />;
};

export const ImageLogo: FC<ImagesProps> = ({
  alt,
  src,
  css = 'h-32 bg-white rounded-full border-gray-200 border',
}) => {
  return (
    <div className=" flex justify-center w-auto">
      <Images
        css={css}
        src={src === 'UNKNOWN' ? '/logo_temp.jpg' : src}
        alt={alt}
      />
    </div>
  );
};

export const ImageHero: FC<ImagesProps> = ({
  alt,
  src,
  css = 'h-32 w-full object-cover lg:h-56',
}) => {
  return (
    <Images
      css={css}
      src={src === 'UNKNOWN' ? '/hands_mid-reso.jpg' : src}
      alt={alt}
    />
  );
};

export const ImageHeroTransition: FC<ImagesProps> = ({
  alt,
  src,
  css = 'h-32 w-full object-cover lg:h-56 transition duration-500 hover:bg-black',
}) => {
  return (
    <Images
      css={css}
      src={src === 'UNKNOWN' ? '/hands_mid-reso.jpg' : src}
      alt={alt}
    />
  );
};

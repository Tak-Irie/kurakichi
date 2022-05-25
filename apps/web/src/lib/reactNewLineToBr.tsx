/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';

export const reactNewLineToBr = (text: string) => {
  const transformedText = text
    .split(/(\n)/)
    .map((item, index) => (
      <Fragment key={index}>{item.match(/\n/) ? <br /> : item}</Fragment>
    ));
  return <span>{transformedText}</span>;
};

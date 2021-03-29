import React from 'react';
import { LoadingCard } from '../components/presentational/atoms/LoadingCard';
import {
  LoadingSimpleSpinner,
  LoadingStylishSpinner,
} from '../components/presentational/atoms/LoadingSpinner';
import { LoadingSpinnerSVG } from '../components/presentational/atoms/SVG';
import { Feature2 } from '../components/presentational/organisms//Feature2';
import { Feature } from '../components/presentational/organisms/Feature';

export function Index() {
  return (
    <div>
      <LoadingSpinnerSVG />
      <LoadingStylishSpinner />
      <LoadingSimpleSpinner />
      <LoadingCard />
      <p>フォントテスト:彼らの機器や装置はすべて生命体だ</p>
      <Feature />
      <Feature2 />
    </div>
  );
}

export default Index;

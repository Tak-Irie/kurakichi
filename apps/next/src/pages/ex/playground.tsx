import { NextPage } from 'next';
import Image from 'next/image';
import { Card, SmallCard, LightningSVG, SideBar } from '@next/ui';
import Link from 'next/link';
import { GetMessages } from '../../components/container/';

const PlayGround: NextPage = () => {
  return (
    <div>
      <div className="h-screen flex overflow-hidden bg-white">
        <SideBar />
      </div>
    </div>
  );
};

export default PlayGround;

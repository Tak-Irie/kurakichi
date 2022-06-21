import type { FC, ReactElement } from 'react';
import { MenuBar } from '../../container/shared';
import { Footer, NavAlpha } from '../organisms';

type LayoutProps = {
  children: ReactElement;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <div>
    <NavAlpha />
    <MenuBar />
    <main className="h-max bg-green-50">{children}</main>
    <Footer />
  </div>
);

export { Layout };

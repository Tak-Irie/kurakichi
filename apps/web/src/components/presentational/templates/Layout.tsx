import type { FC, ReactElement } from 'react';
import { NavBar } from '../../container/shared';
import { Footer, NavAlpha } from '../organisms';

type LayoutProps = {
  children: ReactElement;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <>
    <NavAlpha />
    <NavBar />
    <main className="bg-green-50">{children}</main>
    <Footer />
  </>
);

export { Layout };

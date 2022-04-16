import type { FC, ReactChild } from 'react';
import { Footer, NavAlpha, NavBar } from '..';

type LayoutProps = {
  children: ReactChild;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavAlpha />
      <NavBar />
      <main className="bg-green-50">{children}</main>
      <Footer />
    </>
  );
};

export { Layout };

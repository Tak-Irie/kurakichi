import { FC } from 'react';
import { Footer, NavBar, NavAlpha } from '@next/ui';

const Layout: FC = ({ children }) => {
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

import { FC } from 'react';
import { Footer, NavBar } from '@next/ui';

const Layout: FC = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className="bg-green-50">{children}</main>
      <Footer />
    </>
  );
};

export { Layout };

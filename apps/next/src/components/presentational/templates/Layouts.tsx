import { FC } from 'react';
import { Footer, NavBar, NavAlpha } from '../../presentational';

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

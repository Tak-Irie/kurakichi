import { FC } from 'react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-green-50">{children}</main>
      <Footer />
    </>
  );
};

export { Layout };

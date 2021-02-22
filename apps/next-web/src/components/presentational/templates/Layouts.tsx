import { FC } from 'react';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

const Layout: FC = ({ children }) => {
  return (
    <main className="bg-green-50">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export { Layout };

import type { FC } from "react";
import { Footer, NavBar, NavAlpha } from "..";

const Layout: FC = ({ children }) => {
  return (
    <>
      <NavAlpha />
      <NavBar />
      <main className='bg-green-50'>{children}</main>
      <Footer />
    </>
  );
};

export { Layout };

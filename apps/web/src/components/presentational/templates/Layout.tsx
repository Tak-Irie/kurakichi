import type { ReactNode, VFC } from "react";

import { Footer, NavBar } from "../../presentational/organisms";
import { NavAlpha } from "../../presentational/atoms";
import { NextPage } from "next";

const Layout: NextPage = ({ children }) => {
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

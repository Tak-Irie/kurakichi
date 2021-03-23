import { FC, useState } from 'react';
import Link from 'next/link';
import { HeaderList } from '../atoms/HeaderList';
import { MiddleButton } from '../atoms/Button';
import { MenuSVG } from '../atoms/SVG';
import { SingUpButton } from '../../container/SingUp';

// FIXME:rename to NavBar
const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <Link href="/">
          <a href="/" aria-label="Company" title="Company" className="inline-flex items-center">
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Test
            </span>
          </a>
        </Link>
        <ul className="flex items-center space-x-8 lg:flex">
          <HeaderList href="/product" title="our product" label="Product" />
          <HeaderList href="/users" title="users" label="users" />
          <HeaderList href="/login" title="login" label="login" />
          <HeaderList href="/private" title="private" label="private" />
          <HeaderList href="/ex/ex1" title="ex1" label="ex1" />
          <HeaderList href="/ex/ex2" title="ex2" label="ex2" />

          <li>
            <SingUpButton />
          </li>
        </ul>
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <MenuSVG />
          </button>
          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full">
              <div className="p-5 bg-white border rounded shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <nav>
                  <ul>
                    <HeaderList href="/" title="Home" label="Home" />
                    <HeaderList href="/product" title="our product" label="Product" />
                    <HeaderList href="/" title="none" label="None" />

                    <li>
                      <a
                        href="/"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                        aria-label="Sign up"
                        title="Sign up"
                      >
                        Sign up
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { Header };

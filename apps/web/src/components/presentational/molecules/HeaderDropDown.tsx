import { FC, useState } from 'react';
import { HeaderList, XMarkSVG, HamburgerMenuSVG } from '@next/ui';

const HeaderDropDown: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open Menu"
        title="Open Menu"
        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
        onClick={() => setIsMenuOpen(true)}
      >
        <HamburgerMenuSVG />
      </button>
      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-4/12 z-20">
          <div className="p-5 bg-white border rounded shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  className="p-2 top-0 right-0 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <XMarkSVG />
                </button>
              </div>
            </div>
            <nav>
              <ul>
                <HeaderList
                  linkUrl="/ex/map"
                  linkLabel="map"
                  ariaLabel="map"
                  onClick={() => setIsMenuOpen(false)}
                />
                <HeaderList
                  linkUrl="/ex/dialog"
                  linkLabel="dialog"
                  ariaLabel="dialog"
                  onClick={() => setIsMenuOpen(false)}
                />
                <HeaderList linkUrl="/ex/users" ariaLabel="users" linkLabel="users" />
                <HeaderList linkUrl="/ex/orgs" ariaLabel="orgs" linkLabel="orgs" />
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export { HeaderDropDown };

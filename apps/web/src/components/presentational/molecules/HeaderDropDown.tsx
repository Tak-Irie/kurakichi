import { FC, useState } from 'react';
import { HamburgerMenuSVG, XMarkSVG } from '../atoms';
import { HeaderList } from '../atoms/HeaderList';

const HeaderDropDown: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open Menu"
        title="Open Menu"
        className="p-2 -mr-1 rounded focus:outline-none transition duration-200"
        onClick={() => setIsMenuOpen(true)}
      >
        <HamburgerMenuSVG />
      </button>
      {isMenuOpen && (
        <div className="absolute top-0 right-0 z-20 w-4/12">
          <div className="p-5 bg-white rounded border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  className="top-0 right-0 p-2 hover:bg-gray-200 focus:bg-gray-200 rounded focus:outline-none transition duration-200"
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
                <HeaderList
                  linkUrl="/ex/users"
                  ariaLabel="users"
                  linkLabel="users"
                />
                <HeaderList
                  linkUrl="/ex/orgs"
                  ariaLabel="orgs"
                  linkLabel="orgs"
                />
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export { HeaderDropDown };

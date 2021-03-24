import { FC, useState } from 'react';
import { XMarkSVG, HamburgerMenuSVG } from '../atoms/SVG';
import { HeaderList } from '../atoms/HeaderList';

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
        <div className="absolute top-0 right-0 w-4/12 z-10">
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
                  href="/ex/map"
                  title="map"
                  label="map"
                  onClick={() => setIsMenuOpen(false)}
                />
                <HeaderList
                  href="/ex/dialog"
                  title="dialog"
                  label="dialog"
                  onClick={() => setIsMenuOpen(false)}
                />
                <HeaderList
                  href="/ex/org"
                  title="org"
                  label="org"
                  onClick={() => setIsMenuOpen(false)}
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

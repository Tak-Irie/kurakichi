import { Dispatch, FC, SetStateAction, useState } from 'react';
import { fixClassNameForTailwind } from '../../../lib';

type TabsProps = {
  clickHandler: Dispatch<SetStateAction<number>>;
  labels: string[];
};

export const Tabs: FC<TabsProps> = ({ clickHandler, labels }) => {
  const tabs = labels.map((label, index) => ({
    name: label,
    id: index,
  }));
  // const tabs = [
  //   { name: 'Applied', id: 0 },
  //   { name: 'Phone Screening', id: 1 },
  //   { name: 'Interview', id: 2 },
  // ];
  const [isSelected, setIsSelected] = useState(tabs[0]);

  const handleClick = (id: number) => {
    setIsSelected(tabs[id]);
    clickHandler(id);
  };

  return (
    <div className="pb-5 border-b border-gray-200 sm:pb-0">
      <div className="mt-3 sm:mt-4">
        <div className="sm:hidden">
          <div className="sr-only">Select a tab</div>
          <select
            id="current-tab"
            name="current-tab"
            className="block py-2 pr-10 pl-3 w-full text-base rounded-md border-gray-300 focus:border-yellow-500 focus:outline-none focus:ring-yellow-500 sm:text-sm bold"
            defaultValue={isSelected.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex -mb-px space-x-8">
            {tabs.map((tab) => (
              <button
                type="button"
                onClick={() => handleClick(tab.id)}
                key={tab.name}
                className={fixClassNameForTailwind(
                  isSelected.id === tab.id
                    ? `border-yellow-500 text-yellow-600`
                    : ` text-gray-500 hover:text-gray-700 hover:border-gray-300`,
                  `focus:outline-none pb-4 px-1 border-b-2 font-medium text-sm`,
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

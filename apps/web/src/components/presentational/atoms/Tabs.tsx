import { Dispatch, VFC, ReactElement, SetStateAction, useState } from 'react';
import { classNames } from '../../../util/tailwindUtil';

type TabsProps = {
  clickHandler: Dispatch<SetStateAction<number>>;
  labels: string[];
};

export const Tabs: VFC<TabsProps> = ({ clickHandler, labels }) => {
  const tabs = labels.map((label, index) => {
    return {
      name: label,
      id: index,
    };
  });
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
          <label htmlFor="current-tab" className="sr-only">
            Select a tab
          </label>
          <select
            id="current-tab"
            name="current-tab"
            className="block bold w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm rounded-md"
            defaultValue={isSelected.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                onClick={() => handleClick(tab.id)}
                key={tab.name}
                className={classNames(
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

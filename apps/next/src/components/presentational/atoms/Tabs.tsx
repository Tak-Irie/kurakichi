import { tailwindJoin } from '@kurakichi/node-util';
import { Dispatch, FC, ReactElement, SetStateAction, useState } from 'react';

type TabsProps = {
  tabs: {
    label: string;
    id: string;
    index: number;
  }[];
  clickHandler: Dispatch<SetStateAction<number>>;
  isShow: number;
  elements: ReactElement[];
};

export const Tabs: FC<TabsProps> = ({ tabs, clickHandler, elements, isShow }) => {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={isShow}
        >
          {tabs.map((tab) => (
            <option key={tab.label}>{tab.label}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                onClick={() => clickHandler(tab.index)}
                key={tab.id}
                className={
                  'w-full py-4 px-1 text-center border-b-2 font-medium text-sm ' +
                  (tab.index === isShow
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
                }
              >
                {tab.label}
              </button>
            ))}
          </nav>
          {elements.map((element, index) => {
            return <div className={isShow === index ? 'block' : 'hidden'}>{element}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

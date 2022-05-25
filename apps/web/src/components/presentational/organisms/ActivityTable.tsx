import { DocumentTextIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import {
  TableData,
  TableDataWithLink,
  TableHead,
  TablePagination,
} from '../atoms';

type ActivityProps = {
  title: string;
  subject: string;
  category: string;
  messageTitle: string;
  status: string;
  date: string;
};

export const ActivityTable: FC<ActivityProps> = ({
  title = '表題',
  subject = '件名',
  category = 'カテゴリー',
  messageTitle = 'こんにちは',
  status = 'ステータス',
  date = '日付',
}) => (
    <div>
      <div className="px-4 my-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="flex flex-col mt-2">
          <div className="overflow-hidden overflow-x-auto min-w-full align-middle shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <caption className="inline-flex py-4 mx-6 max-w-6xl text-lg font-medium text-gray-700">
                  {title}
                </caption>
                <tr>
                  <TableHead left>{subject}</TableHead>
                  <TableHead>{category}</TableHead>
                  <TableHead>{status}</TableHead>
                  <TableHead>{date}</TableHead>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-white">
                  <TableDataWithLink
                    link="/"
                    title={messageTitle}
                    icon={<DocumentTextIcon />}
                  />
                  <TableData title="hogefuga" />
                  <TableData>
                    <span className="inline-flex items-center py-0.5 px-2.5 text-xs font-medium text-green-800 capitalize bg-green-100 rounded-full">
                      success
                    </span>
                  </TableData>
                  <TableData title="2020/1/1" />
                </tr>
              </tbody>
            </table>
            <TablePagination />
          </div>
        </div>
      </div>
    </div>
  );

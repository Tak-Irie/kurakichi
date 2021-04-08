import { FC } from 'react';
import { DocumentTextIcon } from '@heroicons/react/outline';
import { TableDataWithLink, TableHead, TableData, TablePagination } from '@next/ui';

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
}) => {
  return (
    <div>
      <div className="max-w-6xl my-4 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mt-2">
          <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <caption className="inline-flex max-w-6xl mx-6 py-4 text-lg font-medium text-gray-700">
                  {title}
                </caption>
                <tr>
                  <TableHead left={true}>{subject}</TableHead>
                  <TableHead>{category}</TableHead>
                  <TableHead>{status}</TableHead>
                  <TableHead>{date}</TableHead>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-white">
                  <TableDataWithLink link="/" title={messageTitle} icon={<DocumentTextIcon />} />
                  <TableData title="hogefuga" />
                  <TableData>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
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
};

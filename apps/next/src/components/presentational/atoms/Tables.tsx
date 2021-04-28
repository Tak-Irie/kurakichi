import { Message } from '../../../graphql/generated/graphql';
import { VFC } from 'react';
import { AvatarSmall } from './Avatars';
import { TextSmall } from './Text';
import Link from 'next/link';

type TableProps = {
  cols: string[];
  data: any[];
};

type TableNewMessagesProps = {
  messages: Message[];
};

export const TableNewMessages: VFC<TableNewMessagesProps> = ({ messages }) => {
  return (
    <div className="bg-gray-50 shadow border-2 border-gray-200 rounded-lg">
      <div className="grid grid-cols-6 divide-y divide-gray-200">
        <div className="col-star-1 pl-4 py-1 text-left text-xs font-medium text-gray-500">
          送信者
        </div>
        <div className="col-auto py-1 text-left text-xs font-medium text-gray-500">内容</div>
        <div className="col-end-7 py-1 px-1 text-left text-xs font-medium text-gray-500">
          受信日
        </div>
        {messages.map((message) => (
          <div className="col-span-full grid grid-cols-6" key={message.id}>
            <div className="col-start-1 pl-2 py-2 space-x-1 flex items-center">
              <AvatarSmall src={message.sender?.avatar} alt="ユーザーアバター" />
              <TextSmall content={message.sender?.userName} />
            </div>
            <div className="col-span-4 mx-1 py-4 whitespace-nowrap overflow-scroll">
              <TextSmall content={message.content} />
            </div>
            <div className="col-end-7 px-1 whitespace-nowrap py-4">
              <TextSmall content={message.sentAt} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export const TableSmall: VFC<TableProps> = ({ cols, data }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <div>
                  {cols.map((col) => {
                    return (
                      <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {col}
                      </div>
                    );
                  })}
                  <div className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </div>
                </div>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((person) => (
                  <div key={person.email}>
                    <div className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{person.name}</div>
                          <div className="text-sm text-gray-500">{person.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{person.title}</div>
                      <div className="text-sm text-gray-500">{person.department}</div>
                    </div>
                    <div className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.role}
                    </div>
                    <div className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </div>
                  </div>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Message } from '@next/graphql';
import { VFC } from 'react';
import { AvatarSmall } from '@next/ui';
import { ReplyMessageForm } from '@next/container';

type MessageTreeProps = {
  messages: Message[];
};

export const MessageTree: VFC<MessageTreeProps> = ({ messages }) => {
  return (
    <>
      <ul className="divide-y mt-4 p-2 divide-gray-200 bg-gray-50 shadow border-2 border-gray-200 rounded-lg">
        {messages.map((message) => (
          <li key={message.id}>
            <div className="flex mt-1 space-x-3">
              <AvatarSmall src={message.sender.avatar} alt="ユーザーアバター" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{message.sender.userName}</h3>
                  <p className="text-sm text-gray-500">{message.sentAt}</p>
                </div>
                <p className="text-sm text-gray-500">{message.content}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <ReplyMessageForm replyTargetId={messages[0].id} />
      </div>
    </>
  );
};

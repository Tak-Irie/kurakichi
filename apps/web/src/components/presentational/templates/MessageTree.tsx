import type { FC } from 'react';
import type { Message } from '../../../graphql';
import { ReplyMessageForm } from '../../container/user/ReplyMessageForm';
import { AvatarSmall } from '../atoms';

type MessageTreeProps = {
  // treeId: string;
  messages: Message[];
};

export const MessageTree: FC<MessageTreeProps> = ({ messages }) => (
  <div>
    <ul className="p-2 mt-4 bg-gray-50 rounded-lg border-2 border-gray-200 divide-y divide-gray-200 shadow">
      {messages.map((message) => (
        <li key={message.id}>
          <div className="flex mt-1 space-x-3">
            <AvatarSmall
              src={message.sender?.avatarUrl || ''}
              alt="ユーザーアバター"
            />
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">{message.sender?.name}</h3>
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
  </div>
);

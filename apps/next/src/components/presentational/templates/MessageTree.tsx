import { Message } from '@next/graphql';
import { VFC } from 'react';
import Link from 'next/link';
import { UserTemplate, ButtonWithIcon, IconsMail, AvatarSmall, IconsUser } from '@next/ui';
import { ResponseMessageForm } from '@next/container';

type MessageTreeProps = {
  messages: Message[];
  image: string;
  avatar: string;
  userName: string;
};

export const MessageTree: VFC<MessageTreeProps> = ({ messages, avatar, image, userName }) => {
  return (
    <UserTemplate
      avatar={avatar}
      image={image}
      userName={userName}
      headerButtons={
        <>
          <Link href="/user/mypage">
            <a href="/user/mypage">
              <ButtonWithIcon type="button" label="マイページに戻る" icon={<IconsUser />} />
            </a>
          </Link>
          <Link href="/user/messages">
            <a href="/user/messages">
              <ButtonWithIcon type="button" label="メッセージボックス" icon={<IconsMail />} />
            </a>
          </Link>
        </>
      }
      pageContents={
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
            <ResponseMessageForm originalMessageId={messages[0].id} />
          </div>
        </>
      }
    />
  );
};

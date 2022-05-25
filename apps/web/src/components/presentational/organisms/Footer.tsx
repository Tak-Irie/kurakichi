import type { FC } from 'react';

import { LinkNextjs, TextSmall } from '../atoms';

type FooterItemsProps = {
  label: string;
  items: {
    label: string;
    url: string;
  }[];
};

const FooterItems: FC<FooterItemsProps> = ({ items, label }) => (
  <div>
    <p className="font-semibold text-gray-700">{label}</p>
    <ul className="mt-2 space-y-2">
      {items.map((item) => (
        <li key={item.label}>
          <LinkNextjs
            overwriteCSS="text-gray-700"
            url={item.url}
            labelOrElement={item.label}
          />
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: FC = () => (
  <div className="text-sm">
    <div className="px-4 pt-6 mx-auto sm:max-w-xl md:px-24 md:max-w-full lg:px-8 lg:max-w-screen-xl">
      <div className="grid gap-x-16 gap-y-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2">
          <LinkNextjs
            url="/"
            labelOrElement={
              <div className="flex justify-center items-end">
                <TextSmall content="くらきち&nbsp;-くらしのあんぜんきち-" />
              </div>
            }
          />
          <div className="flex justify-end">
            <TextSmall content="福祉のポータルサイト&nbsp;&amp;&nbsp;SNS" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4 lg:col-span-4">
          <FooterItems
            label="くらきちについて"
            items={[
              { label: '目指すもの', url: '/info/purpose' },
              { label: '運営者', url: '/info/committee' },
              { label: 'Q&A', url: '/info/question-and-answer' },
            ]}
          />
          <FooterItems
            label="規約"
            items={[
              { label: '利用規約', url: '/info/terms-of-service' },
              { label: 'プライバシーポリシー', url: '/info/privacy-policy' },
              {
                label: '情報セキュリティポリシー',
                url: '/info/information-security-policy',
              },
            ]}
          />
          <FooterItems
            label="ご意見"
            items={[
              { label: 'ご意見・ご要望フォーム', url: '/info/opinion' },
              {
                label: 'これまでのご意見と回答',
                url: '/info/answer-to-opinion',
              },
            ]}
          />
        </div>
      </div>
    </div>
    <div className="flex justify-center py-5 border-t sm:flex-row">
      <p className="text-sm text-gray-700">
        © Copyright 2021 kurakichi. All rights reserved.
      </p>
    </div>
  </div>
);

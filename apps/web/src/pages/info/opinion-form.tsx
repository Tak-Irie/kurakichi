import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';

type TempProps = {
  title: string;
  children?: ReactNode;
};
const Temp: FC<TempProps> = ({ children, title }) => (
  <div>
    <p className="mt-2 text-lg font-bold underline">{title}</p>
    <div className="text-base">{children}</div>
  </div>
);

const OpinionFormPage: NextPage = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-end-12 p-8 my-4 space-y-2 text-gray-800 bg-white rounded-md shadow-md">
        <Temp title="ご意見・ご要望フォーム">
          <p>
            くらきちについてご意見やご要望がございましたら、こちらよりお送り願います。
          </p>
          <button
            type="button"
            className="p-2 mt-2 bg-yellow-50 hover:bg-slate-100 rounded-md border border-gray-100 shadow"
            onClick={() => router.push('https://forms.gle/3YiAFmAoL5x187BEA')}
          >
            ご意見・ご要望フォーム
          </button>
        </Temp>
        <p className="p-1 mt-4 w-fit bg-red-100 rounded-md">
          製作中・・・α版においては、Googleフォームで代用する
        </p>
      </div>
    </div>
  );
};

export default OpinionFormPage;

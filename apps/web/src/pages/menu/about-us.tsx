import { NextPage } from 'next';
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
// type TempListProps = {
//   title: string;
//   list: string[];
// };
// const TempList: FC<TempListProps> = ({ list, title }) => (
//   <div>
//     <p className="mt-2 text-lg font-bold underline">{title}</p>
//     <ul className="ml-4 text-base list-disc">
//       {list!.map((li) => (
//         <li key={li}>{li}</li>
//       ))}
//     </ul>
//   </div>
// );

const AboutUsPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="くらきちについて">
        <p className="max-w-2xl">くらきちは、</p>
      </Temp>
      <Temp title="くらきちのめざすもの">
        <p className="max-w-2xl">※製作中</p>
      </Temp>
    </div>
  </div>
);

export default AboutUsPage;

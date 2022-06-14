import { NextPage } from 'next';
import { FC, ReactNode } from 'react';
import { LinkNextjs } from '../../components/presentational/atoms';

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

const forExpertPage: NextPage = () => (
  <div className="grid grid-cols-12">
    <div className="col-start-2 col-end-12 p-8 my-4 space-y-4 text-gray-800 bg-white rounded-md shadow-md">
      <Temp title="福祉職の皆様へ">
        <p className="max-w-2xl">
          *製作中
          <br />
          このページは、福祉関係で働かれている方々にくらきちをどのように有効活用して頂けるかをご説明するページです
        </p>
      </Temp>
      <div className="col-start-1 col-end-13 p-10 m-5 bg-white border border-gray-200 ">
        <LinkNextjs labelOrElement="団体登録する" url="/org/register" />
        <LinkNextjs labelOrElement="ユーザー登録する" url="/auth/register" />
      </div>
    </div>
  </div>
);

export default forExpertPage;

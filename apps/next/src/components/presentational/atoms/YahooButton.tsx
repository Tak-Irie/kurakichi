import { FC, SyntheticEvent } from 'react';

type YahooButtonProps = {
  onClick?: (e: SyntheticEvent) => void | Promise<void>;
};

// design guide https://developer.yahoo.co.jp/yconnect/loginbuttons.html
const YahooButton: FC<YahooButtonProps> = (props) => {
  return (
    <span className="inline-block border-solid border border-yahoo-main w-48 m-2.5">
      <span className="inline rounded bg-white bg-center bg-red-500">
        <img src="/yahoo_icon_64.png" alt="YahooJapan company logo" />
      </span>
      <span className="inline text-white font-bold ">
        <button onClick={props.onClick}>ログイン</button>;
      </span>
    </span>
  );
};

export { YahooButton };

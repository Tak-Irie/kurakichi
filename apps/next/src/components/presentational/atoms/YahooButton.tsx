import { VFC, SyntheticEvent } from 'react';

type YahooButtonProps = {
  onClick?: (e: SyntheticEvent) => void | Promise<void>;
};

// design guide https://developer.yahoo.co.jp/yconnect/loginbuttons.html
const YahooButton: VFC<YahooButtonProps> = ({ onClick }) => {
  return (
    <button
      className="rounded flex hover:shadow-md"
      style={{ height: 50, width: 240, background: '#ff0033' }}
      onClick={onClick}
    >
      <span
        style={{ marginTop: 1, marginLeft: 2 }}
        className="h-12 w-14 rounded bg-center bg-white"
      >
        <img
          style={{ paddingTop: 9 }}
          className="inline px-1"
          src="/yahoo_icon_256.png"
          alt="YahooJapan company logo"
        />
      </span>
      <span className="flex flex-auto h-12 justify-center items-center">
        <p className="text-white font-bold text-xl">ログイン</p>
      </span>
    </button>
  );
};

export { YahooButton };

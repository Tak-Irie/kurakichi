import { FC, SyntheticEvent } from 'react';

type YahooButtonProps = {
  onClick?: (e: SyntheticEvent) => void | Promise<void>;
};

// design guide https://developer.yahoo.co.jp/yconnect/loginbuttons.html
const YahooButton: FC<YahooButtonProps> = ({ onClick }) => (
  <button
    type="button"
    className="flex rounded hover:shadow-md"
    style={{ height: 50, width: 240, background: '#ff0033' }}
    onClick={onClick}
  >
    <div
      style={{ marginTop: 1, marginLeft: 2 }}
      className="w-14 h-12 bg-white bg-center rounded"
    >
      <img
        style={{ paddingTop: 9 }}
        className="inline px-1"
        src="/yahoo_icon_256.png"
        alt="YahooJapan company logo"
      />
    </div>
    <div className="flex flex-auto justify-center items-center h-12">
      <p className="text-xl font-bold text-white">ログイン</p>
    </div>
  </button>
);

export { YahooButton };

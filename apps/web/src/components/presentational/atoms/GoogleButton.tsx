import { FC, SyntheticEvent } from 'react';

type GoogleButtonProps = {
  onClick?: (e: SyntheticEvent) => void | Promise<void>;
};

// design guide https://developer.yahoo.co.jp/yconnect/loginbuttons.html
const GoogleButton: FC<GoogleButtonProps> = ({ onClick }) => (
  <button type="button" className="google-button" onClick={onClick}>
    <div className="google-button-text">Sign in with google</div>
    <div className="google-icon-wrapper">
      <img
        className="google-icon"
        src="/Google__G__Logo.svg"
        alt="Google_G_logo"
      />
    </div>
  </button>
);

export { GoogleButton };

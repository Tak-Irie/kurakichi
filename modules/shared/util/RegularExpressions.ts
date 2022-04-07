const EmailRegExp =
  /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

const JapaneseAddressRegExp =
  /(\d{3}-?\d{4})([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]*\s*\d-?\d?-?\d?)\s*[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf\d-]*/;

const PhoneNumberRegExp =
  /^0[789]0-[0-9]{4}-[0-9]{4}$|^0([0-9]-[0-9]{4}|[0-9]{2}-[0-9]{3}|[0-9]{3}-[0-9]{2}|[0-9]{4}-[0-9])-[0-9]{4}$/;

export { EmailRegExp, JapaneseAddressRegExp, PhoneNumberRegExp };

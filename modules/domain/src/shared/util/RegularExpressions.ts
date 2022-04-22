const EmailRegExp = /^([a-z0-9_\-.]+)@([a-z0-9_\-.]+\.[a-z0-9]{2,})$/;

const URLRegExp =
  /^https:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+$/;
const JapaneseAddressRegExp =
  /(\d{3}-?\d{4})([\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]*\s*\d-?\d?-?\d?)\s*[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf\d-]*/;

const PhoneNumberRegExp =
  /^0[789]0-[0-9]{4}-[0-9]{4}$|^0([0-9]-[0-9]{4}|[0-9]{2}-[0-9]{3}|[0-9]{3}-[0-9]{2}|[0-9]{4}-[0-9])-[0-9]{4}$/;

const UUIDv4RegEXP =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const ULIDRegExp = /^[0-9A-Z]{26}/;

const GeoCodeRegExp = /^-{0,1}[0-9]{1,3}\.[0-9]{0,8}$/;

//** -_.@!* */
const PasswordRegExp = /^[0-9A-Za-z\-_.@!*]{8,64}$/;

const JapaneseTextRegExp =
  /^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf-\u3000]$/;

const Any100chrRegExp = /^.{1,100}$/;
const UserNameRegExp =
  /^[0-9A-Za-z@\uff20\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf-\u3000]{4,20}$/;

const OrgNameRegExp =
  /^[0-9A-Za-z\uff20\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf-\u3000]{4,30}$/;
const PostcodeRegExp = /^[0-9]{3}-?[0-9]{4}$/;

export {
  EmailRegExp,
  JapaneseAddressRegExp,
  PhoneNumberRegExp,
  ULIDRegExp,
  UUIDv4RegEXP,
  GeoCodeRegExp,
  PasswordRegExp,
  JapaneseTextRegExp,
  Any100chrRegExp,
  UserNameRegExp,
  PostcodeRegExp,
  OrgNameRegExp,
  URLRegExp,
};

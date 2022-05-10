import { EmailRegExp } from "./RegularExpressions";

const VALID_EMAIL = "-This-Is-Valid+@gmail.com";
const DISALLOWED_CHAR = "@@!#$@gmail.com";
const NOT_EMAIL = "ThisIsNotMeetsEmailRequirements";

describe("正規表現テスト", () => {
  const emailRegExp = EmailRegExp;
  const regTest = (password: string) => {
    const result = emailRegExp.test(password);
    return result;
  };
  it("成功: 適当なメールアドレス", () => {
    const result = regTest(VALID_EMAIL);
    expect(result).toBeTruthy();
  });
  it("失敗: 使用不可文字が含まれている", () => {
    const result = regTest(DISALLOWED_CHAR);
    expect(result).toBeFalsy();
  });
  it("失敗: メールアドレスではない", () => {
    const result = regTest(NOT_EMAIL);
    expect(result).toBeFalsy();
  });
});

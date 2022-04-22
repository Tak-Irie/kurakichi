import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";
import { User, UserEmail, UserPassword, UserName } from "./index";

const userName = UserName.create({ userName: "okName" }).getValue();
const email = UserEmail.create({ email: "success@email.com" }).getValue();
const passwordFnc = UserPassword.create({
  password: "password",
  isHashed: false,
});

const invalidShortUsername = UserName.create({ userName: "s" });
const invalidLongUsername = UserName.create({
  userName: "looooooooooooooooooooooooooooooooooooooooong",
});

const invalidEmail = UserEmail.create({ email: "invalidFormat" });
const invalidPasswordFnc = UserPassword.create({
  password: "short",
  isHashed: false,
});
describe("ドメインユーザー", () => {
  test("ユーサー作成成功", async () => {
    const pass = await passwordFnc;
    const result = User.create({
      id: UniqueEntityId.createULID(),
      userName,
      email,
      password: pass.getValue(),
    });

    expect(result.getId()).toBeTruthy();
    expect(result.getUsername()).toBe("okName");
    expect(result.getEmail()).toBe("success@email.com");
    // isHashedを確認
    expect(result.getPassword()).not.toBe("password");
    expect(result.getPassword()).toMatch(/argon2/);
  });

  test("不正なユーザーネーム", () => {
    expect(invalidShortUsername.getErrorValue()).toBe(
      "ユーザー名は最小2文字です"
    );
    expect(invalidLongUsername.getErrorValue()).toBe(
      "ユーザー名は最大20文字です"
    );
  });

  test("不正なメールアドレス", () => {
    expect(invalidEmail.getErrorValue()).toBe(
      "メールアドレスに使用できない文字が含まれています"
    );
  });

  test("不正なパスワード", async () => {
    const invalidPass = await invalidPasswordFnc;
    expect(invalidPass.getErrorValue()).toBe(
      "パスワードは8文字以上に設定してください"
    );
  });
});

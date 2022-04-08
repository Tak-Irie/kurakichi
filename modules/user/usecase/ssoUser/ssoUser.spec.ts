import { SsoUserUsecase } from "./ssoUserUsecase";
import { MockUserRepo } from "../../testHelper";

const mockRepo = new MockUserRepo();
const Usecase = new SsoUserUsecase(mockRepo);
describe("ソーシャルログインテスト", () => {
  test("成功:新規登録", async () => {
    const result = await Usecase.execute({
      email: "example@gmail.com",
      ssoSub: "1234567890",
      avatar: "",
    });

    expect(result.isRight).toBeTruthy();
  });
  test("成功:ログイン", async () => {
    const result = await Usecase.execute({
      email: "valid-email@example.com",
      ssoSub: "1234567890",
      avatar: "",
    });
    expect(result.isRight()).toBeTruthy();
  });
  test("失敗:メールアドレスが不適当", async () => {
    const result = await Usecase.execute({
      email: "hoge",
      ssoSub: "1234567890",
      avatar: "",
    });

    expect(result.isLeft).toBeTruthy();
  });
});

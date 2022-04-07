import { SsoUserUseCase } from "./ssoUserUseCase";
import { MockUserRepo } from "../../testHelper";

const mockRepo = new MockUserRepo();
const useCase = new SsoUserUseCase(mockRepo);
describe("ソーシャルログインテスト", () => {
  test("成功:新規登録", async () => {
    const result = await useCase.execute({
      email: "example@gmail.com",
      ssoSub: "1234567890",
      avatar: "",
    });

    expect(result.isRight).toBeTruthy();
  });
  test("成功:ログイン", async () => {
    const result = await useCase.execute({
      email: "valid-email@example.com",
      ssoSub: "1234567890",
      avatar: "",
    });
    expect(result.isRight()).toBeTruthy();
  });
  test("失敗:メールアドレスが不適当", async () => {
    const result = await useCase.execute({
      email: "hoge",
      ssoSub: "1234567890",
      avatar: "",
    });

    expect(result.isLeft).toBeTruthy();
  });
});
